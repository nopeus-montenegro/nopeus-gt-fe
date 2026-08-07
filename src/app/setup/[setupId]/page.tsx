import { SetupPage } from '@/01_pages/setup';
import { getSetup } from '@/04_entities/setup/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

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

  const carFullName = `${setup.car.manufacturer} ${setup.car.name} ${setup.car.year}`;
  const ppPart = setup.pp ? `${Math.ceil(setup.pp)}PP` : '';
  const authorPart = setup.author?.username ? `by ${setup.author.username}` : '';
  const shortCode = setupId.slice(-5).toUpperCase();

  const title = `${carFullName} GT7 ${ppPart} Setup ${authorPart} #${shortCode}`;

  return {
    title: title,
    description: `Optimal Gran Turismo 7 ${ppPart} tune for ${carFullName} ${authorPart}. View full suspension and transmission telemetry on Nopeus GT (Setup ID: ${shortCode}).`,
    keywords: getKeywords([
      `${setup.car.name} setup`,
      `${setup.car.name} tune`,
    ]),
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
