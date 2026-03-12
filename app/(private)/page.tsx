import Link from 'next/link';

import { LogoutForm } from '@/components/auth/logout-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import { formatCurrency, getTipSummary, getTips } from '@/lib/tips';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const tips = await getTips();
  const summary = getTipSummary(tips);
  const summaryCards = [
    { label: 'Propinas de hoy', value: formatCurrency(summary.today) },
    { label: 'Propinas esta semana', value: formatCurrency(summary.week) },
    { label: 'Propinas este mes', value: formatCurrency(summary.month) },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <header className="border-border/60 bg-background/80 mb-8 flex flex-col gap-4 rounded-3xl border p-5 shadow-sm backdrop-blur sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs tracking-[0.28em] uppercase">
            Propi
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Tu resumen de propinas
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-6">
            Sesion activa: {user?.email ?? user?.id}. Los totales se calculan
            desde la tabla `tips` de tu cuenta.
          </p>
        </div>

        <LogoutForm />
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.label} className="border-border/60 bg-background/90">
            <CardHeader>
              <CardDescription className="text-xs tracking-[0.18em] uppercase">
                {card.label}
              </CardDescription>
              <CardTitle className="text-4xl">{card.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {tips.length === 0
                  ? 'Todavia no registraste propinas.'
                  : `Llevas ${tips.length} registro${tips.length === 1 ? '' : 's'} en total.`}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {tips.length === 0 ? (
        <section className="border-border/60 bg-background/90 mt-6 rounded-3xl border border-dashed p-6">
          <p className="text-lg font-medium">
            Todavia no registraste propinas.
          </p>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
            El primer registro tarda segundos. En cuanto guardes uno, este panel
            se actualiza con tus totales del dia, la semana y el mes.
          </p>
          <Link
            href="/add"
            className="bg-primary text-primary-foreground mt-4 inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Registrar primera propina
          </Link>
        </section>
      ) : null}

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Link
          href="/add"
          className="bg-primary text-primary-foreground inline-flex h-14 items-center justify-center rounded-2xl px-4 text-base font-medium transition-opacity hover:opacity-90"
        >
          Registrar propina
        </Link>
        <Link
          href="/history"
          className="border-border bg-background text-foreground hover:bg-muted inline-flex h-14 items-center justify-center rounded-2xl border px-4 text-base font-medium transition-colors"
        >
          Historial
        </Link>
      </section>
    </div>
  );
}
