import { SetupPage } from '@/01_pages/setup';
import { getSetup } from '@/04_entities/setup/index.server';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{
    setupId: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { setupId } = await params;
  const setup = await getSetup(setupId);

  if (!setup) {
    notFound();
  };

  return {
    title: setup?.title,
    description: `Tune your Gran Turismo 7 ${setup?.car.manufacturer} ${setup?.car.name} ${setup?.car.year}`,
    alternates: {
      canonical: `/setup/${setupId}`,
    },
  };
}

export default async function SetupAppPage({ params }: Params) {
  const { setupId } = await params;

  return (
    <SetupPage setupId={setupId} />
  );
}
