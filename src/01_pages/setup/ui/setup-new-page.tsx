import { notFound } from 'next/navigation';

import { SetupNewCarousel } from '@/02_widgets/setup-new-carousel';
import { SetupInclude } from '@/04_entities/setup';
import { getSetup } from '@/04_entities/setup/index.server';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { slugify } from '@/05_shared/utils/slugify';

export async function SetupNewPage() {
  const setupId = 'cmr1zfims02qbd2bynwcsvrov';
  const setup = await getSetup(setupId) as SetupInclude;

  if (!setup) {
    notFound();
  }

  return (
    <div className="flex flex-col h-dvh w-full">
      <h1 className="py-4 md:py-8 px-0.5 md:px-20 mb-2.5 text-xl md:text-2xl font-bold text-white">
        Create New Setup
      </h1>

      <div className="container px-4 pb-4 max-w-5xl">
        <Breadcrumbs dynamicNames={{ [slugify([setup.car.manufacturer, setup.car.name, setup.car.year.toString(), 'setup', setupId])]: setup.title }} />
      </div>

      <SetupNewCarousel setup={setup} />
    </div>
  );
}
