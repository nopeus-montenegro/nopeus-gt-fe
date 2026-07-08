'use client';

import { SetupInclude } from '@/04_entities/setup';
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from '@/05_shared/ui/shadcn/carousel';

import { AerodynamicsCard } from './aerodynamics-card';
import { BodyworkCard } from './bodywork-card';
import { BrakesCard } from './brakes-card';
import { DifferentialCard } from './differential-card';
import { DrivetrainCard } from './drivetrain-card';
import { EcuCard } from './ecu-card';
import { EngineCard } from './engine-card';
import { EngineTuningCard } from './engine-tuning-card';
import { GtAutoCard } from './gt-auto-card';
import { IntakeExhaustCard } from './intake-exhaust-card';
import { NitrousCard } from './nitrous-card';
import { PerformanceCard } from './performance-card';
import { SteeringCard } from './steering-card';
import { SuperchargerCard } from './supercharger-card';
import { SuspensionCard } from './suspension-card';
import { TransmissionCard } from './transmission-card';
import { TyresCard } from './tyres-card';

interface Props {
  setup: SetupInclude;
}

export function SetupCarousel({ setup }: Props) {
  return (
    <Carousel
      opts={{ align: 'start' }}
      className="flex-1 min-h-0 w-full"
    >
      <CarouselContent className="h-full">
        <CarouselItem className="flex h-full pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 h-full w-full overflow-y-auto custom-scrollbar p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <EngineCard setup={setup} />

            <GtAutoCard setup={setup} />
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <TyresCard setup={setup} />

            <SuspensionCard setup={setup} />

            <DifferentialCard setup={setup} />
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100dvh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <AerodynamicsCard setup={setup} />

            <EcuCard setup={setup} />

            <PerformanceCard setup={setup} />

            <TransmissionCard setup={setup} />

            <NitrousCard setup={setup} />
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100dvh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <SuperchargerCard setup={setup} />

            <IntakeExhaustCard setup={setup} />

            <BrakesCard setup={setup} />
          </div>
        </CarouselItem>

        <CarouselItem className="flex pl-4 basis-full md:basis-1/2 xl:basis-1/3">
          <div className="relative flex-1 w-full overflow-y-auto custom-scrollbar max-h-[calc(100dvh-150px)] p-4 rounded-xl bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 dark:bg-slate-900/20">
            <SteeringCard setup={setup} />

            <DrivetrainCard setup={setup} />

            <EngineTuningCard setup={setup} />

            <BodyworkCard setup={setup} />
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="absolute hidden md:flex -top-18 left-4 m-0 border-white/20 bg-black/50 hover:bg-white/10 text-white" />

      <CarouselNext className="absolute hidden md:flex -top-18 right-4 m-0 border-white/20 bg-black/50 hover:bg-white/10 text-white" />
    </Carousel>
  );
}
