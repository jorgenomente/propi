import Link from 'next/link';

import { SupabaseEnvCard } from '@/components/auth/supabase-env-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { hasSupabasePublicEnv } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

import { ResetPasswordForm } from './reset-password-form';

type ResetPasswordPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  if (!hasSupabasePublicEnv()) {
    return <SupabaseEnvCard />;
  }

  const resolvedSearchParams = await (searchParams ??
    Promise.resolve<{
      error?: string;
    }>({}));
  const hasInvalidLinkError = resolvedSearchParams?.error === 'invalid_link';
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Card className="border-border bg-card w-full max-w-md shadow-[0_20px_60px_-42px_rgba(15,23,42,0.24)]">
        <CardHeader className="space-y-3">
          <div className="bg-muted text-muted-foreground inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
            Enlace requerido
          </div>
          <CardTitle className="text-2xl" role="heading" aria-level={2}>
            {hasInvalidLinkError
              ? 'El enlace ya no esta disponible'
              : 'Solicita un enlace nuevo'}
          </CardTitle>
          <CardDescription className="text-sm leading-6">
            {hasInvalidLinkError
              ? 'Los enlaces de recuperacion vencen o dejan de servir despues de usarse. Solicita uno nuevo para crear otra contraseña.'
              : 'Para cambiar la contraseña necesitas abrir el enlace que enviamos a tu correo.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/forgot-password"
            className="text-foreground inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            Enviar enlace de recuperacion
          </Link>
        </CardContent>
      </Card>
    );
  }

  return <ResetPasswordForm />;
}
