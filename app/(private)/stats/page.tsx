import Link from 'next/link';
import { ArrowLeft, ChartColumnBig, Filter, TrendingUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  buildTipDailyStats,
  formatCurrency,
  formatTipDate,
  formatTipTime,
  getTipsInRange,
  resolveTipStatsRange,
} from '@/lib/tips';

type StatsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getQueryParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StatsPage({ searchParams }: StatsPageProps) {
  const resolvedParams = await searchParams;
  const range = resolveTipStatsRange({
    preset: getQueryParam(resolvedParams.preset),
    from: getQueryParam(resolvedParams.from),
    to: getQueryParam(resolvedParams.to),
  });
  const tips = await getTipsInRange(range.fromDate, range.toDate);
  const dailyStats = buildTipDailyStats(tips);
  const totalAmount = tips.reduce((sum, tip) => sum + tip.amount, 0);
  const averagePerDay =
    dailyStats.length > 0 ? totalAmount / dailyStats.length : 0;

  const presets = [
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

      <Card className="bg-card/90 border-white/55">
        <CardHeader className="space-y-4">
          <div className="bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase">
            <ChartColumnBig className="size-3.5" />
            Modulo de estadisticas
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-[-0.03em]">
                Estadisticas
              </h1>
              <CardDescription className="leading-6">
                Explora tus propinas por rango, revisa detalle por dia y mira la
                evolucion reciente sin salir de tu cuenta.
              </CardDescription>
            </div>

            <form className="border-border/70 bg-muted/40 grid gap-3 rounded-3xl border p-4 sm:grid-cols-[1fr_1fr_auto]">
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
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {presets.map((preset) => (
              <Link
                key={preset.href}
                href={preset.href}
                className="border-border bg-card hover:bg-secondary inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors"
              >
                {preset.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="border-border/70 bg-secondary/45 rounded-[24px] border p-4">
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Rango
              </p>
              <p className="mt-3 text-lg font-semibold">{range.label}</p>
            </div>
            <div className="border-border/70 bg-secondary/35 rounded-[24px] border p-4">
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Total
              </p>
              <p className="mt-3 text-2xl font-semibold">
                {formatCurrency(totalAmount)}
              </p>
            </div>
            <div className="border-border/70 bg-secondary/25 rounded-[24px] border p-4">
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Propinas
              </p>
              <p className="mt-3 text-2xl font-semibold">{tips.length}</p>
            </div>
            <div className="border-border/70 bg-secondary/15 rounded-[24px] border p-4">
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Promedio por dia
              </p>
              <p className="mt-3 text-2xl font-semibold">
                {formatCurrency(averagePerDay)}
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-border/70 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Resumen diario</CardTitle>
                <CardDescription>
                  Totales agrupados por dia dentro del rango seleccionado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dailyStats.length === 0 ? (
                  <div className="text-muted-foreground border-border/80 bg-secondary/25 rounded-[24px] border border-dashed px-5 py-10 text-sm">
                    No hay propinas registradas en este rango.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dia</TableHead>
                        <TableHead className="text-right">Propinas</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailyStats.map((day) => (
                        <TableRow key={day.dateKey}>
                          <TableCell className="font-medium">
                            {day.label}
                          </TableCell>
                          <TableCell className="text-right">
                            {day.count}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(day.total)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Detalle por dia</CardTitle>
                <CardDescription>
                  Cada jornada muestra sus propinas individuales con hora y
                  monto.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dailyStats.length === 0 ? (
                  <div className="text-muted-foreground border-border/80 bg-secondary/25 rounded-[24px] border border-dashed px-5 py-10 text-sm">
                    Ajusta el rango o registra nuevas propinas para ver detalle.
                  </div>
                ) : (
                  <div className="space-y-5">
                    {dailyStats.map((day) => (
                      <section key={day.dateKey} className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h2 className="text-base font-semibold">
                              {day.label}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              {day.count} propina{day.count === 1 ? '' : 's'}
                            </p>
                          </div>
                          <div className="text-sm font-semibold">
                            {formatCurrency(day.total)}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {day.tips.map((tip) => (
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
          </div>

          <div className="border-border/70 bg-muted/30 flex items-start gap-3 rounded-3xl border px-5 py-4">
            <TrendingUp className="text-primary mt-0.5 size-5" />
            <p className="text-muted-foreground text-sm leading-6">
              Este modulo es el primer paso de estadisticas: rangos, totales
              diarios y detalle por dia. Si te sirve en uso real, la siguiente
              iteracion puede sumar comparativas y graficos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
