'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

export type EditTipFormState = {
  error?: string;
  amount?: string;
  tipDate?: string;
};

const tipSchema = z.object({
  amount: z.coerce.number().positive('Ingresa un monto mayor a 0.'),
  tipDate: z.iso
    .date('Selecciona una fecha valida.')
    .refine((value) => value <= new Date().toISOString().slice(0, 10), {
      message: 'No puedes registrar propinas en una fecha futura.',
    }),
});

export async function updateTipAction(
  tipId: string,
  _previousState: EditTipFormState | void,
  formData: FormData,
) {
  const parsed = tipSchema.safeParse({
    amount: formData.get('amount'),
    tipDate: formData.get('tipDate'),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
      amount: String(formData.get('amount') ?? ''),
      tipDate: String(formData.get('tipDate') ?? ''),
    } satisfies EditTipFormState;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('tips')
    .update({
      amount: parsed.data.amount,
      tip_date: parsed.data.tipDate,
    })
    .eq('id', tipId);

  if (error) {
    return {
      error: 'No se pudo actualizar la propina. Intenta otra vez.',
      amount: String(formData.get('amount') ?? ''),
      tipDate: parsed.data.tipDate,
    } satisfies EditTipFormState;
  }

  redirect('/history');
}

export async function deleteTipAction(tipId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('tips').delete().eq('id', tipId);

  if (error) {
    redirect(`/edit/${tipId}?error=delete`);
  }

  redirect('/history');
}
