import { CarList } from '@/02_widgets/car-ist';
import { CarInclude, carInclude } from '@/04_entities/car';
import { prisma } from '@/05_shared/lib/prisma/db';

export async function CarListPage() {
  const cars = await prisma.car.findMany({
    orderBy: [
      { manufacturer: 'asc' },
      { name: 'asc' },
    ],
    include: carInclude,
  }) as CarInclude[];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Gran Turismo 7 - Car List:</h1>
        <p className="text-zinc-400">Select a car to view its engineering setups</p>
      </header>

      <div className="space-y-12">
        <CarList cars={cars} />
      </div>
    </div>
  );
}
