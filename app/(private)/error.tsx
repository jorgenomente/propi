'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivateError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-6">
      <Card className="bg-card/90 w-full border-white/55">
        <CardHeader className="space-y-3">
          <div className="bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase">
            <AlertTriangle className="size-3.5" />
            Propi
          </div>
          <CardTitle className="text-3xl">
            No pudimos cargar esta vista
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-muted-foreground text-sm leading-6">
            Intenta recargar la pantalla. Si el problema sigue, vuelve al
            dashboard y revisa la conexion con Supabase.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" className="h-11" onClick={() => reset()}>
              Reintentar
            </Button>
            <Link
              href="/"
              className="border-border/80 bg-card/85 text-foreground hover:bg-secondary/80 inline-flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors"
            >
              Volver al dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
