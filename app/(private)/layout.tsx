import { PrivateRouteChrome } from '@/components/tips/private-route-chrome';

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_45%)]" />
      {children}
      <PrivateRouteChrome />
    </main>
  );
}
