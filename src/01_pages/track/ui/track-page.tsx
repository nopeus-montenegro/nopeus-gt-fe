import { Track } from '@prisma/client';
import { notFound } from 'next/navigation';

import { getFilterList } from '@/03_features/filter-sort';
import { CarInclude } from '@/04_entities/car';
import { getCarList } from '@/04_entities/car/index.server';
import { LapTimeCarInclude } from '@/04_entities/lap-time';
import { getLapTimeCarCached } from '@/04_entities/lap-time/index.server';
import { TrackStickyHeader } from '@/04_entities/track';
import { getTrack } from '@/04_entities/track/index.server';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { slugify } from '@/05_shared/utils/slugify';
import { Suspense } from 'react';
import { SetupCarList } from './setup-car-list';

interface Props {
  trackId: string;
}

export async function TrackPage({ trackId }: Props) {
  const [track, lapTimes, cars] = await Promise.all([
    getTrack(trackId),
    getLapTimeCarCached(trackId, {} as ResolvedPageSearchParams),
    getCarList(),
  ]) as [Track | null, LapTimeCarInclude[], CarInclude[]];

  if (!track) {
    notFound();
  }

  return (
    <div className="relative min-h-dvh pt-56 sm:pt-40 md:pt-136">
      <div className="container mx-auto px-4 max-w-5xl">
        <TrackStickyHeader track={track} />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [slugify([track.name, track.configName, trackId])]: `${track.name} ${track.configName}` }} />
      </div>

      <Suspense>
        <SetupCarList
          trackId={trackId}
          initialLapTimes={lapTimes}
          filterList={getFilterList(cars)}
        />
      </Suspense>
    </div>
  );
}
