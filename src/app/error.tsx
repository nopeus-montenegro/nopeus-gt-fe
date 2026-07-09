'use client';

import { Button } from '@/05_shared/ui/shadcn/button';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex flex-col gap-8 h-screen items-center justify-center text-center text-white">
      <div className="grid grid-cols-2 gap-y-8">
        <h1 className="flex flex-row align-middle border-r pr-6 text-2xl font-bold leading-12 border-white/30">
          Ooops!
        </h1>

        <h2 className="m-0 pl-8 text-sm font-normal text-start leading-12">
          Engine misfire
        </h2>

        <Button
          className="mr-8"
          variant="outline"
          onClick={() => {
            startTransition(() => {
              router.refresh();
              reset();
            });
          }}
        >
          Restart
        </Button>

        <Button className="ml-8" variant="outline" onClick={() => router.push('/')}>
          Main
        </Button>
      </div>
    </div>
  );
}
