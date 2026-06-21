'use client';

import { useStickyHeader } from '@/05_shared/hooks/use-sticky-header';
import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { CarInclude } from '../lib/types';

interface Props {
  car: CarInclude;
}

export function CarStickyHeader({ car }: Props) {
  const isScrolled = useStickyHeader(224);

  return (
    <div className={cn(
      'fixed top-8 right-0 z-20 flex justify-center w-full transition-colors duration-300',
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
              <div>
                <h1 className={cn(
                  'font-bold tracking-tight bg-linear-to-br from-white to-white/40 bg-clip-text text-transparent transition-all duration-300',
                  isScrolled ? 'text-xl' : 'text-2xl md:text-3xl',
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
            </div>

            <div className="flex items-center gap-2">
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

              <Badge variant="outline" className="grow h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                {car.engineLayout}
                -ENGINE
              </Badge>

              <Badge variant="outline" className="grow h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                {car.aspiration.replace('_', ' + ')}
              </Badge>

              <Badge variant="outline" className="grow h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                {car.drivetrain}
              </Badge>

              <Badge variant="outline" className="grow h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                {car.class !== 'ROAD' && `${CAR_CLASS[car.class]} / `}
                {'PP '}
                {car.setups[0].pp.toFixed(2)}
              </Badge>
            </div>
          </div>

          <div className={cn(
            'grid transition-all duration-300 ease-in-out overflow-hidden',
            isScrolled ? 'grid-rows-[0fr] opacity-0 mt-0' : 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-white/5',
          )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="md:col-span-2 h-full rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-center text-slate-500 text-sm font-mono relative">
                  [ Car image ]
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="px-4 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Power:</div>

                    <div className="text-base font-bold text-white">
                      {car.setups[0].power}
                      &nbsp;BHP
                      <span className="mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
                      {car.setups[0].powerRpm}
                      &nbsp;RPM
                    </div>
                  </div>

                  <div className="px-4 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Torque:</div>

                    <div className="text-base font-bold text-white">
                      {car.setups[0].torque}
                      &nbsp;kgfm
                      <span className="mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
                      {car.setups[0].torqueRpm}
                      &nbsp;RPM
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between py-2 px-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Engine type:</div>

                    <div className="text-base font-bold text-white">
                      {car.engineType}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between py-2 px-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Displacement:</div>

                    <div className="text-base font-bold text-white">
                      {car.displacement}
                      &nbsp;cc
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between py-2 px-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">WPR:</div>

                    <div className="text-base font-bold text-white">
                      {(car.setups[0].weight / car.setups[0].power).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between py-2 px-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400">Engine code:</div>

                    <div className="text-base font-bold text-white">
                      {car.engineCode}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between px-3 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Gears count:</div>

                    <div className="text-base font-bold text-white">
                      {car.gearbox}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between px-3 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Length:</div>

                    <div className="text-base font-bold text-white">
                      {car.length}
                      &nbsp;mm
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between px-3 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Width:</div>

                    <div className="text-base font-bold text-white">
                      {car.width}
                      &nbsp;mm
                    </div>
                  </div>

                  <div className="flex gap-2 justify-between px-6 py-2 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                    <div className="my-1 text-xs text-slate-400 mb-1">Height:</div>

                    <div className="text-base font-bold text-white">
                      {car.height}
                      &nbsp;mm
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
