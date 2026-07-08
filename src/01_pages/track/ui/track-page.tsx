import { notFound } from 'next/navigation';

import { SetupCarList } from '@/02_widgets/setup-list';
import { SetupCarFilters } from '@/03_features/filter-sort';
import { CarInclude } from '@/04_entities/car';
import { getCarList } from '@/04_entities/car/index.server';
import { LapTimeCarInclude } from '@/04_entities/lap-time';
import { getLapTimeCar } from '@/04_entities/lap-time/index.server';
import { TrackStickyHeader } from '@/04_entities/track';
import { getTrack } from '@/04_entities/track/index.server';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { fetchMoreLapTimesCar } from '@/app/actions/lap-times';
import { Track } from '@prisma/client';
import { Suspense } from 'react';

interface Props {
  trackId: string;
  searchParams: AsyncPageSearchParams;
}

export async function TrackPage({ trackId, searchParams }: Props) {
  const [track, lapTimes, cars] = await Promise.all([
    getTrack(trackId),
    getLapTimeCar(trackId, await searchParams),
    getCarList(),
  ]) as [Track | null, LapTimeCarInclude[], CarInclude[]];

  if (!track) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-54 sm:pt-48 md:pt-112">
      <div className="container mx-auto px-4 max-w-5xl">
        <TrackStickyHeader track={track} />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [trackId]: `${track.name} ${track.configName}` }} />
      </div>

      <SetupCarList
        lapTimeList={lapTimes}
        id={trackId}
        searchParams={await searchParams}
        fetch={fetchMoreLapTimesCar}
      />

      <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
        <SetupCarFilters
          filterList={
            (() => {
              const mSet = new Set<string>();
              const cSet = new Set<string>();

              for (const car of cars) {
                mSet.add(car.manufacturer);
                cSet.add(car.country);
              }

              return {
                manufacturers: [...mSet].sort(),
                countries: [...cSet].sort(),
              };
            })()
          }
        />
      </Suspense>
    </div>
  );
}
