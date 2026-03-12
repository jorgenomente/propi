import Link from 'next/link';
import { ArrowRight, CalendarDays, ChartColumnBig, Coins } from 'lucide-react';

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
    {
      label: 'Propinas de hoy',
      value: formatCurrency(summary.today),
      note: 'Turno actual',
      icon: Coins,
    },
    {
      label: 'Propinas esta semana',
      value: formatCurrency(summary.week),
      note: 'Ritmo semanal',
      icon: ChartColumnBig,
    },
    {
      label: 'Propinas este mes',
      value: formatCurrency(summary.month),
      note: 'Panorama mensual',
      icon: CalendarDays,
    },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <header className="border-border bg-card relative overflow-hidden rounded-[32px] border p-6 shadow-[0_24px_70px_-46px_rgba(15,23,42,0.2)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(99,102,241,0.05),transparent)]" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs tracking-[0.22em] uppercase">
              Propi
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-balance sm:text-5xl">
              Tu resumen de propinas
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm leading-7 sm:text-base">
              Sesion activa: {user?.email ?? user?.id}. Guarda cada monto al
              instante y revisa tu progreso sin salirte del ritmo del turno.
            </p>
          </div>

          <div className="sm:min-w-fit">
            <LogoutForm variant="ghost" />
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-3">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.label}
                className="border-border bg-muted/60 rounded-3xl border p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      {card.label}
                    </p>
                    <p className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                      {card.value}
                    </p>
                  </div>
                  <div className="bg-card border-border flex size-11 items-center justify-center rounded-2xl border">
                    <Icon className="text-muted-foreground size-5" />
                  </div>
                </div>
                <p className="text-muted-foreground mt-3 text-sm">
                  {card.note}
                </p>
              </article>
            );
          })}
        </div>
      </header>

      {tips.length === 0 ? (
        <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-card/90 border-white/55">
            <CardHeader>
              <CardDescription className="text-xs tracking-[0.18em] uppercase">
                Primer paso
              </CardDescription>
              <CardTitle className="text-3xl tracking-[-0.03em]">
                Todavia no registraste propinas.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-muted-foreground max-w-xl text-sm leading-6">
                El flujo esta listo. En cuanto guardes tu primer monto, este
                panel actualiza hoy, semana y mes automaticamente.
              </p>
              <Link
                href="/add"
                className="bg-primary text-primary-foreground inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold"
              >
                Registrar primera propina
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/82 border-white/55">
            <CardHeader>
              <CardDescription className="text-xs tracking-[0.18em] uppercase">
                Metodo
              </CardDescription>
              <CardTitle>Menos friccion, mas claridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="bg-secondary/55 rounded-2xl px-4 py-3">
                1. Anota una propina en segundos.
              </div>
              <div className="bg-secondary/40 rounded-2xl px-4 py-3">
                2. Vuelve al dashboard y revisa tus acumulados.
              </div>
              <div className="bg-secondary/25 rounded-2xl px-4 py-3">
                3. Usa historial para revisar tus registros por fecha.
              </div>
            </CardContent>
          </Card>
        </section>
      ) : (
        <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="bg-card/90 border-white/55">
            <CardHeader>
              <CardDescription className="text-xs tracking-[0.18em] uppercase">
                Actividad
              </CardDescription>
              <CardTitle className="text-3xl tracking-[-0.03em]">
                Tu cuenta ya tiene movimiento
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="border-border/70 bg-secondary/55 rounded-[24px] border p-4">
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  Registros
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                  {tips.length}
                </p>
              </div>
              <div className="border-border/70 bg-secondary/40 rounded-[24px] border p-4">
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  Ultimo total
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  {formatCurrency(tips[0]?.amount ?? 0)}
                </p>
              </div>
              <div className="border-border/70 bg-secondary/25 rounded-[24px] border p-4">
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  Estado
                </p>
                <p className="mt-3 text-base font-semibold">
                  Seguimiento activo
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/82 border-white/55">
            <CardHeader>
              <CardDescription className="text-xs tracking-[0.18em] uppercase">
                Accesos
              </CardDescription>
              <CardTitle>Atajos rapidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/add"
                className="bg-primary text-primary-foreground inline-flex h-12 w-full items-center justify-between rounded-2xl px-4 text-sm font-semibold"
              >
                Registrar propina
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/history"
                className="border-border/80 bg-card/75 text-foreground hover:bg-secondary/70 inline-flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-sm font-semibold transition-colors"
              >
                Ver historial
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </section>
      )}

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Link
          href="/add"
          className="bg-card/88 border-border/70 hover:bg-card inline-flex h-16 items-center justify-between rounded-[28px] border px-5 text-base font-semibold shadow-[0_12px_32px_-24px_rgba(15,23,42,0.3)] transition-colors"
        >
          <span>Registrar propina</span>
          <ArrowRight className="text-primary size-5" />
        </Link>
        <Link
          href="/history"
          className="bg-card/72 border-border/70 hover:bg-secondary/60 inline-flex h-16 items-center justify-between rounded-[28px] border px-5 text-base font-semibold shadow-[0_12px_32px_-24px_rgba(15,23,42,0.22)] transition-colors"
        >
          <span>Historial</span>
          <ArrowRight className="text-primary size-5" />
        </Link>
      </section>
    </div>
  );
}
