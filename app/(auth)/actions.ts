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

export type PasswordResetRequestState = {
  error?: string;
  email?: string;
  success?: string;
};

export type PasswordUpdateState = {
  error?: string;
  success?: string;
};

const authSchema = z.object({
  email: z.email('Ingresa un correo valido.'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

const emailSchema = z.object({
  email: z.email('Ingresa un correo valido.'),
});

const passwordUpdateSchema = z
  .object({
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    confirmPassword: z
      .string()
      .min(6, 'Confirma la contraseña con al menos 6 caracteres.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

function getCredentials(formData: FormData) {
  return authSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
}

function getEmail(formData: FormData) {
  return emailSchema.safeParse({
    email: formData.get('email'),
  });
}

function getNewPassword(formData: FormData) {
  return passwordUpdateSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
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

export async function requestPasswordResetAction(
  _previousState: PasswordResetRequestState | void,
  formData: FormData,
) {
  const email = String(formData.get('email') ?? '');

  if (!hasSupabasePublicEnv()) {
    return {
      error:
        'Faltan variables de entorno de Supabase en produccion. Configuralas en Vercel y redeploya.',
      email,
    } satisfies PasswordResetRequestState;
  }

  const parsed = getEmail(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
      email,
    } satisfies PasswordResetRequestState;
  }

  const origin = await getRequestOrigin();

  if (!origin) {
    return {
      error:
        'No se pudo preparar el enlace de recuperacion. Intenta nuevamente.',
      email: parsed.data.email,
    } satisfies PasswordResetRequestState;
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${origin}/auth/callback?next=/reset-password`,
    },
  );

  if (error) {
    return {
      error: 'No se pudo enviar el correo de recuperacion. Intenta nuevamente.',
      email: parsed.data.email,
    } satisfies PasswordResetRequestState;
  }

  return {
    success:
      'Si el correo existe en Propi, te enviamos un enlace para crear una contraseña nueva.',
    email: parsed.data.email,
  } satisfies PasswordResetRequestState;
}

export async function updatePasswordAction(
  _previousState: PasswordUpdateState | void,
  formData: FormData,
) {
  if (!hasSupabasePublicEnv()) {
    return {
      error:
        'Faltan variables de entorno de Supabase en produccion. Configuralas en Vercel y redeploya.',
    } satisfies PasswordUpdateState;
  }

  const parsed = getNewPassword(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message,
    } satisfies PasswordUpdateState;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error:
        'El enlace expiro o ya fue usado. Solicita uno nuevo para cambiar tu contraseña.',
    } satisfies PasswordUpdateState;
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return {
      error:
        'No se pudo actualizar la contraseña. Solicita un enlace nuevo e intenta otra vez.',
    } satisfies PasswordUpdateState;
  }

  await supabase.auth.signOut();

  return {
    success:
      'Contraseña actualizada. Ya puedes iniciar sesion con la nueva clave.',
  } satisfies PasswordUpdateState;
}
