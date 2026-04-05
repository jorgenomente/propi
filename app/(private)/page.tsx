import { createClient } from '@/lib/supabase/server';
import { getDashboardSnapshot } from '@/lib/tips';

import { DashboardShell } from './dashboard-shell';

type DashboardPageProps = {
  searchParams?: Promise<{
    created?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const supabase = await createClient();
  const [
    {
      data: { user },
    },
    snapshot,
    resolvedSearchParams,
  ] = await Promise.all([
    supabase.auth.getUser(),
    getDashboardSnapshot(),
    searchParams ??
      Promise.resolve<{
        created?: string;
      }>({}),
  ]);
  const parsedCreatedAmount = Number(resolvedSearchParams?.created ?? '');
  const createdAmount = Number.isFinite(parsedCreatedAmount)
    ? parsedCreatedAmount
    : null;
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://propi-jade.vercel.app';
  const registerUrl = `${appUrl.replace(/\/+$/, '')}/register`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Mira Propi, la app para registrar propinas en segundos: ${registerUrl}`,
  )}`;
  const todayLabel = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
    <DashboardShell
      createdAmount={createdAmount}
      snapshot={snapshot}
      todayLabel={todayLabel}
      userLabel={user?.email ?? user?.id ?? 'Usuario'}
      whatsappShareUrl={whatsappShareUrl}
    />
  );
}
