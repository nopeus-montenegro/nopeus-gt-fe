'use client';

import { useInfiniteScroll } from '@/05_shared/hooks/use-infinite-scroll';
import { Fragment } from 'react';

interface Props<T> {
  items: T[];
  keyExtractor: (item: T) => string | number;
  children: (item: T) => React.ReactNode;
}

export function InfiniteScroll<T>({ items, keyExtractor, children }: Props<T>) {
  const { currentLength, hasMore, scrollRef } = useInfiniteScroll(items.length);

  return (
    <div className="mb-8 space-y-4">
      {items.slice(0, currentLength).map(item => (
        <Fragment key={keyExtractor(item)}>
          {children(item)}
        </Fragment>
      ))}

      {hasMore && (
        <div ref={scrollRef} className="w-full flex justify-center">
          <span className="mt-12 text-slate-500 animate-pulse text-sm uppercase tracking-widest">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}
