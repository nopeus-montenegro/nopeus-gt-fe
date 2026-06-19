import dayjs from 'dayjs';

import { LapTimeTrackInclude } from '@/04_entities/lap-time';
import { TRACK_SURFACE_ICONS } from '@/05_shared/config/surface-icons';
import { TRACK_CLASS_ICONS } from '@/05_shared/config/track-icons';
import { BOP_CLASS_LABEL, SURFACE_LABEL, TRACK_CLASS_LABEL } from '@/05_shared/lib/dictionaries';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { CloudHail, HeartCrack } from 'lucide-react';

interface Props {
  lapTime: LapTimeTrackInclude;
};

export function SetupTrack({ lapTime }: Props) {
  const ClassIcon = TRACK_CLASS_ICONS[lapTime.track.trackClass];
  const SurfaceIcon = TRACK_SURFACE_ICONS[lapTime.track.surface];

  return (
    <div
      key={lapTime.id}
      className="grid grid-cols-6 items-center gap-8 p-5 rounded-xl border border-white/5 bg-slate-900/20 backdrop-blur-sm hover:bg-slate-900/40 transition-colors"
    >
      <div className="col-span-2 flex flex-col items-start">
        <h3 className="flex items-center font-bold text-secondary text-lg">
          {lapTime.setup.title}
        </h3>

        <p className="flex flex-col gap-1 text-xs text-slate-400">
          <span className="pb-4">
            {'Author: '}
            {lapTime.setup.author.username}
          </span>

          <span className="text-secondary ">
            {lapTime.track.name}
            {lapTime.track.configName
              && (
                <span>
                  {' - '}
                  {lapTime.track.configName}

                </span>
              )}
          </span>

          <span className="flex items-center gap-2">
            {lapTime.track.length}
            {`m • `}
            {lapTime.track.longestStraight}
            m
            &nbsp;
            {'straight • '}
            {lapTime.track.cornerCount}
            &nbsp;
            {'corners • '}
            {lapTime.track.elevationDiff}
            m elevation
          </span>
        </p>
      </div>

      <div className="col-span-3 items-stretch flex flex-row-reverse flex-wrap gap-3">
        <Badge variant="outline" className="h-8 border border-accent/30 bg-accent/10 text-accent">
          BoP:
          {' '}
          {BOP_CLASS_LABEL[lapTime.track.bopClass]}
        </Badge>

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title={`Track class: ${TRACK_CLASS_LABEL[lapTime.track.trackClass]}`}>
          <ClassIcon className="w-5 h-5" />
        </div>

        {lapTime.track.hasSophy && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title="Sophy available">
            <HeartCrack className="w-5 h-5 text-purple-400/80" />
          </div>
        )}

        {lapTime.track.hasRain && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title="Rain available">
            <CloudHail className="w-4 h-4 text-blue-400/80" />
          </div>
        )}

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title={`Surface: ${SURFACE_LABEL[lapTime.track.surface]}`}>
          <SurfaceIcon className="w-5 h-5 text-white/60" />
        </div>

        {/* <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {lapTime.setup.car.class !== 'ROAD' && `${CAR_CLASS[lapTime.setup.car.class]} / `}
          {'PP '}
          {lapTime.setup.pp.toFixed(2)}
        </Badge>

        <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {lapTime.setup.car.drivetrain}
        </Badge> */}

        {/* <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {lapTime.setup.car.aspiration.replace('_', ' + ')}
        </Badge>

        <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {lapTime.setup.car.engineLayout}
          -ENGINE
        </Badge>

        {
          lapTime.setup.car.isHybrid
          && (
            <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
              HYBRID
            </Badge>
          )
        }

        {
          lapTime.setup.car.overtake !== 'NONE' && (
            <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {lapTime.setup.car.overtake.replace('_', ' ')}
            </Badge>
          )
        } */}
      </div>

      <div className="col-span-1 relative flex flex-col justify-end-safe h-full text-right">
        <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl font-mono text-emerald-400 font-semibold">{dayjs().startOf('day').millisecond(lapTime.lapTime).format(`m'ss.SSS`)}</span>

        <p className="text-xs text-slate-500">
          {lapTime.setup.author.username}
          {' • '}
          {dayjs(lapTime.setup.createdAt).fromNow()}
        </p>
      </div>
    </div>

  );
};
