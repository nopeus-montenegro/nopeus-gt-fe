import { useSearchParams } from 'next/navigation';

import { TRACK_FILTER } from '@/05_shared/lib/const';
import { Track } from '@prisma/client';

export function useFilter(tracks: Track[]) {
  const searchParams = useSearchParams();
  let filtered = [...tracks];

  const region = searchParams.get(TRACK_FILTER.REGION)?.split(',') || [];
  const trackClass = searchParams.get(TRACK_FILTER.TRACK_CLASS)?.split(',') || [];
  const bop = searchParams.get(TRACK_FILTER.BOP)?.split(',') || [];
  const surface = searchParams.get(TRACK_FILTER.SURFACE)?.split(',') || [];
  const rain = searchParams.get(TRACK_FILTER.RAIN);
  const sophy = searchParams.get(TRACK_FILTER.SOPHY);

  if (region.length > 0) {
    filtered = filtered.filter(t => region.includes(t.region));
  }

  if (trackClass.length > 0) {
    filtered = filtered.filter(t => trackClass.includes(t.trackClass));
  }

  if (bop.length > 0) {
    filtered = filtered.filter(t => bop.includes(t.bopClass));
  }

  if (surface.length > 0) {
    filtered = filtered.filter(t => surface.includes(t.surface));
  }

  if (rain !== null) {
    filtered = filtered.filter(t => t.hasRain);
  }

  if (sophy !== null) {
    filtered = filtered.filter(t => t.hasSophy);
  }

  return filtered;
}
