import { TrackList } from '@/02_widgets/track-list';

export function TrackListPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Gran Turismo 7 - Track list</h1>
        <p className="text-zinc-400">Choose track to check its details and suitable car setups</p>
      </header>

      <TrackList />
    </div>
  );
}
