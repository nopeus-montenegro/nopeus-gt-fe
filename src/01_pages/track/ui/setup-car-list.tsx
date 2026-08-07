'use client';

import { SetupList } from '@/02_widgets/setup-list';
import { FilterList, SetupCarFilters } from '@/03_features/filter-sort';
import { useUrlFilters } from '@/03_features/filter-sort/hooks/use-url-filters';
import { LapTimeCarInclude } from '@/04_entities/lap-time';
import { SetupCar, SetupSkeleton } from '@/04_entities/setup';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { fetchLapTimesCar } from '@/app/actions/lap-times';
import { useEffect, useRef, useState, useTransition } from 'react';

interface Props {
  trackId: string;
  initialLapTimes: LapTimeCarInclude[];
  filterList: FilterList;
}

export function SetupCarList({ trackId, initialLapTimes, filterList }: Props) {
  const { searchParams } = useUrlFilters();
  const currentParams = Object.fromEntries(searchParams.entries()) as ResolvedPageSearchParams;
  const paramsString = searchParams.toString();
  const hasUrlFiltersOnMount = Boolean(paramsString);

  const [lapTimes, setLapTimes] = useState(hasUrlFiltersOnMount ? [] : initialLapTimes);
  const [isPending, startTransition] = useTransition();
  const [listKey, setListKey] = useState(hasUrlFiltersOnMount ? 'loading' : paramsString);

  const isFirstRender = useRef(true);
  const cacheRef = useRef<Record<string, LapTimeCarInclude[]>>({});

  const isInitialLoading = hasUrlFiltersOnMount && listKey === 'loading';

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!paramsString) {
        return;
      }
    }

    if (cacheRef.current[paramsString]) {
      setLapTimes(cacheRef.current[paramsString]);
      setListKey(paramsString);
      return;
    }

    startTransition(async () => {
      const currentParams = Object.fromEntries(
        new URLSearchParams(paramsString).entries(),
      ) as ResolvedPageSearchParams;
      const filteredData = await fetchLapTimesCar(trackId, currentParams);
      setLapTimes(filteredData);

      setListKey(paramsString || 'clean');
    });
  }, [trackId, paramsString]);

  return (
    <>
      <SetupCarFilters
        filterList={filterList}
        isLoading={isPending}
      />

      {
        isInitialLoading
          ? <SetupSkeleton />
          : (
              <div
                className={
                  isPending && hasUrlFiltersOnMount
                    ? 'pointer-events-none opacity-40 transition-opacity duration-200'
                    : 'opacity-100 transition-opacity duration-200'
                }
              >
                <SetupList
                  key={listKey}
                  lapTimeList={lapTimes}
                  id={trackId}
                  searchParams={currentParams}
                  fetch={fetchLapTimesCar}
                >
                  {item => <SetupCar lapTime={item} />}
                </SetupList>
              </div>
            )
      }
    </>
  );
}
