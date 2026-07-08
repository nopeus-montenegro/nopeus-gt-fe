import { LucideIcon, Road, Snowflake, Tractor } from 'lucide-react';

import { TrackSurface } from '@prisma/client';

export const TRACK_SURFACE_ICONS: Record<TrackSurface, LucideIcon> = {
  DIRT: Tractor,
  SNOW: Snowflake,
  TARMAC: Road,
};
