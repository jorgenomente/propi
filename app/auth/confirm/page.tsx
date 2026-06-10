'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/';
  }

  return value;
}

function AuthConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    async function confirmSession() {
      const supabase = createClient();
      const nextPath = getSafeNextPath(searchParams.get('next'));
      const invalidLinkPath = '/reset-password?error=invalid_link';
      const code = searchParams.get('code');

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (isMounted) {
          router.replace(error ? invalidLinkPath : nextPath);
        }

        return;
      }

      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (isMounted) {
          router.replace(error ? invalidLinkPath : nextPath);
        }

        return;
      }

      if (isMounted) {
        router.replace(invalidLinkPath);
      }
    }

    void confirmSession();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <p className="text-muted-foreground text-sm">Preparando tu acceso...</p>
  );
}

export default function AuthConfirmPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Suspense
        fallback={
          <p className="text-muted-foreground text-sm">
            Preparando tu acceso...
          </p>
        }
      >
        <AuthConfirmContent />
      </Suspense>
    </main>
  );
}
