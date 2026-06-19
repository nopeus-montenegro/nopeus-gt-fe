import { TrackList } from '@/02_widgets/track-list';
import { prisma } from '@/05_shared/lib/prisma/db';

export async function TrackListPage() {
  const tracks = await prisma.track.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Gran Turismo 7 - Track list</h1>
        <p className="text-zinc-400">Choose track to check its details and suitable car setups</p>
      </header>

      <div className="space-y-12">
        <TrackList tracks={tracks} />
      </div>
    </div>
  );
}
