'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Wrench } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Authorization } from '@/03_features/authorization';
import { LapTimeCarInclude, LapTimeTrackInclude } from '@/04_entities/lap-time';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { CARDS_PER_PAGE } from '@/05_shared/lib/const';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal/ui/portal';

import { SetupAction } from './setup-action';

dayjs.extend(relativeTime);

interface Props<T extends LapTimeCarInclude | LapTimeTrackInclude> {
  lapTimeList: T[];
  id: string;
  searchParams: ResolvedPageSearchParams;
  fetch: (id: string, currentSearchParams: ResolvedPageSearchParams, nextPage?: number) => Promise<T[]>;
  children: (item: T, action: ReactNode) => ReactNode;
}

export function SetupList<T extends LapTimeCarInclude | LapTimeTrackInclude>({ lapTimeList, children, id, searchParams, fetch }: Props<T>) {
  const [data, setData] = useState(lapTimeList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(lapTimeList.length === CARDS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

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
      const newItems = await fetch(id, searchParams, nextPage);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newItems]);
        setPage(nextPage);

        if (newItems.length < CARDS_PER_PAGE) setHasMore(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Portal>
        <ModalDrawerControlled
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
        >
          {() => <Authorization />}
        </ModalDrawerControlled>
      </Portal>

      <div className="relative z-10 container mx-auto px-4 max-w-5xl mt-6 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="w-5 h-5 text-slate-400" />
          <h2 className="text-xl font-semibold tracking-tight text-white">Setups:</h2>
        </div>

        <div className="space-y-4">
          {
            data.map(lapTime => (
              <div key={lapTime.id}>
                {children(lapTime, <SetupAction id={lapTime.setup.id} onUnauthenticated={() => setIsOpen(true)} />)}
              </div>
            ))
          }
        </div>

        {hasMore && (
          <div ref={ref} className="w-full flex justify-center">
            <span className="mt-12 text-slate-500 animate-pulse text-sm uppercase tracking-widest">
              Loading...
            </span>
          </div>
        )}
      </div>
    </>
  );
}
