import 'server-only';

import { createClient } from '@/lib/supabase/server';

export type TipRecord = {
  id: string;
  amount: number;
  created_at: string;
};

export type TipSummary = {
  today: number;
  week: number;
  month: number;
};

function getStartOfToday(now: Date) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function getStartOfWeek(now: Date) {
  const start = getStartOfToday(now);
  const day = start.getDay();
  const distance = day === 0 ? 6 : day - 1;
  start.setDate(start.getDate() - distance);
  return start;
}

function getStartOfMonth(now: Date) {
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatTipDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatTipTime(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export async function getTips() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tips')
    .select('id, amount, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as TipRecord[];
}

export function getTipSummary(tips: TipRecord[]): TipSummary {
  const now = new Date();
  const startOfToday = getStartOfToday(now);
  const startOfWeek = getStartOfWeek(now);
  const startOfMonth = getStartOfMonth(now);

  return tips.reduce<TipSummary>(
    (summary, tip) => {
      const createdAt = new Date(tip.created_at);

      if (createdAt >= startOfToday) {
        summary.today += tip.amount;
      }

      if (createdAt >= startOfWeek) {
        summary.week += tip.amount;
      }

      if (createdAt >= startOfMonth) {
        summary.month += tip.amount;
      }

      return summary;
    },
    { today: 0, week: 0, month: 0 },
  );
}
