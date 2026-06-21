import { SetupList } from '@/02_widgets/setup-list';
import { CarInclude, carInclude, CarStickyHeader } from '@/04_entities/car';
import { LapTimeTrackInclude, lapTimeTrackInclude } from '@/04_entities/lap-time';
import { SetupTrack } from '@/04_entities/setup';
import { prisma } from '@/05_shared/lib/prisma/db';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs/ui/breadcrumbs';
import { notFound } from 'next/navigation';

interface Props {
  carId: string;
}

export async function CarPage({ carId }: Props) {
  const [car, lapTimes] = await Promise.all([
    prisma.car.findUnique({
      where: { id: carId },
      include: carInclude,
    }),

    prisma.lapTime.findMany({
      where: {
        setup: {
          carId: carId,
        },
      },
      include: lapTimeTrackInclude,
    }),
  ]) as [CarInclude | null, LapTimeTrackInclude[]];

  if (!car) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-118">
      <div className="container mx-auto px-4 max-w-5xl">
        <CarStickyHeader car={car} />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [carId]: `${car.manufacturer} ${car.name} ${car.year}` }} />
      </div>

      <SetupList
        lapTimeList={lapTimes}
        renderItem={lapTime => <SetupTrack key={lapTime.id} lapTime={lapTime} />}
      />
    </div>
  );
}
