import { notFound } from 'next/navigation';

import { SetupCarList } from '@/02_widgets/setup-list';
import { LapTimeInclude, lapTimeInclude } from '@/04_entities/setup';
import { TrackStickyHeader } from '@/04_entities/track';
import { prisma } from '@/05_shared/lib/prisma/db';
import { Track } from '@prisma/client';

interface Props {
  trackId: string;
}

export async function TrackPage({ trackId }: Props) {
  const [track, lapTimes] = await Promise.all([
    prisma.track.findUnique({
      where: { id: trackId },
    }),

    prisma.lapTime.findMany({
      where: {
        trackId: trackId,
      },
      orderBy: {
        lapTime: 'asc',
      },
      distinct: ['setupId'],
      include: lapTimeInclude,
    }),
  ]) as [Track | null, LapTimeInclude[]];

  if (!track) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-80">
      <div className="container mx-auto px-4 max-w-5xl">
        <TrackStickyHeader track={track} />
      </div>

      <SetupCarList lapTimeList={lapTimes} />
    </div>
  );
}
