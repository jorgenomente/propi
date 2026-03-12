import Link from 'next/link';

import { LogoutForm } from '@/components/auth/logout-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
            Ruta protegida lista para el proximo lote. Aqui va el formulario de
            monto conectado a `public.tips`.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-border text-muted-foreground rounded-2xl border border-dashed px-4 py-8 text-sm">
            Placeholder protegido. El siguiente paso implementa validacion,
            insercion y redireccion al dashboard.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
