import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card/88 rounded-[32px] border border-white/60 p-6 shadow-[0_32px_90px_-52px_rgba(15,23,42,0.55)] backdrop-blur-xl">
        <div className="space-y-4">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
