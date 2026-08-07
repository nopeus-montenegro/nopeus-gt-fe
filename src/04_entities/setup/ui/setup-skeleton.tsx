import { Card, CardHeader } from '@/05_shared/ui/shadcn/card';
import { Skeleton } from '@/05_shared/ui/shadcn/skeleton';

export function SetupSkeleton() {
  return (
    <div className="max-w-5xl mx-auto mt-6 p-8 space-y-4">
      <Card className="w-full bg-slate-900/20 backdrop-blur-sm rounded-xl border border-white/55 opacity-20">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
      </Card>

      <Card className="w-full bg-slate-900/20 backdrop-blur-sm rounded-xl border border-white/55 opacity-20">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
      </Card>

      <Card className="w-full bg-slate-900/20 backdrop-blur-sm rounded-xl border border-white/55 opacity-20">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
      </Card>

      <Card className="w-full bg-slate-900/20 backdrop-blur-sm rounded-xl border border-white/55 opacity-20">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
      </Card>

      <Card className="w-full bg-slate-900/20 backdrop-blur-sm rounded-xl border border-white/55 opacity-20">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
      </Card>

      <Card className="w-full bg-slate-900/20 backdrop-blur-sm rounded-xl border border-white/55 opacity-20">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
      </Card>
    </div>
  );
}
