'use server';

import { LapTimeCarInclude, LapTimeTrackInclude } from '@/04_entities/lap-time';
import { getLapTimeCar, getLapTimeTrack } from '@/04_entities/lap-time/index.server';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';

export async function fetchMoreLapTimesCar(
  id: string,
  nextPage: number,
  currentSearchParams: ResolvedPageSearchParams,
) {
  return await getLapTimeCar(id, { ...currentSearchParams, page: String(nextPage) }) as LapTimeCarInclude[];
}

export async function fetchMoreLapTimesTrack(
  id: string,
  nextPage: number,
  currentSearchParams: ResolvedPageSearchParams,
) {
  return await getLapTimeTrack(id, { ...currentSearchParams, page: String(nextPage) }) as LapTimeTrackInclude[];
}
