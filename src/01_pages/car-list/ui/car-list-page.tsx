import { Suspense } from 'react';

import { CarList } from '@/02_widgets/car-ist';
import { CarFilters } from '@/03_features/filter-sort';
import { getCarList } from '@/04_entities/car/index.server';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';

export async function CarListPage() {
  const cars = await getCarList();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Gran Turismo 7 - Car List:</h1>
        <p className="text-zinc-400">Select a car to view its engineering setups</p>
      </header>

      <Breadcrumbs />

      <div className="space-y-12">
        <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
          <CarList cars={cars} />
        </Suspense>
      </div>

      <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
        <CarFilters cars={cars} />
      </Suspense>
    </div>
  );
}
