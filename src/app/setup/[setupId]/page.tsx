import { SetupPage } from '@/01_pages/setup';
import { getSetupJsonLd } from '@/04_entities/setup';
import { getSetup } from '@/04_entities/setup/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { slugify } from '@/05_shared/utils/slugify';
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

  const imageUrl = `${process.env.NEXT_PUBLIC_BLOB_URL}/car/${slugify([setup.car.manufacturer, setup.car.name, setup.car.year.toString()])}.webp`;

  const ogTitle = `${carFullName} GT7 ${ppPart} Setup`;
  const ogDescription = `Optimal Gran Turismo 7 ${ppPart} tune for ${carFullName}`;
  const title = `${ogTitle} ${authorPart} #${shortCode}`;

  return {
    title,
    description: `${ogDescription} ${authorPart}. View full suspension and transmission telemetry on Nopeus GT (Setup ID: ${shortCode}).`,
    keywords: getKeywords([
      `${setup.car.name} setup`,
      `${setup.car.name} tune`,
    ]),
    alternates: {
      canonical: `/setup/${setupId}`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `/setup/${setupId}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 750,
          alt: carFullName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [imageUrl],
    },
  };
}

export default async function SetupAppPage({ params }: Params) {
  const { setupId } = await params;
  const setup = await getSetup(setupId);

  if (!setup) {
    notFound();
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSetupJsonLd(setup)) }}
      />

      <SetupPage setupId={setupId} />
    </>
  );
}
