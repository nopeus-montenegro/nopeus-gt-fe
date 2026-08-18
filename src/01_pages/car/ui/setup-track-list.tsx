'use client';

import { Car } from '@prisma/client';
import { useEffect, useRef, useState, useTransition } from 'react';

import { SetupList } from '@/02_widgets/setup-list';
import { SetupTrackFilters } from '@/03_features/filter-sort';
import { useUrlFilters } from '@/03_features/filter-sort/hooks/use-url-filters';
import { LapTimeTrackInclude } from '@/04_entities/lap-time';
import { SetupSkeleton, SetupTrack } from '@/04_entities/setup';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { fetchLapTimesTrack } from '@/app/actions/lap-times';

interface Props {
  carId: string;
  initialLapTimes: LapTimeTrackInclude[];
  car: Car;
}

export function SetupTrackList({ carId, initialLapTimes, car }: Props) {
  const { searchParams } = useUrlFilters();
  const currentParams = Object.fromEntries(searchParams.entries()) as ResolvedPageSearchParams;
  const paramsString = searchParams.toString();
  const hasUrlFiltersOnMount = Boolean(paramsString);

  const [lapTimes, setLapTimes] = useState(hasUrlFiltersOnMount ? [] : initialLapTimes);
  const [isPending, startTransition] = useTransition();
  const [listKey, setListKey] = useState(hasUrlFiltersOnMount ? 'loading' : paramsString);

  const isFirstRender = useRef(true);
  const cacheRef = useRef<Record<string, LapTimeTrackInclude[]>>({});

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
      const filteredData = await fetchLapTimesTrack(carId, currentParams);
      setLapTimes(filteredData);

      setListKey(paramsString || 'clean');
    });
  }, [carId, paramsString]);

  return (
    <>
      <SetupTrackFilters isLoading={isPending} />

      {
        isInitialLoading
          ? <SetupSkeleton />
          : (
              <div
                className={
                  isPending
                    ? 'pointer-events-none opacity-40 transition-opacity duration-200'
                    : 'opacity-100 transition-opacity duration-200'
                }
              >
                <SetupList
                  key={listKey}
                  lapTimeList={lapTimes}
                  id={carId}
                  searchParams={currentParams}
                  fetch={fetchLapTimesTrack}
                >
                  {item => <SetupTrack lapTime={item} car={car} />}
                </SetupList>
              </div>
            )
      }
    </>
  );
}
