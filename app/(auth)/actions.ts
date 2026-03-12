'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

export type AuthFormState = {
  error?: string;
  email?: string;
};

const authSchema = z.object({
  email: z.email('Ingresa un correo valido.'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

function getCredentials(formData: FormData) {
  return authSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
}

function getFriendlyAuthError(message: string) {
  if (message.toLowerCase().includes('invalid login credentials')) {
    return 'Correo o contraseña incorrectos.';
  }

  if (message.toLowerCase().includes('user already registered')) {
    return 'Ese correo ya tiene una cuenta.';
  }

  return 'No se pudo completar la autenticacion. Intenta otra vez.';
}

export async function loginAction(
  _previousState: AuthFormState | void,
  formData: FormData,
) {
  const parsed = getCredentials(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
      email: String(formData.get('email') ?? ''),
    } satisfies AuthFormState;
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      error: getFriendlyAuthError(error.message),
      email: parsed.data.email,
    } satisfies AuthFormState;
  }

  redirect('/');
}

export async function registerAction(
  _previousState: AuthFormState | void,
  formData: FormData,
) {
  const parsed = getCredentials(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
      email: String(formData.get('email') ?? ''),
    } satisfies AuthFormState;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(parsed.data);

  if (error) {
    return {
      error: getFriendlyAuthError(error.message),
      email: parsed.data.email,
    } satisfies AuthFormState;
  }

  if (!data.session) {
    const loginResult = await supabase.auth.signInWithPassword(parsed.data);

    if (loginResult.error) {
      return {
        error: getFriendlyAuthError(loginResult.error.message),
        email: parsed.data.email,
      } satisfies AuthFormState;
    }
  }

  redirect('/');
}
