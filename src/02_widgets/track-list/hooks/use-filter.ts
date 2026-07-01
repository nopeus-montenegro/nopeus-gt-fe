import { TRACK_FILTER } from '@/05_shared/lib/const';
import { Track } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

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
    filtered = filtered.filter(t => trackClass.includes(t.region));
  }

  if (bop.length > 0) {
    filtered = filtered.filter(t => bop.includes(t.region));
  }

  if (surface.length > 0) {
    filtered = filtered.filter(t => surface.includes(t.region));
  }

  if (rain !== null) {
    filtered = filtered.filter(t => String(t.hasRain) === rain);
  }

  if (sophy !== null) {
    filtered = filtered.filter(t => String(t.hasSophy) === sophy);
  }

  return filtered;
}
