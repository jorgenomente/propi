import Link from 'next/link';
import { ArrowLeft, Coins, PlusCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { createTipAction } from './actions';
import { TipForm } from './tip-form';

export default function AddTipPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="border-border/80 bg-card/85 text-foreground hover:bg-secondary/75 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="size-4" />
          Volver
        </Link>
      </div>

      <Card className="bg-card/90 border-white/55">
        <CardHeader className="space-y-4">
          <div className="bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase">
            <PlusCircle className="size-3.5" />
            Captura rapida
          </div>
          <CardTitle className="text-3xl tracking-[-0.03em]">
            Registrar propina
          </CardTitle>
          <CardDescription className="leading-6">
            Guarda el monto y, si hace falta, asignalo al dia real en que lo
            recibiste para que dashboard, historial y estadisticas queden
            correctos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-border/70 rounded-[28px] border bg-[linear-gradient(135deg,rgba(12,122,130,0.08),rgba(205,236,231,0.7))] p-5">
            <div className="flex items-start gap-4">
              <div className="bg-primary/12 text-primary flex size-12 items-center justify-center rounded-2xl">
                <Coins className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Registro directo</p>
                <p className="text-muted-foreground text-sm leading-6">
                  Puedes registrar una propina de hoy o cargar una atrasada con
                  su fecha real para no distorsionar tus totales.
                </p>
              </div>
            </div>
          </div>
          <TipForm action={createTipAction} />
        </CardContent>
      </Card>
    </div>
  );
}
