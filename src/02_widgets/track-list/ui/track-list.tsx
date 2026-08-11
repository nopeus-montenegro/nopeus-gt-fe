'use client';

import { Track, TrackRegion } from '@prisma/client';

import { TrackCard } from '@/04_entities/track';
import { REGIONS_PRELOAD } from '@/05_shared/lib/const';
import { REGION_LABEL } from '@/05_shared/lib/dictionaries';
import { useFilter } from '../hooks/use-filter';
import { useSort } from '../hooks/use-sort';

interface Props {
  tracks: Track[];
};

export function TrackList({ tracks }: Props) {
  const filtered = useFilter(tracks);
  const sorted = useSort(filtered);

  const regions = Object.values(TrackRegion);

  return (
    regions.map((region, index) => {
      const regionTracks = sorted.filter(t => t.region === region);

      if (regionTracks.length === 0) return null;

      return (
        <section key={region}>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">{REGION_LABEL[region]}</h2>
            <div className="h-px flex-1 bg-linear-to-r from-border/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {regionTracks.map(track => (
              <TrackCard key={track.id} track={track} preload={index < REGIONS_PRELOAD} />
            ))}
          </div>
        </section>
      );
    })
  );
}
