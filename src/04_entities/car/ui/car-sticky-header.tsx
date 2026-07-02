'use client';

import { useStickyHeader } from '@/05_shared/hooks/use-sticky-header';
import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { useRef, useState } from 'react';
import { CarInclude } from '../lib/types';

interface Props {
  car: CarInclude;
}

export function CarStickyHeader({ car }: Props) {
  const isScrolled = useStickyHeader(320);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const touchStartY = useRef<number | null>(null);
  const touchCurrentY = useRef<number | null>(null);

  const isDesktop = typeof window !== 'undefined'
    ? window.matchMedia('(min-width: 768px)').matches
    : false;
  const isExpanded = isDesktop ? !isScrolled : isMobileExpanded;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchCurrentY.current) return;

    const swipeDistance = touchCurrentY.current - touchStartY.current;
    const swipeThreshold = 20;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        setIsMobileExpanded(true);
      } else {
        setIsMobileExpanded(false);
      }
    }

    touchStartY.current = null;
    touchCurrentY.current = null;
  };

  return (
    <div className="fixed top-0 md:top-8 md:px-8 right-0 z-20 flex justify-center w-full transition-colors duration-300">
      <div className="container max-w-5xl">
        <div className={cn(
          'rounded-b-2xl md:rounded-2xl border border-secondary/5 bg-secondary/30 backdrop-blur-sm pb-4 md:pb-0 transition-all duration-300',
          !isExpanded && 'py-4 shadow-xl shadow-black/40',
        )}
        >
          <div className={cn(isExpanded ? 'py-4 px-6 md:py-6 max-h-[85dvh] overflow-y-auto overscroll-contain scrollbar-none' : 'px-6 py-4 overflow-hidden max-h-none md:overflow-visible')}>
            <div className="flex flex-wrap items-center justify-start md:justify-between gap-4">
              <div>
                <h1 className={cn(
                  'font-bold tracking-tight bg-linear-to-br from-white to-white/40 bg-clip-text text-transparent transition-all duration-300',
                  isExpanded ? 'text-2xl lg:text-3xl' : 'text-xl',
                )}
                >
                  {car.manufacturer}
                  {' '}
                  {car.name}
                  {' • '}
                  {car.year}
                </h1>

                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                  {car.setups[0].power}
                  &nbsp;
                  {'BHP • '}
                  {car.setups[0].weight}
                  &nbsp;
                  {'kg • '}
                  {car.setups[0].weightBalanceFront}
                  :
                  {car.setups[0].weightBalanceRear}
                </p>
              </div>

              <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                {
                  car.isHybrid
                  && (
                    <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                      HYBRID
                    </Badge>
                  )
                }

                {
                  car.overtake !== 'NONE' && (
                    <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                      {car.overtake.replace('_', ' ')}
                    </Badge>
                  )
                }

                <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                  {car.engineLayout}
                  -ENGINE
                </Badge>

                <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                  {car.aspiration.replace('_', ' + ')}
                </Badge>

                <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                  {car.drivetrain}
                </Badge>

                <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                  {car.class !== 'ROAD' && `${CAR_CLASS[car.class]} / `}
                  {'PP '}
                  {car.setups[0].pp.toFixed(2)}
                </Badge>
              </div>
            </div>

            <div className={cn(
              'grid transition-all duration-300 ease-in-out overflow-hidden',
              isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-white/5' : 'grid-rows-[0fr] opacity-0 mt-0',
            )}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="md:col-span-2 h-full rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-center text-slate-500 text-sm font-mono relative">
                    [ Car image ]
                  </div>

                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-evenly px-4 md:px-3 lg:px-4 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                      <div className="my-1 text-xs text-slate-400 mb-1">Power:</div>

                      <div className="text-base md:text-xs lg:text-base font-bold md:font-medium lg:font-bold text-white">
                        {car.setups[0].power}
                      &nbsp;BHP
                        <span className="mx-1 md:mx-0.5 lg:mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
                        {car.setups[0].powerRpm}
                      &nbsp;RPM
                      </div>
                    </div>

                    <div className="flex flex-col justify-evenly px-4 md:px-3 lg:px-4 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                      <div className="my-1 text-xs text-slate-400 mb-1">Torque:</div>

                      <div className="text-base md:text-xs lg:text-base font-bold md:font-medium lg:font-bold text-white">
                        {car.setups[0].torque}
                      &nbsp;kgfm
                        <span className="mx-1 md:mx-0.5 lg:mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
                        {car.setups[0].torqueRpm}
                      &nbsp;RPM
                      </div>
                    </div>

                    {[{ header: 'Engine type', value: car.engineType },
                      { header: 'Displacement', value: `${car.displacement} cc` },
                      { header: 'WPR', value: car.setups[0].wpr },
                      { header: 'Engine code', value: car.engineCode },
                      { header: 'Gears count', value: car.gearbox },
                      { header: 'Height', value: car.height },
                      { header: 'Width', value: car.width },
                      { header: 'Length', value: car.length },
                    ].map(i => (
                      <div key={i.header} className="flex gap-2 justify-between py-2 px-3 md:px-2 lg:px-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                        <div className="my-auto text-xs text-slate-400">
                          {i.header}
                          :
                        </div>

                        <div className="my-auto text-base md:text-xs lg:text-base font-bold md:font-medium lg:font-bold text-white">
                          {i.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsMobileExpanded(prev => !prev)}
            className="block md:hidden w-full cursor-pointer group select-none"
          >
            <div
              className={cn(
                'w-12 h-1.5 mx-auto rounded-full bg-slate-400/40 transition-transform duration-200 group-hover:bg-slate-400',
                isExpanded ? 'mt-4 scale-x-75 opacity-60' : 'rotate-0',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
