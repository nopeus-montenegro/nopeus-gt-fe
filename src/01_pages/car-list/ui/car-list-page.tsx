import Link from 'next/link';

import { prisma } from '@/05_shared/lib/prisma/db';

export default async function CarListPage() {
  const cars = await prisma.car.findMany({
    orderBy: [
      { manufacturer: 'asc' },
      { name: 'asc' },
    ],
  });

  const groupedCars = cars.reduce((acc, car) => {
    const brand = car.manufacturer;
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(car);
    return acc;
  }, {} as Record<string, typeof cars>);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Race Cars</h1>
        <p className="text-zinc-400">Select a car to view its engineering setups and telemetry</p>
      </header>

      <div className="space-y-6">
        {Object.entries(groupedCars).map(([brand, carList]) => (
          <div key={brand} className="space-y-3">
            <h2 className="text-xl font-bold border-b border-zinc-850 pb-1 text-zinc-300">
              {brand}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carList.map(car => (
                <Link
                  key={car.id}
                  href={`/car/${car.id}`}
                  className="block p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
                >
                  <div className="font-bold text-base line-clamp-1">{car.name}</div>
                  <div className="flex gap-3 text-xs text-zinc-500 mt-2 font-mono">
                    <span>
                      Group:
                      {car.class}
                    </span>
                    <span>
                      Year:
                      {car.year}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
