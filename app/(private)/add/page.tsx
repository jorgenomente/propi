import Link from 'next/link';

import { LogoutForm } from '@/components/auth/logout-form';
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
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="border-border bg-background text-foreground hover:bg-muted inline-flex h-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors"
        >
          Volver
        </Link>
        <LogoutForm variant="ghost" />
      </div>

      <Card className="border-border/60 bg-background/95">
        <CardHeader>
          <CardTitle className="text-3xl">Registrar propina</CardTitle>
          <CardDescription className="leading-6">
            Guarda el monto en segundos y vuelve al dashboard para ver los
            totales actualizados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TipForm action={createTipAction} />
        </CardContent>
      </Card>
    </div>
  );
}
