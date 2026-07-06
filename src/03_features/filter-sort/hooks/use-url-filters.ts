'use client';

import { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}` as Route, { scroll: false });
  }, [searchParams, pathname, router]);

  const clearFilters = useCallback(() => {
    router.replace(pathname as Route, { scroll: false });
  }, [pathname, router]);

  return { searchParams, setFilter, clearFilters };
}
