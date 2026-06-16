'use client';

import { cn } from '@/05_shared/lib/shadcn/utils';
import { Track } from '@prisma/client';
import * as countryCodes from 'country-codes-list';
import { CloudRain, HeartCrack } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ReactCountryFlag } from 'react-country-flag';

interface Props {
  track: Track;
}

export function TrackStickyHeader({ track }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      'fixed top-0 z-20 w-full pt-6 pb-4 transition-colors duration-300',
      // isScrolled ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent',
    )}
    >
      <div className="container mx-auto px-4 max-w-5xl">
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
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                  {track.configName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {track.hasRain && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5 text-blue-400" title="Дождь">
                  <CloudRain className="w-4 h-4" />
                </div>
              )}
              {track.hasSophy && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 border border-white/5 text-purple-400" title="Gran Turismo Sophy">
                  <HeartCrack className="w-4 h-4" />
                </div>
              )}

              <span className="ml-2 px-3 py-1 text-xs font-semibold rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">
                BoP:
                {' '}
                {track.bopClass}
              </span>
            </div>
          </div>

          <div className={cn(
            'grid transition-all duration-300 ease-in-out overflow-hidden',
            isScrolled ? 'grid-rows-[0fr] opacity-0 mt-0' : 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-white/5',
          )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

                <div className="md:col-span-1 h-32 rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-center text-slate-500 text-sm font-mono relative">
                  <span className="absolute top-2 left-2 text-[10px] text-slate-600">TRACK LAYOUT</span>
                  [ Track scheme ]
                </div>

                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-950/20 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-400 mb-1">Length</div>
                    <div className="text-base font-bold text-white">{track.length}</div>
                  </div>
                  <div className="bg-slate-950/20 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-400 mb-1">Longest Straight</div>
                    <div className="text-base font-bold text-white">{track.longestStraight}</div>
                  </div>
                  <div className="bg-slate-950/20 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-400 mb-1">Corners</div>
                    <div className="text-base font-bold text-white">{track.cornerCount}</div>
                  </div>
                  <div className="bg-slate-950/20 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-400 mb-1">Elevation Diff</div>
                    <div className="text-base font-bold text-white">{track.elevationDiff}</div>
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
