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
import { useRef, useState } from 'react';
import { ReactCountryFlag } from 'react-country-flag';

interface Props {
  track: Track;
}

export function TrackStickyHeader({ track }: Props) {
  const isScrolled = useStickyHeader(240);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const pointerStartY = useRef<number | null>(null);
  const pointerCurrentY = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartY.current = e.clientY;
    pointerCurrentY.current = null;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerStartY.current === null) return;

    pointerCurrentY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartY.current === null) return;

    const distance = pointerCurrentY.current !== null
      ? pointerCurrentY.current - pointerStartY.current
      : 0;

    const swipeThreshold = 30;

    if (Math.abs(distance) > swipeThreshold) {
      setIsMobileExpanded(distance > 0);
    } else {
      setIsMobileExpanded(prev => !prev);
    }

    pointerStartY.current = null;
    pointerCurrentY.current = null;

    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const ClassIcon = TRACK_CLASS_ICONS[track.trackClass];
  const SurfaceIcon = TRACK_SURFACE_ICONS[track.surface];

  return (
    <div className="fixed top-0 md:top-8 md:px-8 right-0 z-20 flex justify-center w-full transition-colors duration-300 touch-none">
      <div className="container max-w-5xl">
        <div className={cn(
          'rounded-b-2xl md:rounded-2xl border border-secondary/5 bg-secondary/30 backdrop-blur-sm pb-4 md:pb-0 transition-all duration-300',
          !isMobileExpanded && 'py-4 shadow-xl shadow-black/40',
          isScrolled
            ? 'md:py-4 md:shadow-xl md:shadow-black/40'
            : 'md:py-6 md:shadow-none',
        )}
        >
          <div className={cn(
            isMobileExpanded
              ? 'py-4 px-6 max-h-[80dvh] overflow-y-auto overscroll-contain scrollbar-none'
              : 'px-6 py-4 overflow-hidden max-h-none',
            !isScrolled
              ? 'md:py-6 md:max-h-[80dvh] md:overflow-y-auto md:overscroll-contain md:scrollbar-none'
              : 'md:overflow-visible md:max-h-none',
          )}
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
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
                    isMobileExpanded ? 'text-2xl' : 'text-xl',
                    !isScrolled
                      ? 'md:text-2xl lg:text-3xl'
                      : 'md:text-xl lg:text-xl',
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
              isMobileExpanded
                ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-white/5'
                : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-transparent',
              !isScrolled
                ? 'md:grid-rows-[1fr] md:opacity-100 md:mt-6 md:pt-6 md:border-t md:border-white/5'
                : 'md:grid-rows-[0fr] md:opacity-0 md:mt-0 md:pt-0 md:border-t-transparent',
            )}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="md:col-span-2 h-full rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-center text-slate-500 text-sm font-mono relative">
                    <span className="absolute top-2 left-2 text-[10px] text-slate-600">TRACK LAYOUT</span>
                    [ Track scheme ]
                  </div>

                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between sm:flex-col px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
                      <div className="my-1 text-xs text-slate-400">Length:</div>
                      <div className="text-base font-bold text-white">
                        {track.length}
                        {' m'}
                      </div>
                    </div>

                    <div className="flex justify-between sm:flex-col px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
                      <div className="my-1 text-xs text-slate-400 mb-1">Longest Straight:</div>
                      <div className="text-base font-bold text-white">
                        {track.longestStraight}
                        {' m'}
                      </div>
                    </div>

                    <div className="flex justify-between sm:flex-col px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
                      <div className="my-1 text-xs text-slate-400 mb-1">Corners:</div>
                      <div className="text-base font-bold text-white">{track.cornerCount}</div>
                    </div>

                    <div className="flex justify-between sm:flex-col px-6 py-4 bg-slate-950/20 rounded-xl border border-white/5">
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

          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="block md:hidden w-full cursor-pointer group select-none py-1"
          >
            <div
              className={cn(
                'w-12 h-1.5 mx-auto rounded-full bg-slate-400/40 transition-transform duration-200 group-hover:bg-slate-400',
                isMobileExpanded
                  ? 'scale-x-85 opacity-60'
                  : 'rotate-0 scale-x-100 opacity-100',
                !isScrolled
                  ? 'md:scale-x-85 md:opacity-60'
                  : 'md:rotate-0 md:scale-x-100 md:opacity-100',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
