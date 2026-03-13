import 'server-only';

import { createClient } from '@/lib/supabase/server';

export type TipRecord = {
  id: string;
  amount: number;
  tip_date: string;
  created_at: string;
};

export type TipSummary = {
  today: number;
  week: number;
  month: number;
};

export type StatsPreset = 'last7' | 'thisMonth' | 'previousMonth' | 'custom';

export type TipStatsRange = {
  preset: StatsPreset;
  from: string;
  to: string;
  fromDate: Date;
  toDate: Date;
  label: string;
};

export type TipDailyStat = {
  dateKey: string;
  label: string;
  total: number;
  count: number;
  tips: TipRecord[];
};

function getStartOfToday(now: Date) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseTipDate(value: string) {
  return new Date(`${value}T00:00:00`);
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

function getEndOfDay(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );
}

function formatDateInputValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

function parseDateInput(value?: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatStatsLabel(fromDate: Date, toDate: Date) {
  const formatter = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
  });

  return `${formatter.format(fromDate)} - ${formatter.format(toDate)}`;
}

export function formatCurrency(value: number) {
  const formattedValue = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `$${formattedValue}`;
}

export function formatTipDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseTipDate(value));
}

export function formatTipDateWithWeekday(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseTipDate(value));
}

export function formatTipTime(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatStatsDayLabel(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(parseTipDate(value));
}

export async function getTips() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tips')
    .select('id, amount, tip_date, created_at')
    .order('tip_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as TipRecord[];
}

export async function getTipById(tipId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tips')
    .select('id, amount, tip_date, created_at')
    .eq('id', tipId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as TipRecord | null) ?? null;
}

export async function getTipsInRange(fromDate: Date, toDate: Date) {
  const fromValue = formatDateInputValue(fromDate);
  const toValue = formatDateInputValue(toDate);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tips')
    .select('id, amount, tip_date, created_at')
    .gte('tip_date', fromValue)
    .lte('tip_date', toValue)
    .order('tip_date', { ascending: false })
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
      const tipDate = parseTipDate(tip.tip_date);

      if (tipDate >= startOfToday) {
        summary.today += tip.amount;
      }

      if (tipDate >= startOfWeek) {
        summary.week += tip.amount;
      }

      if (tipDate >= startOfMonth) {
        summary.month += tip.amount;
      }

      return summary;
    },
    { today: 0, week: 0, month: 0 },
  );
}

export function resolveTipStatsRange(filters: {
  preset?: string;
  from?: string;
  to?: string;
}) {
  const now = new Date();
  const endOfToday = getEndOfDay(now);

  const preset = (filters.preset ?? 'last7') as StatsPreset;

  if (preset === 'thisMonth') {
    const fromDate = getStartOfMonth(now);
    return {
      preset,
      from: formatDateInputValue(fromDate),
      to: formatDateInputValue(endOfToday),
      fromDate,
      toDate: endOfToday,
      label: 'Este mes',
    } satisfies TipStatsRange;
  }

  if (preset === 'previousMonth') {
    const fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const toDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999,
    );

    return {
      preset,
      from: formatDateInputValue(fromDate),
      to: formatDateInputValue(toDate),
      fromDate,
      toDate,
      label: 'Mes anterior',
    } satisfies TipStatsRange;
  }

  if (preset === 'custom') {
    const parsedFrom = parseDateInput(filters.from);
    const parsedTo = parseDateInput(filters.to);

    if (parsedFrom && parsedTo && parsedFrom <= parsedTo) {
      const toDate = getEndOfDay(parsedTo);

      return {
        preset,
        from: formatDateInputValue(parsedFrom),
        to: formatDateInputValue(parsedTo),
        fromDate: parsedFrom,
        toDate,
        label: formatStatsLabel(parsedFrom, parsedTo),
      } satisfies TipStatsRange;
    }
  }

  const fromDate = new Date(
    endOfToday.getFullYear(),
    endOfToday.getMonth(),
    endOfToday.getDate() - 6,
  );

  return {
    preset: 'last7',
    from: formatDateInputValue(fromDate),
    to: formatDateInputValue(endOfToday),
    fromDate,
    toDate: endOfToday,
    label: 'Ultimos 7 dias',
  } satisfies TipStatsRange;
}

export function buildTipDailyStats(tips: TipRecord[]) {
  return Object.entries(
    tips.reduce<Record<string, TipRecord[]>>((groups, tip) => {
      const dateKey = tip.tip_date;
      groups[dateKey] ??= [];
      groups[dateKey].push(tip);
      return groups;
    }, {}),
  )
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([dateKey, dayTips]) => ({
      dateKey,
      label: formatStatsDayLabel(dateKey),
      total: dayTips.reduce((sum, tip) => sum + tip.amount, 0),
      count: dayTips.length,
      tips: dayTips,
    })) satisfies TipDailyStat[];
}
