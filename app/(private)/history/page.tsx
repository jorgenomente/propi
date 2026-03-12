import Link from 'next/link';

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
  formatTipTime,
  getTips,
} from '@/lib/tips';

export default async function HistoryPage() {
  const tips = await getTips();
  const tipsByDay = Object.entries(
    tips.reduce<Record<string, typeof tips>>((groups, tip) => {
      const label = formatTipDate(tip.created_at);
      groups[label] ??= [];
      groups[label].push(tip);
      return groups;
    }, {}),
  );

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
          <CardTitle className="text-3xl">Historial</CardTitle>
          <CardDescription className="leading-6">
            Revisa tus propinas registradas ordenadas por fecha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tipsByDay.length === 0 ? (
            <div className="border-border text-muted-foreground rounded-2xl border border-dashed px-4 py-8 text-sm">
              Todavia no registraste propinas.
            </div>
          ) : (
            <div className="space-y-6">
              {tipsByDay.map(([dayLabel, dayTips]) => (
                <section key={dayLabel} className="space-y-3">
                  <h2 className="text-lg font-semibold">{dayLabel}</h2>
                  <div className="space-y-2">
                    {(dayTips ?? []).map((tip) => (
                      <div
                        key={tip.id}
                        className="border-border flex items-center justify-between rounded-2xl border px-4 py-3"
                      >
                        <span className="text-base font-medium">
                          {formatCurrency(tip.amount)}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {formatTipTime(tip.created_at)}
                        </span>
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
