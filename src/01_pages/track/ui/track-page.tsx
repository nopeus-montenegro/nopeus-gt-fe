import { Prisma } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { prisma } from '@/05_shared/lib/prisma/db';

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

  const activeRecords = track.lapTimes.filter(l => l.lapTime > 0);
  // const pendingSlots = track.lapTimes.filter(l => l.lapTime === 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-sm text-zinc-500 font-mono">
        <Link href="/track" className="hover:underline">← Назад к списку трасс</Link>
      </div>

      <header className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <span className="text-xs font-mono px-2 py-1 bg-zinc-800 rounded text-zinc-400">
          Тип трассы:
          {' '}
          {track.trackClass}
        </span>
        <h1 className="text-4xl font-black mt-2 tracking-tight">{track.name}</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">⏱️ Таблица рекордов</h2>
          {
            activeRecords.length === 0
              ? (
                  <p className="text-zinc-500 bg-zinc-900/50 p-4 rounded-lg border border-dashed border-zinc-800">
                    На этой трассе пока нет подтвержденных времен круга.
                  </p>
                )
              : (
                  <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900">
                    {/* Approved list */}
                  </div>
                )
          }
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">🛠️ Available Setups</h2>
          <div className="space-y-2">
            {track.lapTimes.map((lap) => {
              const { setup } = lap;
              return (
                <div
                  key={lap.id}
                  className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex justify-between items-center"
                >
                  <div>
                    <Link
                      href={`/setup/${setup.id}`}
                      className="font-bold text-blue-400 hover:underline block"
                    >
                      {setup.title}
                    </Link>
                    <span className="text-sm text-zinc-400">
                      {setup.car.manufacturer}
                      {' '}
                      {setup.car.name}
                    </span>
                  </div>

                  <div className="text-right font-mono text-sm">
                    {lap.lapTime === 0
                      ? (
                          <span className="text-zinc-600">NOT DRIVEN</span>
                        )
                      : (
                          <span className="text-green-400 font-bold">
                            {lap.lapTime}
                            {' '}
                            ms
                          </span>
                        )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
