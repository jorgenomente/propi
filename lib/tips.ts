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

export type DashboardSnapshot = {
  summary: TipSummary;
  totalCount: number;
  latestAmount: number;
  latestTip: TipRecord | null;
  hasTips: boolean;
  recentTips: TipRecord[];
  weekSeries: DashboardTrendPoint[];
  insight: DashboardInsight;
};

export type DashboardTrendPoint = {
  dateKey: string;
  label: string;
  total: number;
  isToday: boolean;
};

export type DashboardInsight = {
  title: string;
  description: string;
};

export type StatsPreset =
  | 'all'
  | 'last7'
  | 'thisMonth'
  | 'previousMonth'
  | 'custom';

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

export type TipPeriodStat = {
  key: string;
  label: string;
  total: number;
  count: number;
};

const TIP_FETCH_PAGE_SIZE = 1000;

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

function getEarlierDate(left: Date, right: Date) {
  return left <= right ? left : right;
}

function getStartOfPeriod(date: Date, period: 'week' | 'month') {
  if (period === 'month') {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  return getStartOfWeek(date);
}

function getPeriodKey(date: Date, period: 'week' | 'month') {
  const start = getStartOfPeriod(date, period);

  if (period === 'month') {
    return `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
  }

  return formatDateInputValue(start);
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

async function fetchAllTipsWithFilters(filters?: {
  from?: string;
  to?: string;
}) {
  const supabase = await createClient();
  const tips: TipRecord[] = [];
  let offset = 0;

  while (true) {
    let query = supabase
      .from('tips')
      .select('id, amount, tip_date, created_at')
      .order('tip_date', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + TIP_FETCH_PAGE_SIZE - 1);

    if (filters?.from) {
      query = query.gte('tip_date', filters.from);
    }

    if (filters?.to) {
      query = query.lte('tip_date', filters.to);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const page = (data ?? []) as TipRecord[];
    tips.push(...page);

    if (page.length < TIP_FETCH_PAGE_SIZE) {
      break;
    }

    offset += TIP_FETCH_PAGE_SIZE;
  }

  return tips;
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

export function formatCompactDayLabel(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
  }).format(parseTipDate(value));
}

export function formatMonthLabel(value: string) {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('es-AR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, (month ?? 1) - 1, 1));
}

export function formatWeekRangeLabel(value: string) {
  const start = parseTipDate(value);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const formatter = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

export async function getTips() {
  return fetchAllTipsWithFilters();
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

  return fetchAllTipsWithFilters({
    from: fromValue,
    to: toValue,
  });
}

export async function getDashboardSnapshot() {
  const now = new Date();
  const startOfTrend = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 6,
  );
  const earliestRelevantDate = formatDateInputValue(
    getEarlierDate(
      getEarlierDate(getStartOfWeek(now), getStartOfMonth(now)),
      startOfTrend,
    ),
  );
  const supabase = await createClient();

  const [summaryTips, latestTipResult, recentTipsResult, countResult] =
    await Promise.all([
      fetchAllTipsWithFilters({ from: earliestRelevantDate }),
      supabase
        .from('tips')
        .select('id, amount, tip_date, created_at')
        .order('tip_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('tips')
        .select('id, amount, tip_date, created_at')
        .order('tip_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(4),
      supabase.from('tips').select('*', { count: 'exact', head: true }),
    ]);

  if (latestTipResult.error) {
    throw new Error(latestTipResult.error.message);
  }

  if (recentTipsResult.error) {
    throw new Error(recentTipsResult.error.message);
  }

  if (countResult.error) {
    throw new Error(countResult.error.message);
  }

  const summary = getTipSummary(summaryTips);
  const latestTip = (latestTipResult.data as TipRecord | null) ?? null;
  const latestAmount = latestTip?.amount ?? 0;
  const totalCount = countResult.count ?? 0;
  const recentTips = (recentTipsResult.data ?? []) as TipRecord[];
  const weekSeries = buildDashboardTrendPoints(summaryTips, 7);

  return {
    summary,
    totalCount,
    latestAmount,
    latestTip,
    hasTips: totalCount > 0,
    recentTips,
    weekSeries,
    insight: buildDashboardInsight(weekSeries, summary),
  } satisfies DashboardSnapshot;
}

function buildDashboardTrendPoints(tips: TipRecord[], days: number) {
  const totals = tips.reduce<Record<string, number>>((accumulator, tip) => {
    accumulator[tip.tip_date] = (accumulator[tip.tip_date] ?? 0) + tip.amount;
    return accumulator;
  }, {});
  const today = getStartOfToday(new Date());

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - index - 1));
    const dateKey = formatDateInputValue(date);

    return {
      dateKey,
      label: formatCompactDayLabel(dateKey),
      total: totals[dateKey] ?? 0,
      isToday: index === days - 1,
    };
  });
}

function buildDashboardInsight(
  weekSeries: DashboardTrendPoint[],
  summary: TipSummary,
) {
  const bestDay = weekSeries.reduce<DashboardTrendPoint | null>(
    (currentBest, point) => {
      if (!currentBest || point.total > currentBest.total) {
        return point;
      }

      return currentBest;
    },
    null,
  );
  const activeDays = weekSeries.filter((point) => point.total > 0).length;
  const weekAverage = activeDays > 0 ? summary.week / activeDays : 0;

  if (!bestDay || bestDay.total <= 0) {
    return {
      title: 'Todavia no hay movimiento esta semana',
      description: 'Cuando cargues una propina vas a ver el ritmo diario aca.',
    } satisfies DashboardInsight;
  }

  if (summary.today > 0 && summary.today >= weekAverage) {
    return {
      title: 'Hoy viene por encima de tu promedio reciente',
      description: `Tu mejor dia de los ultimos 7 fue ${bestDay.label} con ${formatCurrency(bestDay.total)}.`,
    } satisfies DashboardInsight;
  }

  return {
    title: 'Tu mejor empuje reciente ya tiene referencia',
    description: `El pico de los ultimos 7 dias fue ${bestDay.label} con ${formatCurrency(bestDay.total)}.`,
  } satisfies DashboardInsight;
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

  if (preset === 'all') {
    return {
      preset,
      from: '',
      to: '',
      fromDate: getStartOfToday(now),
      toDate: endOfToday,
      label: 'Todo el historial',
    } satisfies TipStatsRange;
  }

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

export function resolveAllTimeTipStatsRange(tips: TipRecord[]) {
  const now = new Date();

  if (tips.length === 0) {
    return {
      preset: 'all',
      from: '',
      to: '',
      fromDate: getStartOfToday(now),
      toDate: getEndOfDay(now),
      label: 'Todo el historial',
    } satisfies TipStatsRange;
  }

  const newestTip = tips[0];
  const oldestTip = tips[tips.length - 1];
  const fromDate = parseTipDate(oldestTip.tip_date);
  const toDate = getEndOfDay(parseTipDate(newestTip.tip_date));

  return {
    preset: 'all',
    from: oldestTip.tip_date,
    to: newestTip.tip_date,
    fromDate,
    toDate,
    label: 'Todo el historial',
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

export function buildTipPeriodStats(
  tips: TipRecord[],
  period: 'week' | 'month',
) {
  const totals = tips.reduce<Record<string, { total: number; count: number }>>(
    (groups, tip) => {
      const key = getPeriodKey(parseTipDate(tip.tip_date), period);
      groups[key] ??= { total: 0, count: 0 };
      groups[key].total += tip.amount;
      groups[key].count += 1;
      return groups;
    },
    {},
  );

  return Object.entries(totals)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => ({
      key,
      label:
        period === 'month' ? formatMonthLabel(key) : formatWeekRangeLabel(key),
      total: value.total,
      count: value.count,
    })) satisfies TipPeriodStat[];
}
