'use client';

import Link from 'next/link';

import { Track, TrackRegion } from '@prisma/client';

import { TrackCard } from '@/04_entities/track';
import { REGION_LABEL } from '@/05_shared/lib/dictionaries';
import { trackDetailRoute } from '@/05_shared/lib/next/routes';
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
    regions.map((region) => {
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
              <Link
                key={track.id}
                href={trackDetailRoute(track.id)}
              >
                <TrackCard track={track} />
              </Link>
            ))}
          </div>
        </section>
      );
    })
  );
}
