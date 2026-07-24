'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../shadcn/button';

export function ButtonBack() {
  const router = useRouter();

  return (
    <Button className="mr-6" variant="outline" onClick={() => router.back()}>
      Reverse
    </Button>
  );
}
