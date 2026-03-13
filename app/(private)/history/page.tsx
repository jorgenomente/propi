import Link from 'next/link';
import {
  ArrowLeft,
  CalendarRange,
  PencilLine,
  ReceiptText,
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
import {
  formatCurrency,
  formatTipDate,
  formatTipDateWithWeekday,
  formatTipTime,
  getTips,
} from '@/lib/tips';

export default async function HistoryPage() {
  const tips = await getTips();
  const tipsByDay = Object.entries(
    tips.reduce<Record<string, typeof tips>>((groups, tip) => {
      const label = formatTipDateWithWeekday(tip.tip_date);
      groups[label] ??= [];
      groups[label].push(tip);
      return groups;
    }, {}),
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="border-border/80 bg-card/85 text-foreground hover:bg-secondary/75 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="size-4" />
            Volver
          </Link>
          <Link
            href="/stats"
            className="border-border/80 bg-card/85 text-foreground hover:bg-secondary/75 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-colors"
          >
            <TrendingUp className="size-4" />
            Estadisticas
          </Link>
        </div>
        <LogoutForm variant="ghost" />
      </div>

      <Card className="bg-card/90 border-white/55">
        <CardHeader className="space-y-4">
          <div className="bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase">
            <CalendarRange className="size-3.5" />
            Archivo personal
          </div>
          <CardTitle className="text-3xl tracking-[-0.03em]">
            Historial
          </CardTitle>
          <CardDescription className="leading-6">
            Revisa tus propinas registradas ordenadas por fecha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tipsByDay.length === 0 ? (
            <div className="text-muted-foreground border-border/80 bg-secondary/25 rounded-[28px] border border-dashed px-5 py-10 text-sm">
              Todavia no registraste propinas.
            </div>
          ) : (
            <div className="space-y-6">
              {tipsByDay.map(([dayLabel, dayTips]) => (
                <section key={dayLabel} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ReceiptText className="text-primary size-4" />
                    <h2 className="text-lg font-semibold">{dayLabel}</h2>
                  </div>
                  <div className="space-y-2">
                    {(dayTips ?? []).map((tip) => (
                      <div
                        key={tip.id}
                        className="border-border/75 bg-card/72 flex items-center justify-between rounded-[24px] border px-4 py-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]"
                      >
                        <span className="text-base font-medium">
                          {formatCurrency(tip.amount)}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-muted-foreground text-sm">
                              {formatTipTime(tip.created_at)}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              corresponde a {formatTipDate(tip.tip_date)}
                            </p>
                          </div>
                          <Link
                            href={`/edit/${tip.id}`}
                            className="border-border/70 bg-card hover:bg-secondary inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors"
                          >
                            <PencilLine className="size-4" />
                            Editar
                          </Link>
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
  );
}
