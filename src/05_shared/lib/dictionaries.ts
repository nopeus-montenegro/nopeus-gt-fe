import { BopTrackClass, TrackClass, TrackRegion, TrackSurface } from '@prisma/client';

export const REGION_LABEL: Record<TrackRegion, string> = {
  [TrackRegion.EUROPE_MIDDLE_EAST]: 'Europe & Middle East',
  [TrackRegion.AMERICAS]: 'Americas',
  [TrackRegion.ASIA_OCEANIA]: 'Asia-Oceania',
};

export const TRACK_CLASS_LABEL: Record<TrackClass, string> = {
  [TrackClass.TECHNICAL]: 'Technical',
  [TrackClass.SPEED]: 'Speed',
  [TrackClass.HYBRID]: 'Hybrid',
  [TrackClass.RALLY]: 'Rally',
};

export const BOP_CLASS_LABEL: Record<BopTrackClass, string> = {
  [BopTrackClass.LOW_SPEED]: 'Low-speed',
  [BopTrackClass.MID_SPEED]: 'Mid-speed',
  [BopTrackClass.HIGH_SPEED]: 'High-speed',
};

export const SURFACE_LABEL: Record<TrackSurface, string> = {
  [TrackSurface.DIRT]: 'Dirt',
  [TrackSurface.SNOW]: 'Snow',
  [TrackSurface.TARMAC]: 'Tarmac',
};
