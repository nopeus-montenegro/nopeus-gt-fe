import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
      <Loader2 className="h-7 w-7 animate-spin text-zinc-400" />

      <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
        Loading...
      </span>
    </div>
  );
}
