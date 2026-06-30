import { notFound } from 'next/navigation';

import { SetupList } from '@/02_widgets/setup-list';
import { LapTimeCarInclude } from '@/04_entities/lap-time';
import { getLapTimeCar } from '@/04_entities/lap-time/model/get-lap-time';
import { SetupCar } from '@/04_entities/setup';
import { TrackStickyHeader } from '@/04_entities/track';
import { getTrack } from '@/04_entities/track/index.server';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { Track } from '@prisma/client';

interface Props {
  trackId: string;
}

export async function TrackPage({ trackId }: Props) {
  const [track, lapTimes] = await Promise.all([
    getTrack(trackId),
    getLapTimeCar(trackId),
  ]) as [Track | null, LapTimeCarInclude[]];

  if (!track) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <TrackStickyHeader track={track} />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [trackId]: `${track.name} ${track.configName}` }} />
      </div>

      <SetupList
        lapTimeList={lapTimes}
        renderItem={lapTime => <SetupCar key={lapTime.id} lapTime={lapTime} />}
      />
    </div>
  );
}
