import { SetupList } from '@/02_widgets/setup-list';
import { TrackStickyHeader } from '@/04_entities/track';
import { prisma } from '@/05_shared/lib/prisma/db';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';

interface Props {
  trackId: string;
}

const trackInclude = {
  lapTimes: {
    include: {
      setup: {
        include: { car: true },
      },
    },
    orderBy: {
      lapTime: 'asc',
    },
  },
} satisfies Prisma.TrackInclude;

type Track = Prisma.TrackGetPayload<{ include: typeof trackInclude }>;

export async function TrackPage({ trackId }: Props) {
  const track = await prisma.track.findUnique({
    where: { id: trackId },
    include: trackInclude,
  }) as Track | null;

  if (!track) {
    notFound();
  }

  return (
    <SetupList
      header={<TrackStickyHeader track={track} />}
      data={track.lapTimes.map(lt => ({ setup: lt.setup, car: lt.setup.car }))}
    />
  );
}
