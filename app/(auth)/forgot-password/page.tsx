import { redirect } from 'next/navigation';

import { SupabaseEnvCard } from '@/components/auth/supabase-env-card';
import { hasSupabasePublicEnv } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

import { ForgotPasswordForm } from './forgot-password-form';

export default async function ForgotPasswordPage() {
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

  return <ForgotPasswordForm />;
}
