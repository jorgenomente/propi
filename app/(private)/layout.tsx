export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="from-muted/40 via-background to-background min-h-screen bg-linear-to-b">
      {children}
    </main>
  );
}
