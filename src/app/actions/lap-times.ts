'use server';

import { LapTimeCarInclude, LapTimeTrackInclude } from '@/04_entities/lap-time';
import { getLapTimeCarCached, getLapTimeTrackCached } from '@/04_entities/lap-time/model/get-lap-time';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';

export async function fetchLapTimesCar(
  id: string,
  currentSearchParams: ResolvedPageSearchParams,
  nextPage?: number,
) {
  return await getLapTimeCarCached(
    id,
    {
      ...currentSearchParams,
      page: nextPage ? String(nextPage) : undefined,
    },
  ) as LapTimeCarInclude[];
}

export async function fetchLapTimesTrack(
  id: string,
  currentSearchParams: ResolvedPageSearchParams,
  nextPage?: number,
) {
  return await getLapTimeTrackCached(
    id,
    {
      ...currentSearchParams,
      page: nextPage ? String(nextPage) : undefined,
    },
  ) as LapTimeTrackInclude[];
}
