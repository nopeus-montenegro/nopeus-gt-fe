'use client';

import { SetupInclude } from '@/04_entities/setup';
import { AIR_CLEANER, ANTI_LAG, AWS, BRAKE_BALANCE, BRAKE_PADS, BRAKE_SYSTEM, CLUTCH, CUSTOM_PART, CUSTOM_WING, DIFFERENTIAL, ECU, EXHAUST_MANIFOLD, HANDBRAKE, INTERCOOLER, NITROUS, PROPELLER_SHAFT, SILENCER, STEERING, SUPERCHARGER, SUSPENSION, TORQUE_VECTORING, TRANSMISSION, TURBO, TYRES } from '@/05_shared/lib/dictionaries';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/05_shared/ui/shadcn/carousel';

interface Props {
  setup: SetupInclude;
}

export function SetupCarousel({ setup }: Props) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full flex-1"
    >
      <CarouselContent>
        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100vh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <div className="flex flex-col gap-3">
              <h2 className="px-1 text-lg text-slate-300">Engine</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Engine code:</div>

                <div className="text-base text-white">
                  {setup.swappedEngineModel || setup.car.engineCode}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Power:</div>

                <div className="text-base text-white">
                  {setup.power}
                    &nbsp;BHP
                  <span className="mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
                  {setup.powerRpm}
                    &nbsp;RPM
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Torque:</div>

                <div className="text-base text-white">
                  {setup.torque}
                    &nbsp;kgfm
                  <span className="mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
                  {setup.torqueRpm}
                    &nbsp;RPM
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">WPR:</div>

                <div className="text-base text-white">
                  {(setup.weight / setup.power).toFixed(2)}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Weight:</div>

                <div className="text-base text-white">
                  {setup.weight}
                  {' kg'}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Weight balance:</div>

                <div className="text-base text-white">
                  {setup.weightBalanceFront}
                  {' : '}
                  {setup.weightBalanceRear}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">GT Auto</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Wide body:</div>

                <div className="text-base text-white">
                  {setup.hasWideBody ? 'Installed' : 'None'}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Custom parts front:</div>

                <div className="text-base text-white">
                  {CUSTOM_PART[setup.gtAutoFront]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Custom parts side:</div>

                <div className="text-base text-white">
                  {CUSTOM_PART[setup.gtAutoSide]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Custom parts rear:</div>

                <div className="text-base text-white">
                  {CUSTOM_PART[setup.gtAutoRear]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Custom parts wing:</div>

                <div className="text-base text-white">
                  {CUSTOM_WING[setup.gtAutoWing]}
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100vh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <div className="flex flex-col gap-3">
              <h2 className="px-1 text-lg text-slate-300">Tyres</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Front:</div>

                <div className="text-base text-white">
                  {TYRES[setup.tyresFront]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Rear:</div>

                <div className="text-base text-white">
                  {TYRES[setup.tyresRear]}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Suspension</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Suspension:</div>

                <div className="text-base text-white">
                  {SUSPENSION[setup.suspensionType]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Body Height Adjustment:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.susBodyHeightFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.susBodyHeightRear}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Anti-Roll Bar:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.susAntiRollBarFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.susAntiRollBarRear}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Damping Ratio (Compression):</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.susDampingCompFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.susDampingCompRear}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Damping Ratio (Expansion):</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.susDampingExpFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.susDampingExpRear}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Natural Frequency:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {(setup.susNaturalFreqFront).toFixed(2)}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {(setup.susNaturalFreqRear).toFixed(2)}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Negative Camber Angle:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {(setup.susCamberFront).toFixed(1)}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {(setup.susCamberRear).toFixed(1)}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Toe Angle:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {(setup.susToeFront).toFixed(2)}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {(setup.susToeRear).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Differential Gear</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Differential:</div>

                <div className="text-base text-white">
                  {DIFFERENTIAL[setup.diffType]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Initial Torque:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.diffInitTorqueFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.diffInitTorqueRear}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Acceleration Sensivity:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.diffAccelSensFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.diffAccelSensRear}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Braking Sensivity:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.diffBrakeSensFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.diffBrakeSensRear}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Torque-Vectoring Centre Differential:</div>

                <div className="text-base text-white">
                  {TORQUE_VECTORING[setup.diffTorqueVectoring]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Front / Rear Torque Distribution:</div>

                <div className="text-base text-white">
                  {setup.diffTorqueFront === 0 && setup.diffTorqueRear === 0
                    ? '- : -'
                    : `${setup.diffTorqueFront} : ${setup.diffTorqueRear}`}
                </div>
              </div>

              <p>
              </p>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100vh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <div className="flex flex-col gap-3">
              <h2 className="px-1 text-lg text-slate-300">Aerodynamics</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Downforce:</div>

                <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
                  <span className="mt-1 text-xs text-slate-400">front</span>
                  {setup.aeroDownforceFront}
                  <span className="mt-1 text-xs text-slate-400">rear</span>
                  {setup.aeroDownforceRear}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">ECU</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">ECU:</div>

                <div className="text-base text-white">
                  {ECU[setup.ecuType]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Output Adjustment:</div>

                <div className="text-base text-white">
                  {setup.ecuOutput}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Performance Adjustment</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Ballast:</div>

                <div className="text-base text-white">
                  {setup.ballastWeight}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Ballast Positioning:</div>

                <div className="text-base text-white">
                  {setup.ballastPosition}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Power Restrictor:</div>

                <div className="text-base text-white">
                  {setup.powerRestrictor}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Transmission</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Transmission:</div>

                <div className="text-base text-white">
                  {TRANSMISSION[setup.transmissionType]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Top Speed (Automatically Adjusted):</div>

                <div className="text-base text-white">
                  {setup.transTopSpeedAuto}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Nitrous / Overtake</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Nitrous / Overtake:</div>

                <div className="text-base text-white">
                  {NITROUS[setup.nitro]}
                </div>
              </div>

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Output Adjustment:</div>

                <div className="text-base text-white">
                  {setup.nitroOutput}
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100vh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <div className="flex flex-col gap-3">
              <h2 className="px-1 text-lg text-slate-300">Spercharger</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Turbocharger:</div>

                <div className="text-base text-white">
                  {TURBO[setup.turboType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Anti-Lag System:</div>

                <div className="text-base text-white">
                  {ANTI_LAG[setup.antiLagType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Intercooler:</div>

                <div className="text-base text-white">
                  {INTERCOOLER[setup.intercoolerType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Spercharger:</div>

                <div className="text-base text-white">
                  {SUPERCHARGER[setup.superchargerType]}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Transmission</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Air Cleaner:</div>

                <div className="text-base text-white">
                  {AIR_CLEANER[setup.airCleanerType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Silencer:</div>

                <div className="text-base text-white">
                  {SILENCER[setup.silencerType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Exhaust Manifold:</div>

                <div className="text-base text-white">
                  {EXHAUST_MANIFOLD[setup.exhaustManifoldType]}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Brakes</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Brake System:</div>

                <div className="text-base text-white">
                  {BRAKE_SYSTEM[setup.brakeSystemType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Brake Pads:</div>

                <div className="text-base text-white">
                  {BRAKE_PADS[setup.brakePadsType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Handbrake:</div>

                <div className="text-base text-white">
                  {HANDBRAKE[setup.handbrakeType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Handbrake Torque:</div>

                <div className="text-base text-white">
                  {setup.handbrakeTorque}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Brake Balance:</div>

                <div className="text-base text-white">
                  {BRAKE_BALANCE[setup.brakeBalanceType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Front / Rear Balance:</div>

                <div className="text-base text-white">
                  {setup.brakeBalance}
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100vh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <div className="flex flex-col gap-3">
              <h2 className="px-1 text-lg text-slate-300">Steering</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Steering Angle Kit:</div>

                <div className="text-base text-white">
                  {STEERING[setup.steeringAngleKit]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">4WS System:</div>

                <div className="text-base text-white">
                  {AWS[setup.fourWheelSteeringType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Rear Steering Angle:</div>

                <div className="text-base text-white">
                  {setup.rearSteeringAngle}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Drivetrain</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Clutch & Flywheel:</div>

                <div className="text-base text-white">
                  {CLUTCH[setup.clutchFlywheelType]}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Propeller Shaft:</div>

                <div className="text-base text-white">
                  {PROPELLER_SHAFT[setup.propellerShaftType]}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Engine Tuning</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Bore Up:</div>

                <div className="text-base text-white">
                  {setup.engineBoreUp ? 'Installed' : 'None'}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Stroke Up:</div>

                <div className="text-base text-white">
                  {setup.engineStrokeUp ? 'Installed' : 'None'}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Engine Balance Tuning:</div>

                <div className="text-base text-white">
                  {setup.engineBalanceTuning ? 'Installed' : 'None'}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Polish Ports:</div>

                <div className="text-base text-white">
                  {setup.enginePolishPorts ? 'Installed' : 'None'}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">High Lift Camshaft:</div>

                <div className="text-base text-white">
                  {setup.engineHighLiftCamshaft ? 'Installed' : 'None'}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Titanium Connecting Rods & Pistons:</div>

                <div className="text-base text-white">
                  {setup.engineTitaniumRods ? 'Installed' : 'None'}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Racing Crank Shaft:</div>

                <div className="text-base text-white">
                  {setup.engineRacingCrank ? 'Installed' : 'None'}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">High Compression Pistons:</div>

                <div className="text-base text-white">
                  {setup.engineHighCompPistons ? 'Installed' : 'None'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h2 className="px-1 text-lg text-slate-300">Bodywork</h2>
              <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Weight Refuction Stage:</div>

                <div className="text-base text-white">
                  {setup.weightReductionStage}
                </div>
              </div>
              <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
                <div className="my-1 text-xs text-slate-400 mb-1">Increase Body Rigidity:</div>

                <div className="text-base text-white">
                  {setup.isBodyRigidity ? 'Installed' : 'None'}
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="absolute xl:flex -top-18 left-4 m-0 border-white/20 bg-black/50 hover:bg-white/10 text-white" />

      <CarouselNext className="absolute xl:flex -top-18 right-4 m-0 border-white/20 bg-black/50 hover:bg-white/10 text-white" />
    </Carousel>
  );
}
