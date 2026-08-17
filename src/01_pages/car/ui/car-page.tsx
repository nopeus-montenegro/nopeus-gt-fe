import { notFound } from 'next/navigation';

import { CarInclude, CarStickyHeader } from '@/04_entities/car';
import { getCar } from '@/04_entities/car/index.server';
import { LapTimeTrackInclude } from '@/04_entities/lap-time';
import { getLapTimeTrackCached } from '@/04_entities/lap-time/model/get-lap-time';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs/ui/breadcrumbs';
import { Suspense } from 'react';
import { SetupTrackList } from './setup-track-list';

interface Props {
  carId: string;
  searchParams: AsyncPageSearchParams;
}

export async function CarPage({ carId, searchParams }: Props) {
  const [car, lapTimes] = await Promise.all([
    getCar(carId),
    getLapTimeTrackCached(carId, await searchParams),
  ]) as [CarInclude | null, LapTimeTrackInclude[]];

  if (!car) {
    notFound();
  }

  return (
    <div className="relative min-h-dvh pt-64 sm:pt-48 md:pt-148">
      <div className="container mx-auto px-4 max-w-5xl">
        <CarStickyHeader car={car} />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [carId]: `${car.manufacturer} ${car.name} ${car.year}` }} />
      </div>

      <Suspense>
        <SetupTrackList
          initialLapTimes={lapTimes}
          carId={carId}
        />
      </Suspense>
    </div>
  );
}
