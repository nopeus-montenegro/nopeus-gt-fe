'use client';

import { Button } from '@/05_shared/ui/shadcn/button';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 h-screen items-center justify-center text-center text-white">
      <div className="grid grid-cols-2 gap-y-8">
        <h1 className="flex flex-row align-middle border-r pr-6 text-3xl font-bold leading-12 border-white/30">
          <span className="text-sm font-normal mr-4 my-auto">Garage </span>
          404
        </h1>

        <h2 className="m-0 pl-8 text-sm font-normal text-start leading-12">
          Wrong lane
        </h2>

        <Button className="mr-6" variant="outline" onClick={() => router.back()}>
          Reverse
        </Button>

        <Button className="ml-6 mr-6" variant="outline" onClick={() => router.push('/')}>
          Main
        </Button>
      </div>
    </div>
  );
}
