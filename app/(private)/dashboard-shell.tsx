'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChartColumnBig,
  Coins,
  Share2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import { LogoutForm } from '@/components/auth/logout-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type DashboardShellProps = {
  createdAmount?: number | null;
  snapshot: DashboardSnapshot;
  todayLabel: string;
  userLabel: string;
  whatsappShareUrl: string;
};

type TipSummary = {
  today: number;
  week: number;
  month: number;
};

type TipRecord = {
  id: string;
  amount: number;
  tip_date: string;
  created_at: string;
};

type DashboardTrendPoint = {
  dateKey: string;
  label: string;
  total: number;
  isToday: boolean;
};

type DashboardInsight = {
  title: string;
  description: string;
};

type DashboardSnapshot = {
  summary: TipSummary;
  totalCount: number;
  latestAmount: number;
  latestTip: TipRecord | null;
  hasTips: boolean;
  recentTips: TipRecord[];
  weekSeries: DashboardTrendPoint[];
  insight: DashboardInsight;
};

type SummaryKey = 'today' | 'week' | 'month';

const summaryMeta: Record<
  SummaryKey,
  {
    eyebrow: string;
    icon: typeof Coins;
  }
> = {
  today: {
    eyebrow: 'Hoy',
    icon: Coins,
  },
  week: {
    eyebrow: 'Semana',
    icon: ChartColumnBig,
  },
  month: {
    eyebrow: 'Mes',
    icon: CalendarDays,
  },
};

function formatCurrency(value: number) {
  const formattedValue = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `$${formattedValue}`;
}

function formatTipDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

