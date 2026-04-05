import Link from 'next/link';
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  ChartColumnBig,
  Filter,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  buildTipDailyStats,
  buildTipPeriodStats,
  formatCurrency,
  formatTipDate,
  formatTipTime,
  getTips,
  getTipsInRange,
  resolveAllTimeTipStatsRange,
  resolveTipStatsRange,
  type TipRecord,
  type TipDailyStat,
  type TipPeriodStat,
  type TipStatsRange,
} from '@/lib/tips';

type StatsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getQueryParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getBarWidth(value: number, maxValue: number) {
  if (value <= 0 || maxValue <= 0) {
    return '0%';
  }

  return `${Math.max((value / maxValue) * 100, 8)}%`;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-muted-foreground border-border/80 bg-secondary/25 rounded-[24px] border border-dashed px-5 py-10 text-sm">
      {message}
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="border-border/70 bg-card/72 rounded-[24px] border p-4">
      <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{value}</p>
      <p className="text-muted-foreground mt-2 text-sm">{note}</p>
    </div>
  );
}

function PeriodBars({
  title,
  description,
  icon: Icon,
  stats,
  emptyMessage,
}: {
  title: string;
  description: string;
  icon: typeof CalendarDays;
  stats: TipPeriodStat[];
  emptyMessage: string;
}) {
  const maxValue = Math.max(...stats.map((item) => item.total), 0);

  return (
    <Card className="border-border/70 shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-secondary text-secondary-foreground flex size-10 items-center justify-center rounded-2xl">
            <Icon className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {stats.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <div className="space-y-4">
            {stats.map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.count} registro{item.count === 1 ? '' : 's'}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatCurrency(item.total)}
                  </p>
                </div>
                <div className="bg-secondary/70 h-3 overflow-hidden rounded-full">
                  <div
                    className="from-chart-1 via-chart-2 to-chart-3 h-full rounded-full bg-linear-to-r transition-[width]"
                    style={{ width: getBarWidth(item.total, maxValue) }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TopDays({
  days,
  totalAmount,
}: {
  days: TipDailyStat[];
  totalAmount: number;
}) {
  const topDays = [...days]
    .sort((left, right) => right.total - left.total)
    .slice(0, 5);

  return (
    <Card className="border-border/70 shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-secondary text-secondary-foreground flex size-10 items-center justify-center rounded-2xl">
            <Sparkles className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-xl">Dias mas fuertes</CardTitle>
            <CardDescription>
              Los dias que mas aportaron dentro del rango elegido.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {topDays.length === 0 ? (
          <EmptyState message="Cuando registres propinas en este rango, vas a ver tus mejores dias aqui." />
        ) : (
          <div className="space-y-3">
            {topDays.map((day, index) => {
              const contribution =
                totalAmount > 0
                  ? Math.round((day.total / totalAmount) * 100)
                  : 0;

              return (
                <div
                  key={day.dateKey}
                  className="border-border/70 bg-card/72 rounded-[22px] border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary text-secondary-foreground flex size-8 items-center justify-center rounded-xl text-xs font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{day.label}</p>
                        <p className="text-muted-foreground text-sm">
                          {day.count} propina{day.count === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(day.total)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {contribution}% del rango
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default async function StatsPage({ searchParams }: StatsPageProps) {
  const resolvedParams = await searchParams;
  const preset = getQueryParam(resolvedParams.preset);
  let range: TipStatsRange;
  let tips: TipRecord[];

  if (preset === 'all' || !preset) {
    tips = await getTips();
    range = resolveAllTimeTipStatsRange(tips);
  } else {
    range = resolveTipStatsRange({
      preset,
      from: getQueryParam(resolvedParams.from),
      to: getQueryParam(resolvedParams.to),
    });
    tips = await getTipsInRange(range.fromDate, range.toDate);
  }

  const dailyStats = buildTipDailyStats(tips);
  const weeklyStats = buildTipPeriodStats(tips, 'week');
  const monthlyStats = buildTipPeriodStats(tips, 'month');
  const totalAmount = tips.reduce((sum, tip) => sum + tip.amount, 0);
  const activeDays = dailyStats.length;
  const averagePerDay = activeDays > 0 ? totalAmount / activeDays : 0;
  const averagePerTip = tips.length > 0 ? totalAmount / tips.length : 0;
  const bestDay = dailyStats.reduce<TipDailyStat | null>(
    (best, day) => (!best || day.total > best.total ? day : best),
    null,
  );
  const latestDays = dailyStats.slice(0, 4);

  const presets = [
    { label: 'Todo el historial', href: '/stats?preset=all' },
    { label: 'Ultimos 7 dias', href: '/stats?preset=last7' },
    { label: 'Este mes', href: '/stats?preset=thisMonth' },
    { label: 'Mes anterior', href: '/stats?preset=previousMonth' },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="border-border/80 bg-card/85 text-foreground hover:bg-secondary/75 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="size-4" />
          Volver
        </Link>
      </div>

      <section className="border-border bg-card/92 relative overflow-hidden rounded-[32px] border px-5 py-6 shadow-[0_24px_70px_-46px_rgba(15,23,42,0.2)] sm:px-7 sm:py-7">
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--chart-1)_12%,transparent),transparent)]" />
        <div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--chart-2)_22%,transparent)_0%,transparent_70%)]" />

        <div className="relative space-y-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <div className="bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase">
                <ChartColumnBig className="size-3.5" />
                Vista de estadisticas
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Tus propinas, mas faciles de leer
                </h1>
                <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
                  Mira cuanto hiciste en el periodo elegido, detecta tus semanas
                  y meses mas fuertes y entiende el ritmo de ingreso sin leer
                  tablas largas.
                </p>
              </div>
            </div>

            <form className="border-border/70 bg-card/75 grid gap-3 rounded-[28px] border p-4 sm:grid-cols-[1fr_1fr_auto]">
              <input type="hidden" name="preset" value="custom" />
              <label className="text-muted-foreground flex flex-col gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
                Desde
                <input
                  type="date"
                  name="from"
                  defaultValue={range.from}
                  className="border-border bg-card text-foreground h-11 rounded-xl border px-3 text-sm tracking-normal normal-case"
                />
              </label>
              <label className="text-muted-foreground flex flex-col gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
                Hasta
                <input
                  type="date"
                  name="to"
                  defaultValue={range.to}
                  className="border-border bg-card text-foreground h-11 rounded-xl border px-3 text-sm tracking-normal normal-case"
                />
              </label>
              <button
                type="submit"
                className="bg-primary text-primary-foreground inline-flex h-11 items-center justify-center gap-2 self-end rounded-xl px-4 text-sm font-medium"
              >
                <Filter className="size-4" />
                Filtrar
              </button>
            </form>
          </div>

          <div className="flex flex-wrap gap-3">
            {presets.map((preset) => (
              <Link
                key={preset.href}
                href={preset.href}
                className="border-border bg-card/80 hover:bg-secondary inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors"
              >
                {preset.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="from-primary to-chart-2 text-primary-foreground rounded-[28px] bg-linear-to-br p-5 sm:p-6">
              <p className="text-primary-foreground/70 text-xs tracking-[0.18em] uppercase">
                Total del rango
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                {formatCurrency(totalAmount)}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-white/14 px-3 py-1.5">
                  {range.label}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">
                  {tips.length} registro{tips.length === 1 ? '' : 's'}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">
                  {activeDays} dia{activeDays === 1 ? '' : 's'} con movimiento
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              <MetricCard
                label="Promedio por dia activo"
                value={formatCurrency(averagePerDay)}
                note="Cuanto rindio cada jornada con propinas."
              />
              <MetricCard
                label="Promedio por registro"
                value={formatCurrency(averagePerTip)}
                note="Monto medio cada vez que registraste."
              />
              <MetricCard
                label="Mejor dia"
                value={bestDay ? formatCurrency(bestDay.total) : '$0,00'}
                note={
                  bestDay ? bestDay.label : 'Todavia sin datos en el rango.'
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <PeriodBars
            title="Barras por semana"
            description="Cada barra resume lo que produjo una semana dentro del rango."
            icon={BarChart3}
            stats={weeklyStats}
            emptyMessage="Todavia no hay semanas con movimiento en este rango."
          />
          <PeriodBars
            title="Barras por mes"
            description="Vision compacta para detectar meses mas fuertes o mas flojos."
            icon={CalendarDays}
            stats={monthlyStats}
            emptyMessage="Todavia no hay meses con datos para mostrar."
          />
        </div>

        <TopDays days={dailyStats} totalAmount={totalAmount} />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-secondary text-secondary-foreground flex size-10 items-center justify-center rounded-2xl">
                <Wallet className="size-4.5" />
              </div>
              <div>
                <CardTitle className="text-xl">Pulso reciente</CardTitle>
                <CardDescription>
                  Los ultimos dias del rango, con sus propinas individuales.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {latestDays.length === 0 ? (
              <EmptyState message="Ajusta el rango o registra nuevas propinas para ver actividad reciente." />
            ) : (
              <div className="space-y-5">
                {latestDays.map((day) => (
                  <section key={day.dateKey} className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-base font-semibold">{day.label}</h2>
                        <p className="text-muted-foreground text-sm">
                          {day.count} propina{day.count === 1 ? '' : 's'}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatCurrency(day.total)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {day.tips.slice(0, 3).map((tip) => (
                        <div
                          key={tip.id}
                          className="border-border/75 bg-card/72 flex items-center justify-between rounded-[20px] border px-4 py-3"
                        >
                          <span className="font-medium">
                            {formatCurrency(tip.amount)}
                          </span>
                          <div className="text-right">
                            <p className="text-muted-foreground text-sm">
                              {formatTipTime(tip.created_at)}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {formatTipDate(tip.tip_date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-secondary text-secondary-foreground flex size-10 items-center justify-center rounded-2xl">
                <TrendingUp className="size-4.5" />
              </div>
              <div>
                <CardTitle className="text-xl">Lectura rapida</CardTitle>
                <CardDescription>
                  Un resumen corto para entender tu periodo sin interpretar
                  numeros de mas.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="border-border/70 bg-secondary/45 rounded-[24px] border p-4">
              <p className="text-sm font-semibold">Que mirar primero</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Arriba ves el total del periodo. Debajo, las barras por semana y
                por mes muestran si el ingreso viene creciendo o si hubo picos
                puntuales.
              </p>
            </div>
            <div className="border-border/70 bg-secondary/35 rounded-[24px] border p-4">
              <p className="text-sm font-semibold">Como leer tus dias</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                La tarjeta de dias mas fuertes te dice donde estuvo la mayor
                parte del dinero. Eso sirve para detectar jornadas que conviene
                comparar mas adelante.
              </p>
            </div>
            <div className="border-border/70 bg-secondary/25 rounded-[24px] border p-4">
              <p className="text-sm font-semibold">Que haria despues</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Si esta direccion te sirve, el siguiente paso logico seria sumar
                comparacion contra el periodo anterior sin salir del MVP ni
                meter analitica compleja.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
