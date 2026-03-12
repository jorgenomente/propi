'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivateError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-6">
      <Card className="border-border/60 bg-background/95 w-full rounded-3xl">
        <CardHeader className="space-y-3">
          <p className="text-muted-foreground text-xs tracking-[0.22em] uppercase">
            Propi
          </p>
          <CardTitle className="text-3xl">
            No pudimos cargar esta vista
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-muted-foreground text-sm leading-6">
            Intenta recargar la pantalla. Si el problema sigue, vuelve al
            dashboard y revisa la conexion con Supabase.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" className="h-11" onClick={() => reset()}>
              Reintentar
            </Button>
            <Link
              href="/"
              className="border-border bg-background text-foreground hover:bg-muted inline-flex h-11 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors"
            >
              Volver al dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
