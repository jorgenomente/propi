import { Skeleton } from '@/components/ui/skeleton';

export default function PrivateLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="bg-card/82 rounded-[32px] border border-white/50 p-6 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.55)] backdrop-blur">
        <div className="space-y-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-12 w-72" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Skeleton className="h-44 rounded-[28px]" />
        <Skeleton className="h-44 rounded-[28px]" />
        <Skeleton className="h-44 rounded-[28px]" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Skeleton className="h-14 rounded-[24px]" />
        <Skeleton className="h-14 rounded-[24px]" />
      </div>
    </div>
  );
}
