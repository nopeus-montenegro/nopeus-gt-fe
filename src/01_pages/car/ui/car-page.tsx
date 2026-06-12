import Link from 'next/link';
import { notFound } from 'next/navigation';

import { prisma } from '@/05_shared/lib/prisma/db';

interface Props {
  carId: string;
}

export default async function CarPage({ carId }: Props) {
  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: {
      setups: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!car) {
    notFound();
  }

  const baseSetups = car.setups.filter(s => s.isBase);
  const customSetups = car.setups.filter(s => !s.isBase);

  const renderSetupCard = (setup: typeof car.setups[0]) => (
    <Link
      key={setup.id}
      href={`/setup/${setup.id}`}
      className="flex justify-between items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
    >
      <div>
        <div className="font-bold text-blue-400 hover:underline">{setup.title}</div>
        <div className="text-xs text-zinc-500 mt-1">
          Автор ID:
          {setup.authorId}
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 font-mono">
          Открыть инженерный лист →
        </span>
      </div>
    </Link>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-sm text-zinc-500 font-mono">
        <Link href="/car" className="hover:underline">← Назад к автопарку</Link>
      </div>

      <header className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <span className="text-xs font-mono px-2 py-1 bg-zinc-800 rounded text-zinc-400">
            Категория:
            {' '}
            {car.class}
          </span>
          <h1 className="text-4xl font-black mt-2 tracking-tight">
            {car.manufacturer}
            {' '}
            {car.name}
          </h1>
        </div>
        <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-850 flex flex-col justify-center font-mono text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-zinc-500">Year:</span>
            <span className="font-bold">{car.year}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🏁 Basic setups (
            {baseSetups.length}
            )
          </h2>
          {baseSetups.length === 0
            ? (
                <p className="text-zinc-500 italic text-sm">No basic setups available.</p>
              )
            : (
                <div className="space-y-2">{baseSetups.map(renderSetupCard)}</div>
              )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🎰 Custom setups (
            {customSetups.length}
            )
          </h2>
          {customSetups.length === 0
            ? (
                <p className="text-zinc-500 italic text-sm">No custom setups available for this car.</p>
              )
            : (
                <div className="space-y-2">{customSetups.map(renderSetupCard)}</div>
              )}
        </div>
      </div>
    </div>
  );
}
