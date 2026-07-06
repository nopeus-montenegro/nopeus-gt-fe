import { useSearchParams } from 'next/navigation';

import { SORT_DIRECTION, SORT_TYPE, TRACK_SORT } from '@/05_shared/lib/const';
import { Track } from '@prisma/client';

export function useSort(tracks: Track[]) {
  const searchParams = useSearchParams();

  const sortDirection = searchParams.get(SORT_TYPE.DIRECTION) || SORT_DIRECTION.ASCENDING;
  const sortBy = searchParams.get(SORT_TYPE.DATA) || TRACK_SORT.NAME;

  const modifier = sortDirection === SORT_DIRECTION.ASCENDING ? 1 : -1;

  return tracks.toSorted((a, b) => {
    switch (sortBy) {
      case TRACK_SORT.LENGTH:
        return ((a.length || 0) - (b.length || 0)) * modifier;

      case TRACK_SORT.CORNERS:
        return ((a.cornerCount || 0) - (b.cornerCount || 0)) * modifier;

      case TRACK_SORT.STRAIGHT:
        return ((a.longestStraight || 0) - (b.longestStraight || 0)) * modifier;

      case TRACK_SORT.ELEVATION:
        return ((a.elevationDiff || 0) - (b.elevationDiff || 0)) * modifier;

      case TRACK_SORT.NAME:
      default:
        return a.name.localeCompare(b.name) * modifier;
    }
  });
}
