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
      className="bg-primary text-primary-foreground focus-visible:ring-ring/20 fixed right-5 bottom-5 z-40 inline-flex h-14 items-center gap-2 rounded-full px-5 shadow-[0_18px_40px_-20px_rgba(17,24,39,0.45)] transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:outline-none sm:right-8 sm:bottom-8"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-white/12">
        <Plus className="size-5" />
      </span>
      <span className="hidden text-sm font-medium sm:inline">
        Nueva propina
      </span>
    </Link>
  );
}
