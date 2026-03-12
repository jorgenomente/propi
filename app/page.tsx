import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-16">
      <section className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Supabase local conectado
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Base lista para autenticación y datos
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          El proyecto ya puede crear clientes de Supabase en browser, server y
          middleware usando el entorno local.
        </p>
        <div className="bg-card text-card-foreground rounded-lg border p-4 text-sm">
          {user
            ? `Sesión activa: ${user.email ?? user.id}`
            : 'Sin sesión activa'}
        </div>
      </section>
    </main>
  );
}
