import Link from 'next/link';

import { prisma } from '@/05_shared/lib/prisma/db';
import { TrackClass } from '@/generated/prisma/edge';

export default async function TrackListPage() {
  const tracks = await prisma.track.findMany({
    orderBy: { name: 'asc' },
  });

  const speedTracks = tracks.filter(t => t.trackClass === TrackClass.SPEED);
  const hybridTracks = tracks.filter(t => t.trackClass === TrackClass.HYBRID);
  const techTracks = tracks.filter(t => t.trackClass === TrackClass.TECHNICAL);

  const renderTrackList = (title: string, list: typeof tracks) => (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold border-b pb-1 text-zinc-400">
        {title}
        {' '}
        (
        {list.length}
        )
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(track => (
          <Link
            key={track.id}
            href={`/track/${track.id}`}
            className="block p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
          >
            <div className="font-bold text-lg">{track.name}</div>
            <div className="text-xs text-zinc-500 mt-1 font-mono">
              ID:
              {track.id}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Трассы GT7</h1>
        <p className="text-zinc-400">Choose track</p>
      </header>

      {speedTracks.length > 0 && renderTrackList('🏎️ Скоростные (Speed)', speedTracks)}
      {hybridTracks.length > 0 && renderTrackList('🔋 Гибридные (Hybrid)', hybridTracks)}
      {techTracks.length > 0 && renderTrackList('📐 Техничные (Technical)', techTracks)}
    </div>
  );
}
