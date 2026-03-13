import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, PencilLine, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTipById } from '@/lib/tips';

import { deleteTipAction, updateTipAction } from './actions';
import { TipForm } from '../../add/tip-form';

type EditTipPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditTipPage({
  params,
  searchParams,
}: EditTipPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const tip = await getTipById(id);

  if (!tip) {
    notFound();
  }

  const updateAction = updateTipAction.bind(null, tip.id);
  const deleteAction = deleteTipAction.bind(null, tip.id);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/history"
          className="border-border/80 bg-card/85 text-foreground hover:bg-secondary/75 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="size-4" />
          Volver al historial
        </Link>
      </div>

      <div className="space-y-5">
        <Card className="bg-card/90 border-white/55">
          <CardHeader className="space-y-4">
            <div className="bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase">
              <PencilLine className="size-3.5" />
              Ajuste de registro
            </div>
            <CardTitle className="text-3xl tracking-[-0.03em]">
              Editar propina
            </CardTitle>
            <CardDescription className="leading-6">
              Corrige el monto o la fecha real si registraste la propina con un
              dato incorrecto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {resolvedSearchParams.error === 'delete' ? (
              <p
                role="alert"
                className="rounded-2xl border border-red-300/70 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                No se pudo eliminar la propina. Intenta otra vez.
              </p>
            ) : null}

            <TipForm
              action={updateAction}
              initialAmount={String(tip.amount)}
              initialTipDate={tip.tip_date}
              submitLabel="Guardar cambios"
            />
          </CardContent>
        </Card>

        <Card className="border-red-200/80 bg-red-50/60 shadow-none">
          <CardHeader className="space-y-3">
            <CardTitle className="text-xl text-red-900">
              Eliminar registro
            </CardTitle>
            <CardDescription className="text-red-800/80">
              Usa esta accion solo si el registro no debe existir. El cambio no
              se puede deshacer desde la app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={deleteAction}>
              <Button
                type="submit"
                variant="destructive"
                className="h-11 w-full sm:w-auto"
              >
                <Trash2 className="size-4" />
                Eliminar propina
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
