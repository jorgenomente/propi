export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="from-background via-muted/50 to-background flex min-h-screen items-center justify-center bg-linear-to-b px-4 py-10">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-center space-y-6 px-2 lg:px-6">
          <p className="text-muted-foreground text-sm tracking-[0.24em] uppercase">
            Propi
          </p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Registra propinas en segundos, sin perder el ritmo.
            </h1>
            <p className="text-muted-foreground max-w-lg text-base leading-7">
              Un flujo directo para entrar, guardar montos y volver al trabajo
              con el menor numero de pasos posible.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border-border/60 bg-background/80 rounded-2xl border p-4">
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Hoy
              </p>
              <p className="mt-3 text-2xl font-semibold">$0</p>
            </div>
            <div className="border-border/60 bg-background/80 rounded-2xl border p-4">
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Semana
              </p>
              <p className="mt-3 text-2xl font-semibold">$0</p>
            </div>
            <div className="border-border/60 bg-background/80 rounded-2xl border p-4">
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Mes
              </p>
              <p className="mt-3 text-2xl font-semibold">$0</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          {children}
        </section>
      </div>
    </main>
  );
}
