'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Wrench } from 'lucide-react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { LapTimeCarInclude, LapTimeTrackInclude } from '@/04_entities/lap-time';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';

dayjs.extend(relativeTime);

interface Props<T extends LapTimeCarInclude | LapTimeTrackInclude> {
  lapTimeList: T[];
  id: string;
  searchParams: ResolvedPageSearchParams;
  fetch: (id: string, nextPage: number, currentSearchParams: ResolvedPageSearchParams) => Promise<T[]>;
  children: (item: T) => React.ReactNode;
}

export function SetupList<T extends LapTimeCarInclude | LapTimeTrackInclude>({ lapTimeList, children, id, searchParams, fetch }: Props<T>) {
  const [data, setData] = useState(lapTimeList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(lapTimeList.length === 12);
  const [isLoading, setIsLoading] = useState(false);

  const { ref } = useInView({
    threshold: 0,
    rootMargin: '400px',
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        loadMore();
      }
    },
  });

  const loadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const newItems = await fetch(id, nextPage, searchParams);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newItems]);
        setPage(nextPage);

        if (newItems.length < 12) setHasMore(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 container mx-auto px-4 max-w-5xl mt-6 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="w-5 h-5 text-slate-400" />
        <h2 className="text-xl font-semibold tracking-tight text-white">Setups:</h2>
      </div>

      <div className="space-y-4">
        {
          data.map(lapTime => (
            <div key={lapTime.id}>
              {children(lapTime)}
            </div>
          ))
        }
      </div>

      {hasMore && (
        <div ref={ref} className="w-full flex justify-center p-8">
          <span className="text-slate-500 animate-pulse text-sm uppercase tracking-widest">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}