function formatTipTime(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatCurrencyRounded(value: number) {
  const formattedValue = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return `$${formattedValue}`;
}

function formatCompactCurrency(value: number) {
  if (value < 1000) {
    return formatCurrencyRounded(value);
  }

  if (value < 1_000_000) {
    const compactValue = value / 1000;
    const rounded =
      compactValue >= 100
        ? compactValue.toFixed(0)
        : compactValue % 1 === 0
          ? compactValue.toFixed(0)
          : compactValue.toFixed(1);

    return `$${rounded.replace(/\.0$/, '')}K`;
  }

  const compactValue = value / 1_000_000;
  const rounded =
    compactValue >= 100
      ? compactValue.toFixed(0)
      : compactValue % 1 === 0
        ? compactValue.toFixed(0)
        : compactValue.toFixed(1);

  return `$${rounded.replace(/\.0$/, '')}M`;
}

export function DashboardShell({
  createdAmount,
  snapshot,
  todayLabel,
  userLabel,
  whatsappShareUrl,
}: DashboardShellProps) {
  const [activeSummary, setActiveSummary] = useState<SummaryKey>('today');
  const [showCreatedPulse, setShowCreatedPulse] = useState(
    Boolean(createdAmount),
  );
  const maxWeekTotal = Math.max(
    ...snapshot.weekSeries.map((point) => point.total),
    0,
  );

  useEffect(() => {
    if (!createdAmount) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowCreatedPulse(false);
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [createdAmount]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <header className="border-border bg-card relative overflow-hidden rounded-[32px] border p-6 shadow-[0_24px_70px_-46px_rgba(15,23,42,0.2)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_28%)]" />

        <div className="relative space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs tracking-[0.22em] uppercase">
                Propi
              </p>
              <p className="text-muted-foreground text-sm capitalize">
                {todayLabel}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <p className="text-muted-foreground text-sm">{userLabel}</p>
              <LogoutForm variant="ghost" />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-balance sm:text-5xl">
                  Tus propinas de un vistazo.
                </h1>
              </div>

              {createdAmount ? (
                <div
                  className={cn(
                    'border-border bg-background/72 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all',
                    showCreatedPulse && 'dashboard-created-pulse',
                  )}
                >
                  <Sparkles className="text-primary size-4" />
                  <span>Acabas de sumar {formatCurrency(createdAmount)}.</span>
                </div>
              ) : null}

              <div className="grid gap-3 md:grid-cols-3">
                {(['today', 'week', 'month'] as SummaryKey[]).map((key) => {
                  const Icon = summaryMeta[key].icon;
                  const isActive = activeSummary === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveSummary(key)}
                      className={cn(
                        'rounded-[28px] border p-5 text-left transition-all duration-200',
                        isActive
                          ? 'border-primary/30 bg-primary text-primary-foreground shadow-[0_24px_60px_-36px_rgba(15,23,42,0.4)]'
                          : 'border-border bg-muted/65 hover:bg-muted',
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p
                            className={cn(
                              'text-xs tracking-[0.18em] uppercase',
                              isActive
                                ? 'text-primary-foreground/75'
                                : 'text-muted-foreground',
                            )}
                          >
                            {summaryMeta[key].eyebrow}
                          </p>
                          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                            {formatCurrency(snapshot.summary[key])}
                          </p>
                        </div>
                        <div
                          className={cn(
                            'flex size-11 items-center justify-center rounded-2xl border',
                            isActive
                              ? 'border-white/15 bg-white/10'
                              : 'border-border bg-card',
                          )}
                        >
                          <Icon
                            className={cn(
                              'size-5',
                              isActive
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground',
                            )}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Card className="bg-primary text-primary-foreground border-primary/20 overflow-hidden">
              <CardHeader className="space-y-3">
                <CardDescription className="text-primary-foreground/70 text-xs tracking-[0.18em] uppercase">
                  Estadisticas
                </CardDescription>
                <CardTitle className="text-3xl tracking-[-0.04em]">
                  Mira tu progreso completo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/12 bg-white/10 p-4">
                    <p className="text-primary-foreground/70 text-xs tracking-[0.16em] uppercase">
                      Registros
                    </p>
                    <p className="mt-3 text-3xl font-semibold">
                      {snapshot.totalCount}
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-white/12 bg-white/10 p-4">
                    <p className="text-primary-foreground/70 text-xs tracking-[0.16em] uppercase">
                      Ultima
                    </p>
                    <p className="mt-3 text-3xl font-semibold">
                      {formatCurrencyRounded(snapshot.latestAmount)}
                    </p>
                  </div>
                </div>
                <Link
                  href="/stats?preset=all"
                  className="bg-primary-foreground text-primary inline-flex h-14 w-full items-center justify-between rounded-2xl px-5 text-base font-semibold shadow-[0_20px_40px_-24px_rgba(15,23,42,0.5)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Ir a estadisticas
                  <ArrowRight className="size-5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {!snapshot.hasTips ? (
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
                En cuanto guardes tu primer monto, este panel empieza a mostrar
                actividad diaria, ritmo semanal y lectura mensual.
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
              <CardTitle>Menos friccion, mas lectura inmediata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="bg-secondary/55 rounded-2xl px-4 py-3">
                1. Anota una propina en segundos.
              </div>
              <div className="bg-secondary/40 rounded-2xl px-4 py-3">
                2. Vuelve al dashboard y revisa el cambio al instante.
              </div>
              <div className="bg-secondary/25 rounded-2xl px-4 py-3">
                3. Usa historial para revisar o editar tus registros por fecha.
              </div>
            </CardContent>
          </Card>
        </section>
      ) : (
        <section className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="bg-card/90 border-white/55">
            <CardHeader className="space-y-3">
              <CardDescription className="text-xs tracking-[0.18em] uppercase">
                Tendencia de 7 dias
              </CardDescription>
              <CardTitle className="text-3xl tracking-[-0.03em]">
                Como viene tu semana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid h-52 grid-cols-7 items-end gap-2">
                {snapshot.weekSeries.map((point) => {
                  const height =
                    maxWeekTotal > 0
                      ? Math.max(
                          (point.total / maxWeekTotal) * 100,
                          point.total > 0 ? 12 : 6,
                        )
                      : 6;

                  return (
                    <div
                      key={point.dateKey}
                      className="flex h-full flex-col justify-end gap-3"
                    >
                      <div className="bg-secondary/50 flex-1 rounded-[20px] px-1.5 py-2">
                        <div
                          className={cn(
                            'w-full rounded-[14px] transition-transform duration-200 hover:-translate-y-1',
                            point.isToday ? 'bg-primary/90' : 'bg-chart-1/70',
                          )}
                          style={{ height: `${height}%` }}
                          title={`${point.label}: ${formatCurrency(point.total)}`}
                        />
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-muted-foreground text-[11px] font-medium uppercase">
                          {point.label}
                        </p>
                        <p className="text-[10px] font-semibold sm:text-xs">
                          {point.total > 0
                            ? formatCompactCurrency(point.total)
                            : '$0'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="bg-card/86 border-white/55">
              <CardHeader className="space-y-3">
                <CardDescription className="text-xs tracking-[0.18em] uppercase">
                  Ultimo movimiento
                </CardDescription>
                <CardTitle className="text-3xl tracking-[-0.03em]">
                  {snapshot.latestTip
                    ? formatCurrency(snapshot.latestTip.amount)
                    : formatCurrency(0)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {snapshot.latestTip ? (
                  <>
                    <div className="bg-secondary/45 rounded-[24px] border border-white/55 p-4">
                      <p className="text-sm font-semibold">
                        Registrada a las{' '}
                        {formatTipTime(snapshot.latestTip.created_at)}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm">
                        Corresponde a{' '}
                        {formatTipDate(snapshot.latestTip.tip_date)}.
                      </p>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>

            <Card className="bg-card/82 border-white/55">
              <CardHeader className="space-y-3">
                <CardDescription className="text-xs tracking-[0.18em] uppercase">
                  Actividad reciente
                </CardDescription>
                <CardTitle>Ultimos registros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {snapshot.recentTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="bg-secondary/35 flex items-center justify-between rounded-[22px] border border-white/55 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {formatCurrency(tip.amount)}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formatTipDate(tip.tip_date)}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {formatTipTime(tip.created_at)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Link
          href="/add"
          className="border-border/80 bg-card/85 hover:bg-secondary/70 rounded-[28px] border p-5 transition-colors"
        >
          <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
            Captura
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Registrar una nueva propina
          </p>
        </Link>

        <Link
          href="/history"
          className="border-border/80 bg-card/85 hover:bg-secondary/70 rounded-[28px] border p-5 transition-colors"
        >
          <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
            Historial
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Revisar y editar registros
          </p>
        </Link>

        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-primary/92 text-primary-foreground hover:bg-primary rounded-[28px] border border-transparent p-5 transition-colors"
        >
          <span className="text-primary-foreground/75 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase">
            <Share2 className="size-4" />
            Compartir
          </span>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Enviar la app por WhatsApp
          </p>
        </a>
      </section>

      <section className="mt-6">
        <Link
          href="/stats?preset=all"
          className="from-primary to-chart-1 text-primary-foreground flex items-center justify-between rounded-[32px] bg-linear-to-r px-6 py-6 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="inline-flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-white/12">
              <TrendingUp className="size-5" />
            </span>
            <span>
              <span className="block text-lg font-semibold">
                Ir a estadisticas
              </span>
              <span className="block text-sm text-white/75">
                Ver mas detalle por rangos y periodos
              </span>
            </span>
          </span>
          <ArrowRight className="size-5" />
        </Link>
      </section>
    </div>
  );
}
