export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_55%)]" />
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <section className="border-border bg-card relative overflow-hidden rounded-[32px] border px-6 py-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.2)] sm:px-8 sm:py-10 lg:min-h-[620px] lg:px-10 lg:py-12">
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(99,102,241,0.06),transparent)]" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="border-border bg-muted text-muted-foreground inline-flex items-center rounded-full border px-4 py-1 text-xs font-semibold tracking-[0.24em] uppercase">
                Propi
              </div>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-balance sm:text-5xl lg:text-[3.6rem]">
                  Registra propinas con una interfaz simple y precisa.
                </h1>
                <p className="text-muted-foreground max-w-lg text-sm leading-7 sm:text-base">
                  Entra, guarda montos y vuelve al turno sin friccion. Todo el
                  sistema esta pensado para uso movil y consulta inmediata.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border-border bg-muted/70 rounded-3xl border p-4">
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  Hoy
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  $0
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Vista inmediata
                </p>
              </div>
              <div className="border-border bg-muted/70 rounded-3xl border p-4">
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  Semana
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  $0
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Seguimiento simple
                </p>
              </div>
              <div className="border-border bg-muted/70 rounded-3xl border p-4">
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  Mes
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  $0
                </p>
                <p className="text-muted-foreground mt-2 text-sm">Sin ruido</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center lg:justify-end">
          {children}
        </section>
      </div>
    </main>
  );
}
