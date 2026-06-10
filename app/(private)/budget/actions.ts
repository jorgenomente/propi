'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

export type BudgetFormState = {
  error?: string;
  success?: string;
  type?: string;
  name?: string;
  amount?: string;
  budgetDate?: string;
  isRecurring?: boolean;
};

export type BudgetDeleteState = {
  error?: string;
  success?: string;
};

const budgetItemSchema = z.object({
  type: z.enum(['fixed_income', 'fixed_expense', 'variable_expense'], {
    message: 'Selecciona un tipo valido.',
  }),
  name: z.string().trim().min(1, 'Ingresa un nombre.').max(80),
  amount: z.coerce.number().positive('Ingresa un monto mayor a 0.'),
  budgetDate: z.iso
    .date('Selecciona una fecha valida.')
    .refine((value) => value <= new Date().toISOString().slice(0, 10), {
      message: 'No puedes registrar movimientos en una fecha futura.',
    }),
  isRecurring: z.boolean(),
});

const deleteSchema = z.object({
  id: z.uuid('Movimiento invalido.'),
});

export async function createBudgetItemAction(
  _previousState: BudgetFormState | void,
  formData: FormData,
) {
  const parsed = budgetItemSchema.safeParse({
    type: formData.get('type'),
    name: formData.get('name'),
    amount: formData.get('amount'),
    budgetDate: formData.get('budgetDate'),
    isRecurring:
      formData.get('isRecurring') === 'on' &&
      formData.get('type') !== 'variable_expense',
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
      type: String(formData.get('type') ?? 'variable_expense'),
      name: String(formData.get('name') ?? ''),
      amount: String(formData.get('amount') ?? ''),
      budgetDate: String(formData.get('budgetDate') ?? ''),
      isRecurring: formData.get('isRecurring') === 'on',
    } satisfies BudgetFormState;
  }

  const supabase = await createClient();
  const { error } = await supabase.from('budget_items').insert({
    type: parsed.data.type,
    name: parsed.data.name,
    amount: parsed.data.amount,
    budget_date: parsed.data.budgetDate,
    is_recurring: parsed.data.isRecurring,
  });

  if (error) {
    return {
      error: 'No se pudo guardar el movimiento. Intenta otra vez.',
      type: parsed.data.type,
      name: parsed.data.name,
      amount: String(parsed.data.amount),
      budgetDate: parsed.data.budgetDate,
      isRecurring: parsed.data.isRecurring,
    } satisfies BudgetFormState;
  }

  revalidatePath('/');

  return {
    success: 'Movimiento guardado.',
    type: parsed.data.type,
    budgetDate: parsed.data.budgetDate,
  } satisfies BudgetFormState;
}

export async function deleteBudgetItemAction(
  _previousState: BudgetDeleteState | void,
  formData: FormData,
) {
  const parsed = deleteSchema.safeParse({
    id: formData.get('id'),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
    } satisfies BudgetDeleteState;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('budget_items')
    .delete()
    .eq('id', parsed.data.id);

  if (error) {
    return {
      error: 'No se pudo eliminar el movimiento. Intenta otra vez.',
    } satisfies BudgetDeleteState;
  }

  revalidatePath('/');

  return {
    success: 'Movimiento eliminado.',
  } satisfies BudgetDeleteState;
}
