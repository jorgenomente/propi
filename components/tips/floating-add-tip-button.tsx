'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';

export function FloatingAddTipButton() {
  const pathname = usePathname();

  if (pathname === '/add') {
    return null;
  }

  return (
    <Link
      href="/add"
      aria-label="Agregar propina"
      className="bg-primary text-primary-foreground focus-visible:ring-ring/20 fixed right-4 bottom-5 z-40 inline-flex h-14 items-center gap-3 rounded-full px-4 pr-5 shadow-[0_18px_40px_-20px_rgba(17,24,39,0.45),0_0_0_10px_rgba(12,122,130,0.08)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-24px_rgba(17,24,39,0.5),0_0_0_12px_rgba(12,122,130,0.12)] focus-visible:ring-4 focus-visible:outline-none motion-safe:animate-[fabPulse_3.2s_ease-in-out_infinite] sm:right-8 sm:bottom-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-white/10 opacity-70 blur-xl transition-opacity duration-300 motion-safe:animate-[fabHalo_3.2s_ease-in-out_infinite]"
      />
      <span className="relative flex size-9 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/15">
        <Plus className="size-5 motion-safe:animate-[fabIconNudge_3.2s_ease-in-out_infinite]" />
      </span>
      <span className="relative text-sm font-semibold tracking-[-0.01em]">
        Agregar propina
      </span>
    </Link>
  );
}
