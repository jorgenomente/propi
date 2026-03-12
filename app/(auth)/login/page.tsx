import { redirect } from 'next/navigation';

import { SupabaseEnvCard } from '@/components/auth/supabase-env-card';
import { hasSupabasePublicEnv } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

import { AuthForm } from '../auth-form';
import { loginAction } from '../actions';

export default async function LoginPage() {
  if (!hasSupabasePublicEnv()) {
    return <SupabaseEnvCard />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <AuthForm
      action={loginAction}
      title="Bienvenido de nuevo"
      description="Ingresa con tu correo y tu contrasena para volver a tu panel personal."
      submitLabel="Iniciar sesion"
      alternateHref="/register"
      alternateLabel="Crear cuenta"
    />
  );
}
