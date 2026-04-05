'use client';

import dynamic from 'next/dynamic';

const InstallAppBanner = dynamic(
  () =>
    import('@/components/pwa/install-app-banner').then(
      (mod) => mod.InstallAppBanner,
    ),
  { ssr: false },
);

const FloatingAddTipButton = dynamic(
  () =>
    import('@/components/tips/floating-add-tip-button').then(
      (mod) => mod.FloatingAddTipButton,
    ),
  { ssr: false },
);

export function PrivateRouteChrome() {
  return (
    <>
      <InstallAppBanner />
      <FloatingAddTipButton />
    </>
  );
}
