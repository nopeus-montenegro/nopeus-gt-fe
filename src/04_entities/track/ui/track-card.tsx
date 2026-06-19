import { Track } from '@prisma/client';
import * as countryCodes from 'country-codes-list';
import { CloudHail, HeartCrack, TrafficCone } from 'lucide-react';

import { TRACK_SURFACE_ICONS } from '@/05_shared/config/surface-icons';
import { TRACK_CLASS_ICONS } from '@/05_shared/config/track-icons';
import { BOP_CLASS_LABEL, SURFACE_LABEL, TRACK_CLASS_LABEL } from '@/05_shared/lib/dictionaries';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/05_shared/ui/shadcn/card';
import { ReactCountryFlag } from 'react-country-flag';

interface Props {
  track: Track;
}

export function TrackCard({ track }: Props) {
  const ClassIcon = TRACK_CLASS_ICONS[track.trackClass];
  const SurfaceIcon = TRACK_SURFACE_ICONS[track.surface];

  return (
    <Card className="relative overflow-hidden min-h-52 h-full bg-background/30 backdrop-blur-xl border-white/10 shadow-lg transition-all hover:bg-background/40 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/40">
      <div className="absolute -inset-0.5 bg-linear-to-br from-white/20 to-transparent opacity-0 transition-opacity hover:opacity-100 pointer-events-none rounded-xl" />

      <CardHeader className="pb-3 flex flex-row gap-8 items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 bg-clip-text text-transparent">{track.name}</CardTitle>
          {track.configName
            && (
              <p className="text-base tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 bg-clip-text text-transparent mt-1 flex items-center gap-1">
                <TrafficCone className="w-4 h-4 text-white/40" />
                {' '}
                {track.configName}
              </p>
            )}
        </div>

        <div className="flex items-center justify-center w-10 h-10 mt-1.5 rounded-full bg-secondary/30 backdrop-blur-sm overflow-hidden shrink-0">
          <ReactCountryFlag
            countryCode={countryCodes.findOne('countryNameEn', track.country)?.countryCode as string}
            svg
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            title={track.country}
          />
        </div>
      </CardHeader>

      <CardContent className="flex gap-2 items-center justify-between mt-auto">
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="h-10 border border-accent/30 bg-accent/10 text-accent">
            BoP:
            {' '}
            {BOP_CLASS_LABEL[track.bopClass]}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full tracking-tight bg-slate-800/50 border border-white/5" title={`Track class: ${TRACK_CLASS_LABEL[track.trackClass]}`}>
            <ClassIcon className="w-6 h-6" />
          </div>

          {track.hasSophy && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full tracking-tight bg-slate-800/50 border border-white/5" title="Sophy available">
              <HeartCrack className="w-6 h-6 text-purple-400/80" />
            </div>
          )}

          {track.hasRain && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full tracking-tight bg-slate-800/50 border border-white/5" title="Rain available">
              <CloudHail className="w-5 h-5 text-blue-400/80" />
            </div>
          )}

          <div className="flex items-center justify-center w-10 h-10 rounded-full tracking-tight bg-slate-800/50 border border-white/5" title={`Surface: ${SURFACE_LABEL[track.surface]}`}>
            <SurfaceIcon className="w-5 h-5 text-white/60" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
