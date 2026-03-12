import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SupabaseEnvCard() {
  return (
    <Card className="bg-card/88 w-full max-w-md border-white/60 shadow-[0_32px_90px_-52px_rgba(15,23,42,0.55)] backdrop-blur-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Configuracion pendiente</CardTitle>
        <CardDescription className="text-sm leading-6">
          La app necesita las variables publicas de Supabase para poder mostrar
          login, validar sesion y procesar autenticacion en produccion.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-950 dark:text-amber-100">
          Faltan `NEXT_PUBLIC_SUPABASE_URL` y/o `NEXT_PUBLIC_SUPABASE_ANON_KEY`
          en Vercel.
        </div>
        <div className="text-muted-foreground space-y-1">
          <p>Variables minimas a cargar en Production:</p>
          <p>`NEXT_PUBLIC_SUPABASE_URL`</p>
          <p>`NEXT_PUBLIC_SUPABASE_ANON_KEY`</p>
        </div>
        <p className="text-muted-foreground">
          Despues de guardarlas en Vercel, redeploya la ultima version para que
          la autenticacion quede operativa.
        </p>
        <Link
          href="https://vercel.com/jorgenomentes-projects/propi/settings/environment-variables"
          className="text-foreground font-medium underline underline-offset-4"
        >
          Abrir variables de entorno en Vercel
        </Link>
      </CardContent>
    </Card>
  );
}
