'use client';

import Link from 'next/link';

import { CarCard, type CarInclude } from '@/04_entities/car';
import { carDetailRoute } from '@/05_shared/lib/next/routes';
import { useFilter } from '../hooks/use-filter';
import { useSort } from '../hooks/use-sort';

interface Props {
  cars: CarInclude[];
}

export function CarList({ cars }: Props) {
  const filtered = useFilter(cars);
  const sorted = useSort(filtered);

  const groupedCars = sorted.reduce((acc, car) => {
    const brand = car.manufacturer;
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(car);
    return acc;
  }, {} as Record<string, CarInclude[]>);

  return (
    Object.entries(groupedCars).map(([manufacturer, carList]) => (
      <section key={manufacturer} className="space-y-3">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">{manufacturer}</h2>
          <div className="h-px flex-1 bg-linear-to-r from-border/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {carList.map(car => (
            <Link
              key={car.id}
              href={carDetailRoute(car.id)}
            >
              <CarCard car={car} />
            </Link>
          ))}
        </div>
      </section>
    ))
  );
}
