'use client';

import { TRACK_SURFACE_ICONS } from '@/05_shared/config/surface-icons';
import { TRACK_CLASS_ICONS } from '@/05_shared/config/track-icons';
import { useStickyHeader } from '@/05_shared/hooks/use-sticky-header';
import { BOP_CLASS_LABEL, SURFACE_LABEL, TRACK_CLASS_LABEL } from '@/05_shared/lib/dictionaries';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { Track } from '@prisma/client';
import * as countryCodes from 'country-codes-list';
import { CloudHail, HeartCrack, TrafficCone } from 'lucide-react';
import { ReactCountryFlag } from 'react-country-flag';

interface Props {
  track: Track;
}

export function TrackStickyHeader({ track }: Props) {
  const isScrolled = useStickyHeader(160);

  const ClassIcon = TRACK_CLASS_ICONS[track.trackClass];
  const SurfaceIcon = TRACK_SURFACE_ICONS[track.surface];

  return (
    <div className={cn(
      'fixed top-4 right-0 z-20 flex justify-center w-full pt-6 pb-4 transition-colors duration-300',
    )}
    >
      <div className="container max-w-5xl">
        <div className={cn(
          'rounded-2xl border border-secondary/5 bg-secondary/30 backdrop-blur-sm p-6 transition-all duration-300',
          isScrolled ? 'p-4 shadow-xl shadow-black/40' : 'p-6',
        )}
        >

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                <ReactCountryFlag
                  countryCode={countryCodes.findOne('countryNameEn', track.country)?.countryCode as string}
                  svg
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <h1 className={cn(
                  'font-bold tracking-tight bg-linear-to-br from-white to-white/40 bg-clip-text text-transparent transition-all duration-300',
                  isScrolled ? 'text-xl' : 'text-2xl md:text-3xl',
                )}
                >
                  {track.name}
                </h1>

                {track.configName
                  && (
                    <p className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide uppercase">
                      <TrafficCone className="w-4 h-4 text-white/40" />
                      {' '}
                      {track.configName}
                    </p>
                  )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="h-8 border border-accent/30 bg-accent/10 text-accent">
                BoP:
                {' '}
                {BOP_CLASS_LABEL[track.bopClass]}
              </Badge>

              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title={`Track class: ${TRACK_CLASS_LABEL[track.trackClass]}`}>
                <ClassIcon className="w-5 h-5" />
              </div>

              {track.hasSophy && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title="Sophy available">
                  <HeartCrack className="w-5 h-5 text-purple-400/80" />
                </div>
              )}

              {track.hasRain && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title="Rain available">
                  <CloudHail className="w-4 h-4 text-blue-400/80" />
                </div>
              )}

              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5" title={`Surface: ${SURFACE_LABEL[track.surface]}`}>
                <SurfaceIcon className="w-5 h-5 text-white/60" />
              </div>
            </div>
          </div>

          <div className={cn(
            'grid transition-all duration-300 ease-in-out overflow-hidden',
            isScrolled ? 'grid-rows-[0fr] opacity-0 mt-0' : 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-white/5',
          )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1 h-full rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-center text-slate-500 text-sm font-mono relative">
                  <span className="absolute top-2 left-2 text-[10px] text-slate-600">TRACK LAYOUT</span>
                  [ Track scheme ]
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
                    <div className="my-1 text-xs text-slate-400">Length:</div>
                    <div className="text-base font-bold text-white">
                      {track.length}
                      {' m'}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
                    <div className="my-1 text-xs text-slate-400 mb-1">Longest Straight:</div>
                    <div className="text-base font-bold text-white">
                      {track.longestStraight}
                      {' m'}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
                    <div className="my-1 text-xs text-slate-400 mb-1">Corners:</div>
                    <div className="text-base font-bold text-white">{track.cornerCount}</div>
                  </div>

                  <div className="px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
                    <div className="my-1 text-xs text-slate-400 mb-1">Elevation Difference:</div>
                    <div className="text-base font-bold text-white">
                      {track.elevationDiff}
                      {' m'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
