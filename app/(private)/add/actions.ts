'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

export type TipFormState = {
  error?: string;
  amount?: string;
};

const tipSchema = z.object({
  amount: z.coerce.number().positive('Ingresa un monto mayor a 0.'),
});

export async function createTipAction(
  _previousState: TipFormState | void,
  formData: FormData,
) {
  const parsed = tipSchema.safeParse({
    amount: formData.get('amount'),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
      amount: String(formData.get('amount') ?? ''),
    } satisfies TipFormState;
  }

  const supabase = await createClient();
  const { error } = await supabase.from('tips').insert({
    amount: parsed.data.amount,
  });

  if (error) {
    return {
      error: 'No se pudo guardar la propina. Intenta otra vez.',
      amount: String(formData.get('amount') ?? ''),
    } satisfies TipFormState;
  }

  redirect('/');
}
