import { redirect } from 'next/navigation';

import { SupabaseEnvCard } from '@/components/auth/supabase-env-card';
import { hasSupabasePublicEnv } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

import { AuthForm } from '../auth-form';
import { registerAction } from '../actions';

export default async function RegisterPage() {
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
      action={registerAction}
      title="Crear cuenta"
      description="Crea tu acceso con correo y contrasena. En cuanto termines entras directo a Propi."
      submitLabel="Crear cuenta"
      alternateHref="/login"
      alternateLabel="Ya tengo cuenta. Iniciar sesion"
    />
  );
}
