import { BopTrackClass, CarClass, TrackClass, TrackRegion, TrackSurface } from '@prisma/client';

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

export const CAR_CLASS: Record<CarClass, string> = {
  [CarClass.GR_1]: 'Gr.1',
  [CarClass.GR_2]: 'Gr.2',
  [CarClass.GR_3]: 'Gr.3',
  [CarClass.GR_4]: 'Gr.4',
  [CarClass.GR_B]: 'Gr.B',
  [CarClass.ROAD]: 'Road Car',
};
