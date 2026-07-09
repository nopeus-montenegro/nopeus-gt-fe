'use client';

import { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const accumulatedParamsRef = useRef<URLSearchParams | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const setFilter = useCallback((filters: { key: string; value: string | null }[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!accumulatedParamsRef.current) {
      accumulatedParamsRef.current = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : searchParams.toString(),
      );
    }

    const params = accumulatedParamsRef.current;

    filters.forEach(({ key, value }) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    timerRef.current = setTimeout(() => {
      router.replace(`${pathname}?${params.toString()}` as Route, { scroll: false });

      accumulatedParamsRef.current = null;
    }, 300);
  }, [searchParams, pathname, router]);

  const clearFilters = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    accumulatedParamsRef.current = null;
    router.replace(pathname as Route, { scroll: false });
  }, [pathname, router]);

  return { searchParams, setFilter, clearFilters };
}
