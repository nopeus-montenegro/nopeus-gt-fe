import { TrackList } from '@/02_widgets/track-list';
import { TrackFilters } from '@/03_features/filter-sort';
import { getTrackList } from '@/04_entities/track/index.server';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { Suspense } from 'react';

export async function TrackListPage() {
  const tracks = await getTrackList();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Gran Turismo 7 - Track list</h1>
        <p className="text-zinc-400">Choose track to check its details and suitable car setups</p>
      </header>

      <Breadcrumbs />

      <div className="space-y-12">
        <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
          <TrackList tracks={tracks} />
        </Suspense>
      </div>

      <Suspense>
        <TrackFilters />
      </Suspense>
    </div>
  );
}
