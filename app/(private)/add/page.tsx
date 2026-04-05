import Link from 'next/link';
import { ArrowLeft, PlusCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        </CardHeader>
        <CardContent>
          <TipForm action={createTipAction} />
        </CardContent>
      </Card>
    </div>
  );
}
