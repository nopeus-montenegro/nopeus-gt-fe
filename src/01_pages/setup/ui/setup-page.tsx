import { notFound } from 'next/navigation';

import { SetupCarousel } from '@/02_widgets/setup-carousel';
import { SetupInclude } from '@/04_entities/setup';
import { getSetup } from '@/04_entities/setup/index.server';
import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { Badge } from '@/05_shared/ui/shadcn/badge';

interface Props {
  setupId: string;
};

export async function SetupPage({ setupId }: Props) {
  const setup = await getSetup(setupId) as SetupInclude;

  if (!setup) {
    notFound();
  }

  return (
    <div className="flex flex-col h-dvh w-full">
      <div className="flex items-center justify-between py-4 md:py-8 px-0.5 md:px-20">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          <p>
            {setup.title}
          </p>

          <p className="text-sm text-zinc-400">
            {setup.car.manufacturer}
            {' '}
            {setup.car.name}
            {' '}
            {setup.car.year}
          </p>
        </h1>

        <div className="flex flex-row-reverse flex-wrap gap-2 items-stretch">
          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {setup.car.class !== 'ROAD' && `${CAR_CLASS[setup.car.class]} / `}
            {'PP '}
            {setup.pp.toFixed(2)}
          </Badge>

          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {setup.car.engineLayout}
            -ENGINE
          </Badge>

          {
            setup.car.isHybrid
            && (
              <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
                HYBRID
              </Badge>
            )
          }

          {
            setup.car.overtake !== 'NONE' && (
              <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
                {setup.car.overtake.replace('_', ' ')}
              </Badge>
            )
          }

          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {setup.car.aspiration.replace('_', ' + ')}
          </Badge>

          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {setup.car.drivetrain}
          </Badge>
        </div>
      </div>

      <div className="container px-4 pb-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [setupId]: setup.title }} />
      </div>

      <SetupCarousel setup={setup} />
    </div>
  );
}
