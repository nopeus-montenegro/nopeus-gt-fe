import { notFound } from 'next/navigation';

import { SetupCarList } from '@/02_widgets/setup-list';
import { LapTimeCarInclude } from '@/04_entities/lap-time';
import { getLapTimeCar } from '@/04_entities/lap-time/index.server';
import { TrackStickyHeader } from '@/04_entities/track';
import { getTrack } from '@/04_entities/track/index.server';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { fetchMoreLapTimesCar } from '@/app/actions/lap-times';
import { Track } from '@prisma/client';

interface Props {
  trackId: string;
  searchParams: AsyncPageSearchParams;
}

export async function TrackPage({ trackId, searchParams }: Props) {
  const [track, lapTimes] = await Promise.all([
    getTrack(trackId),
    getLapTimeCar(trackId, await searchParams),
  ]) as [Track | null, LapTimeCarInclude[]];

  if (!track) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-54 sm:pt-48 md:pt-100">
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
    </div>
  );
}
