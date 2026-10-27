import { notFound } from 'next/navigation';

import { SetupCarousel } from '@/02_widgets/setup-carousel';
import { SetupInclude } from '@/04_entities/setup';
import { getSetup } from '@/04_entities/setup/index.server';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { slugify } from '@/05_shared/utils/slugify';

import { SetupPageHeader } from './setup-page-header';

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
      <SetupPageHeader setup={setup} />

      <div className="container px-4 pb-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [slugify([setup.car.manufacturer, setup.car.name, setup.car.year.toString(), 'setup', setupId])]: setup.title }} />
      </div>

      <SetupCarousel setup={setup} />
    </div>
  );
}
