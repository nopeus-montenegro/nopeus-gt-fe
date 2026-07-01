import { SetupList } from '@/02_widgets/setup-list';
import { CarInclude, CarStickyHeader } from '@/04_entities/car';
import { getCar } from '@/04_entities/car/index.server';
import { LapTimeTrackInclude } from '@/04_entities/lap-time';
import { getLapTimeTrack } from '@/04_entities/lap-time/index.server';
import { SetupTrack } from '@/04_entities/setup';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs/ui/breadcrumbs';
import { notFound } from 'next/navigation';

interface Props {
  carId: string;
  searchParams: AsyncPageSearchParams;
}

export async function CarPage({ carId, searchParams }: Props) {
  const [car, lapTimes] = await Promise.all([
    getCar(carId),
    getLapTimeTrack(carId, await searchParams),
  ]) as [CarInclude | null, LapTimeTrackInclude[]];

  if (!car) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-128">
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
