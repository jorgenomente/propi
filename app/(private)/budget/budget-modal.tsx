'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  ArrowDown,
  ArrowUp,
  Banknote,
  CalendarDays,
  Plus,
  ReceiptText,
  Repeat2,
  Trash2,
  WalletCards,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import {
  createBudgetItemAction,
  deleteBudgetItemAction,
  type BudgetDeleteState,
  type BudgetFormState,
} from './actions';
import type { BudgetItem, BudgetItemType, BudgetSnapshot } from '@/lib/budget';

type BudgetModalProps = {
  snapshot: BudgetSnapshot;
};

type BudgetTypeOption = {
  value: BudgetItemType;
  label: string;
  description: string;
};

const typeOptions: BudgetTypeOption[] = [
  {
    value: 'fixed_income',
    label: 'Ingreso fijo',
    description: 'Sueldo u otro ingreso mensual',
  },
  {
    value: 'fixed_expense',
    label: 'Gasto fijo',
    description: 'Alquiler, servicios o cuotas',
  },
  {
    value: 'variable_expense',
    label: 'Gasto del mes',
    description: 'Compras o gastos puntuales',
  },
];

const typeLabels: Record<BudgetItemType, string> = {
  fixed_income: 'Ingreso fijo',
  fixed_expense: 'Gasto fijo',
  variable_expense: 'Gasto del mes',
};

const initialFormState: BudgetFormState = {};
const initialDeleteState: BudgetDeleteState = {};

function formatCurrency(value: number) {
  const formattedValue = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `$${formattedValue}`;
}

function formatAmountInput(value: string) {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return { display: '', raw: '' };
  }

  const normalizedInteger = digits.replace(/^0+(?=\d)/, '');
  const formattedInteger = new Intl.NumberFormat('es-AR').format(
    Number(normalizedInteger || '0'),
  );

  return {
    display: formattedInteger,
    raw: normalizedInteger || '0',
  };
}

function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function formatBudgetDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(`${value}T00:00:00`));
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="h-12 w-full text-sm" disabled={pending}>
      <Plus className="size-4" />
      {pending ? 'Guardando...' : 'Agregar movimiento'}
    </Button>
  );
}

