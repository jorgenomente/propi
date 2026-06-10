import 'server-only';

import { createClient } from '@/lib/supabase/server';

export type BudgetItemType =
  | 'fixed_income'
  | 'fixed_expense'
  | 'variable_expense';

export type BudgetItem = {
  id: string;
  type: BudgetItemType;
  name: string;
  amount: number;
  budget_date: string;
  is_recurring: boolean;
  created_at: string;
};

export type BudgetSnapshot = {
  monthKey: string;
  monthLabel: string;
  monthStart: string;
  monthEnd: string;
  tipsMonthTotal: number;
  fixedIncomeTotal: number;
  fixedExpenseTotal: number;
  variableExpenseTotal: number;
  balance: number;
  items: BudgetItem[];
};

function formatDateInputValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

function getMonthRange(now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const monthKey = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
  const monthLabel = new Intl.DateTimeFormat('es-AR', {
    month: 'long',
    year: 'numeric',
  }).format(start);

  return {
    monthKey,
    monthLabel,
    monthStart: formatDateInputValue(start),
    monthEnd: formatDateInputValue(end),
  };
}

function sumItems(items: BudgetItem[], type: BudgetItemType) {
  return items.reduce(
    (total, item) => (item.type === type ? total + Number(item.amount) : total),
    0,
  );
}

export async function getBudgetSnapshot(now = new Date()) {
  const range = getMonthRange(now);
  const supabase = await createClient();

  const [{ data: tipsData, error: tipsError }, { data: itemsData, error }] =
    await Promise.all([
      supabase
        .from('tips')
        .select('amount')
        .gte('tip_date', range.monthStart)
        .lte('tip_date', range.monthEnd),
      supabase
        .from('budget_items')
        .select('id, type, name, amount, budget_date, is_recurring, created_at')
        .or(
          `and(is_recurring.eq.true,budget_date.lte.${range.monthEnd}),and(is_recurring.eq.false,budget_date.gte.${range.monthStart},budget_date.lte.${range.monthEnd})`,
        )
        .order('budget_date', { ascending: false })
        .order('created_at', { ascending: false }),
    ]);

  if (tipsError) {
    throw new Error(tipsError.message);
  }

  if (error) {
    throw new Error(error.message);
  }

  const items = (itemsData ?? []) as BudgetItem[];
  const tipsMonthTotal = (tipsData ?? []).reduce(
    (total, tip) => total + Number(tip.amount),
    0,
  );
  const fixedIncomeTotal = sumItems(items, 'fixed_income');
  const fixedExpenseTotal = sumItems(items, 'fixed_expense');
  const variableExpenseTotal = sumItems(items, 'variable_expense');

  return {
    ...range,
    tipsMonthTotal,
    fixedIncomeTotal,
    fixedExpenseTotal,
    variableExpenseTotal,
    balance:
      tipsMonthTotal +
      fixedIncomeTotal -
      fixedExpenseTotal -
      variableExpenseTotal,
    items,
  } satisfies BudgetSnapshot;
}
