'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { hasSupabasePublicEnv } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

export type AuthFormState = {
  error?: string;
  email?: string;
  success?: string;
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

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const forwardedProto = requestHeaders.get('x-forwarded-proto');
  const forwardedHost = requestHeaders.get('x-forwarded-host');
  const host = forwardedHost ?? requestHeaders.get('host');

  if (!host) {
    return null;
  }

  return `${forwardedProto ?? 'https'}://${host}`;
}

export async function loginAction(
  _previousState: AuthFormState | void,
  formData: FormData,
) {
  if (!hasSupabasePublicEnv()) {
    return {
      error:
        'Faltan variables de entorno de Supabase en produccion. Configuralas en Vercel y redeploya.',
      email: String(formData.get('email') ?? ''),
    } satisfies AuthFormState;
  }

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
  if (!hasSupabasePublicEnv()) {
    return {
      error:
        'Faltan variables de entorno de Supabase en produccion. Configuralas en Vercel y redeploya.',
      email: String(formData.get('email') ?? ''),
    } satisfies AuthFormState;
  }

  const parsed = getCredentials(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
      email: String(formData.get('email') ?? ''),
    } satisfies AuthFormState;
  }

  const supabase = await createClient();
  const origin = await getRequestOrigin();
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: origin
      ? {
          emailRedirectTo: `${origin}/auth/callback?next=/`,
        }
      : undefined,
  });

  if (error) {
    return {
      error: getFriendlyAuthError(error.message),
      email: parsed.data.email,
    } satisfies AuthFormState;
  }

  if (!data.session) {
    return {
      success:
        'Te enviamos un correo para confirmar tu cuenta. Abre el enlace y entraras directo a Propi.',
      email: parsed.data.email,
    } satisfies AuthFormState;
  }

  redirect('/');
}
