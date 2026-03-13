'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Share2, Smartphone, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const DISMISS_KEY = 'propi-install-banner-dismissed';

function getPlatformInfo() {
  if (typeof window === 'undefined') {
    return {
      isIos: false,
      isAndroid: false,
      isChromeIos: false,
      isSafariIos: false,
      isChromeAndroid: false,
    };
  }

  const userAgent = window.navigator.userAgent;
  const isIos = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isChromeIos = isIos && /CriOS/i.test(userAgent);
  const isSafariIos =
    isIos &&
    /Safari/i.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS/i.test(userAgent);
  const isChromeAndroid = isAndroid && /Chrome/i.test(userAgent);

  return {
    isIos,
    isAndroid,
    isChromeIos,
    isSafariIos,
    isChromeAndroid,
  };
}

function isStandaloneMode() {
  if (typeof window === 'undefined') {
    return false;
  }

  const iosNavigator = window.navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    iosNavigator.standalone === true
  );
}

export function InstallAppBanner() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.localStorage.getItem(DISMISS_KEY) === 'true';
  });
  const [installed, setInstalled] = useState(() => isStandaloneMode());
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const platform = useMemo(() => getPlatformInfo(), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleStandaloneChange = () => {
      setInstalled(isStandaloneMode());
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setDismissed(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    mediaQuery.addEventListener('change', handleStandaloneChange);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      mediaQuery.removeEventListener('change', handleStandaloneChange);
    };
  }, []);

  if (installed || dismissed) {
    return null;
  }

  const canUseNativeInstall = platform.isChromeAndroid && deferredPrompt;

  async function handleInstallNow() {
    if (!deferredPrompt) {
      setOpen(true);
      return;
    }

    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === 'accepted') {
      setDismissed(true);
      setInstalled(true);
    }

    setDeferredPrompt(null);
  }

  function handleDismiss() {
    window.localStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
  }

  return (
    <>
      <div className="border-border/80 bg-card/95 fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-[28px] border p-4 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.38)] backdrop-blur sm:inset-x-6 sm:bottom-6">
        <div className="flex items-start gap-3">
          <div className="bg-primary/12 text-primary mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl">
            <Smartphone className="size-5" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-sm font-semibold">
              Agrega Propi a tu pantalla de inicio para usarla mas facil y
              rapido.
            </p>
            <p className="text-muted-foreground text-sm leading-6">
              {canUseNativeInstall
                ? 'En Android puedes instalarla como app en un toque. Si no sabes como hacerlo en tu dispositivo, abre la guia.'
                : 'Si no sabes como hacerlo, abre la guia y te mostramos los pasos para iPhone y Android.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {canUseNativeInstall ? (
                <Button type="button" size="sm" onClick={handleInstallNow}>
                  <Download className="size-4" />
                  Instalar ahora
                </Button>
              ) : null}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
              >
                Ver instrucciones
              </Button>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0"
            onClick={handleDismiss}
            aria-label="Cerrar aviso de instalacion"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl rounded-[28px] p-0" showCloseButton>
          <DialogHeader className="border-b px-5 pt-5 pb-4">
            <DialogTitle>Agregar Propi a tu pantalla de inicio</DialogTitle>
            <DialogDescription>
              Sigue estos pasos segun tu dispositivo. En Android/Chrome, si el
              navegador lo permite, tambien puedes instalarla directo desde el
              banner.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 px-5 py-5">
            <section className="border-border/80 bg-muted/30 rounded-2xl border p-4">
              <h3 className="text-sm font-semibold">iPhone en Safari</h3>
              <ol className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                <li>
                  1. Toca el boton{' '}
                  <span className="text-foreground font-medium">Compartir</span>{' '}
                  <Share2 className="ml-1 inline size-4 align-text-bottom" />.
                </li>
                <li>
                  2. Busca{' '}
                  <span className="text-foreground font-medium">
                    Anadir a pantalla de inicio
                  </span>
                  .
                </li>
                <li>
                  3. Confirma tocando{' '}
                  <span className="text-foreground font-medium">Anadir</span>.
                </li>
              </ol>
            </section>

            <section className="border-border/80 bg-muted/30 rounded-2xl border p-4">
              <h3 className="text-sm font-semibold">iPhone en Chrome</h3>
              <ol className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                <li>1. Abre el menu de compartir del iPhone desde Chrome.</li>
                <li>
                  2. Elige{' '}
                  <span className="text-foreground font-medium">
                    Anadir a pantalla de inicio
                  </span>
                  .
                </li>
                <li>
                  3. Confirma el nombre y toca{' '}
                  <span className="text-foreground font-medium">Anadir</span>.
                </li>
              </ol>
            </section>

            <section className="border-border/80 bg-muted/30 rounded-2xl border p-4">
              <h3 className="text-sm font-semibold">Android en Chrome</h3>
              <ol className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                <li>
                  1. Si ves{' '}
                  <span className="text-foreground font-medium">
                    Instalar ahora
                  </span>
                  , toca ese boton.
                </li>
                <li>2. Si no aparece, abre el menu de Chrome.</li>
                <li>
                  3. Busca{' '}
                  <span className="text-foreground font-medium">
                    Instalar app
                  </span>{' '}
                  o{' '}
                  <span className="text-foreground font-medium">
                    Anadir a pantalla principal
                  </span>
                  .
                </li>
                <li>4. Confirma la instalacion.</li>
              </ol>
            </section>

            <section className="border-border/80 bg-card rounded-2xl border p-4">
              <p className="text-sm font-medium">Consejo</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Una vez agregada, Propi abre mas rapido y se siente mucho mas
                comoda para registrar propinas en medio del turno.
              </p>
            </section>
          </div>

          <DialogFooter className="rounded-b-[28px]" showCloseButton>
            {canUseNativeInstall ? (
              <Button type="button" onClick={handleInstallNow}>
                <Download className="size-4" />
                Instalar ahora
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
