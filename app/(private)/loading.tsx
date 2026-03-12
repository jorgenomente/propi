import { Skeleton } from '@/components/ui/skeleton';

export default function PrivateLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="border-border/60 bg-background/80 rounded-3xl border p-5 shadow-sm">
        <div className="space-y-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
      </div>
    </div>
  );
}
