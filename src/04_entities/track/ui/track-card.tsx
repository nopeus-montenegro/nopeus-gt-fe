import { BopTrackClass, TrackClass, TrackSurface } from '@prisma/client';
import * as countryCodes from 'country-codes-list';
import { TrafficCone } from 'lucide-react';

import { TRACK_SURFACE_ICONS } from '@/05_shared/config/surface-icons';
import { TRACK_CLASS_ICONS } from '@/05_shared/config/track-icons';
import { BOP_CLASS_LABEL, SURFACE_LABEL, TRACK_CLASS_LABEL } from '@/05_shared/lib/dictionaries';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/05_shared/ui/shadcn/card';
import { ReactCountryFlag } from 'react-country-flag';

interface TrackCardProps {
  name: string;
  config: string;
  country: string;
  trackClass: TrackClass;
  bopClass: BopTrackClass;
  surface: TrackSurface;
}

export function TrackCard({ name, config, trackClass, bopClass, country, surface }: TrackCardProps) {
  const ClassIcon = TRACK_CLASS_ICONS[trackClass];
  const SurfaceIcon = TRACK_SURFACE_ICONS[surface];

  return (
    <Card className="relative overflow-hidden min-h-52 h-full bg-background/30 backdrop-blur-xl border-white/10 shadow-lg transition-all hover:bg-background/40 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/40">
      <div className="absolute -inset-0.5 bg-linear-to-br from-white/20 to-transparent opacity-0 transition-opacity hover:opacity-100 pointer-events-none rounded-xl" />

      <CardHeader className="pb-3 flex flex-row gap-8 items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 bg-clip-text text-transparent">{name}</CardTitle>
          {config
            && (
              <p className="text-base tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 bg-clip-text text-transparent mt-1 flex items-center gap-1">
                <TrafficCone className="w-4 h-4 text-white/40" />
                {' '}
                {config}
              </p>
            )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 mt-1.5 rounded-full bg-secondary/30 backdrop-blur-sm overflow-hidden shrink-0">
            <ReactCountryFlag
              countryCode={countryCodes.findOne('countryNameEn', country)?.countryCode as string}
              svg
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              title={country}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-between mt-auto">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className="border-accent text-base text-accent h-10">
              BoP:
              {' '}
              {BOP_CLASS_LABEL[bopClass]}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 backdrop-blur-sm border border-secondary/5" title={`Track class: ${TRACK_CLASS_LABEL[trackClass]}`}>
            {ClassIcon && <ClassIcon className="w-6 h-6" />}
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-full tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 backdrop-blur-sm border border-secondary/5" title={`Surface: ${SURFACE_LABEL[surface]}`}>
            {SurfaceIcon && <SurfaceIcon className="w-5 h-5 text-secondary/90" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