function DeleteBudgetItemButton({ item }: { item: BudgetItem }) {
  const [state, formAction] = useActionState(
    deleteBudgetItemAction,
    initialDeleteState,
  );
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={item.id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        disabled={pending}
        aria-label={`Eliminar ${item.name}`}
      >
        <Trash2 className="size-4" />
      </Button>
      {state?.error ? (
        <p role="alert" className="text-destructive mt-2 text-xs">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}

function BudgetTotal({
  label,
  value,
  tone = 'neutral',
}: {
  label: string;
  value: number;
  tone?: 'positive' | 'negative' | 'neutral';
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border px-3 py-3',
        tone === 'positive' &&
          'border-emerald-200 bg-emerald-50 text-emerald-950',
        tone === 'negative' && 'border-rose-200 bg-rose-50 text-rose-950',
        tone === 'neutral' && 'border-border bg-card',
      )}
    >
      <p className="text-muted-foreground text-[11px] tracking-[0.14em] uppercase">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

export function BudgetModal({ snapshot }: BudgetModalProps) {
  const [state, formAction] = useActionState(
    createBudgetItemAction,
    initialFormState,
  );
  const [selectedType, setSelectedType] = useState<BudgetItemType>(
    (state?.type as BudgetItemType | undefined) ?? 'variable_expense',
  );
  const formRef = useRef<HTMLFormElement>(null);
  const hiddenAmountRef = useRef<HTMLInputElement>(null);
  const formState = state ?? initialFormState;
  const errorId = formState.error ? 'budget-form-error' : undefined;
  const successId = formState.success ? 'budget-form-success' : undefined;
  const amountValue = formatAmountInput(formState.amount ?? '');
  const budgetDateValue = formState.budgetDate || getTodayInputValue();
  const canRepeat = selectedType !== 'variable_expense';

  useEffect(() => {
    if (!formState.success) {
      return;
    }

    formRef.current?.reset();

    if (hiddenAmountRef.current) {
      hiddenAmountRef.current.value = '';
    }
  }, [formState.success]);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="border-border/80 bg-card/85 hover:bg-secondary/70 rounded-[28px] border p-5 text-left transition-colors"
          />
        }
      >
        <span className="text-muted-foreground inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase">
          <WalletCards className="size-4" />
          Presupuesto
        </span>
        <span className="mt-3 block text-2xl font-semibold tracking-[-0.03em]">
          Ver cuánto queda este mes
        </span>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[28px] p-0 sm:max-w-2xl">
        <div className="flex max-h-[calc(100dvh-1.5rem)] flex-col">
          <DialogHeader className="border-border bg-card border-b px-5 pt-5 pb-4">
            <DialogDescription className="text-xs tracking-[0.18em] uppercase">
              {snapshot.monthLabel}
            </DialogDescription>
            <DialogTitle className="text-3xl tracking-[-0.04em]">
              Presupuesto
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 overflow-y-auto px-5 py-5">
            <section className="bg-primary text-primary-foreground rounded-[28px] p-5">
              <p className="text-primary-foreground/70 text-xs tracking-[0.18em] uppercase">
                Cuánto queda
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
                {formatCurrency(snapshot.balance)}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-2xl border border-white/12 bg-white/10 p-3">
                  <p className="text-primary-foreground/70 text-[11px] tracking-[0.14em] uppercase">
                    Cuánto entra
                  </p>
                  <p className="mt-2 font-semibold">
                    {formatCurrency(
                      snapshot.tipsMonthTotal + snapshot.fixedIncomeTotal,
                    )}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/10 p-3">
                  <p className="text-primary-foreground/70 text-[11px] tracking-[0.14em] uppercase">
                    Cuánto sale
                  </p>
                  <p className="mt-2 font-semibold">
                    {formatCurrency(
                      snapshot.fixedExpenseTotal +
                        snapshot.variableExpenseTotal,
                    )}
                  </p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-2">
              <BudgetTotal label="Propinas" value={snapshot.tipsMonthTotal} />
              <BudgetTotal
                label="Ingresos fijos"
                value={snapshot.fixedIncomeTotal}
                tone="positive"
              />
              <BudgetTotal
                label="Gastos fijos"
                value={snapshot.fixedExpenseTotal}
                tone="negative"
              />
              <BudgetTotal
                label="Gastos del mes"
                value={snapshot.variableExpenseTotal}
                tone="negative"
              />
            </section>

            <form
              ref={formRef}
              action={formAction}
              className="border-border bg-card space-y-4 rounded-[28px] border p-4"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="budget-type">Tipo</Label>
                <select
                  id="budget-type"
                  name="type"
                  defaultValue={selectedType}
                  onChange={(event) =>
                    setSelectedType(event.currentTarget.value as BudgetItemType)
                  }
                  className="border-input bg-card focus-visible:border-ring focus-visible:ring-ring/20 h-12 w-full rounded-xl border px-4 text-base shadow-[0_1px_2px_rgba(15,23,42,0.02)] outline-none focus-visible:ring-4"
                >
                  {typeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-muted-foreground text-xs">
                  {
                    typeOptions.find((option) => option.value === selectedType)
                      ?.description
                  }
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget-name">Nombre</Label>
                <Input
                  id="budget-name"
                  name="name"
                  defaultValue={formState.name}
                  placeholder="Alquiler, sueldo, supermercado"
                  aria-invalid={Boolean(formState.error)}
                  aria-describedby={errorId ?? successId}
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget-amount-display">Monto</Label>
                  <div className="relative">
                    <Banknote className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                    <Input
                      key={formState.amount ?? 'empty'}
                      id="budget-amount-display"
                      type="text"
                      inputMode="numeric"
                      defaultValue={amountValue.display}
                      placeholder="50000"
                      aria-invalid={Boolean(formState.error)}
                      aria-describedby={errorId ?? successId}
                      className="pl-11 text-lg font-semibold"
                      onChange={(event) => {
                        const nextAmount = formatAmountInput(
                          event.target.value,
                        );
                        event.currentTarget.value = nextAmount.display;

                        if (hiddenAmountRef.current) {
                          hiddenAmountRef.current.value = nextAmount.raw;
                        }
                      }}
                      required
                    />
                    <input
                      ref={hiddenAmountRef}
                      name="amount"
                      type="hidden"
                      defaultValue={amountValue.raw}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget-date">Fecha</Label>
                  <div className="relative">
                    <CalendarDays className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                    <Input
                      id="budget-date"
                      name="budgetDate"
                      type="date"
                      defaultValue={budgetDateValue}
                      max={getTodayInputValue()}
                      aria-invalid={Boolean(formState.error)}
                      aria-describedby={errorId ?? successId}
                      className="pl-11"
                      required
                    />
                  </div>
                </div>
              </div>

              {canRepeat ? (
                <label className="border-border bg-secondary/35 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium">
                  <input
                    type="checkbox"
                    name="isRecurring"
                    defaultChecked={formState.isRecurring}
                    className="accent-primary size-4"
                  />
                  <Repeat2 className="text-muted-foreground size-4" />
                  Repetir todos los meses
                </label>
              ) : null}

              {formState.error ? (
                <p
                  id={errorId}
                  role="alert"
                  className="border-destructive/30 bg-destructive/10 text-destructive rounded-2xl border px-4 py-3 text-sm"
                >
                  {formState.error}
                </p>
              ) : null}

              {formState.success ? (
                <p
                  id={successId}
                  role="status"
                  className="rounded-2xl border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                >
                  {formState.success}
                </p>
              ) : null}

              <SubmitButton />
            </form>

            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Movimientos</p>
                  <p className="text-muted-foreground text-xs">
                    Fijos y gastos registrados para este mes.
                  </p>
                </div>
                <ReceiptText className="text-muted-foreground size-5" />
              </div>

              {snapshot.items.length > 0 ? (
                <div className="space-y-2">
                  {snapshot.items.map((item) => {
                    const isIncome = item.type === 'fixed_income';
                    const Icon = isIncome ? ArrowUp : ArrowDown;

                    return (
                      <div
                        key={item.id}
                        className="border-border bg-card flex items-start justify-between gap-3 rounded-2xl border px-4 py-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'flex size-8 items-center justify-center rounded-xl',
                                isIncome
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700',
                              )}
                            >
                              <Icon className="size-4" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">
                                {item.name}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {typeLabels[item.type]} ·{' '}
                                {formatBudgetDate(item.budget_date)}
                                {item.is_recurring ? ' · Mensual' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-start gap-1">
                          <p className="pt-2 text-sm font-semibold">
                            {isIncome ? '+' : '-'}
                            {formatCurrency(item.amount)}
                          </p>
                          <DeleteBudgetItemButton item={item} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border-border bg-card rounded-2xl border px-4 py-5 text-sm">
                  Todavia no cargaste ingresos ni gastos.
                </div>
              )}
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
