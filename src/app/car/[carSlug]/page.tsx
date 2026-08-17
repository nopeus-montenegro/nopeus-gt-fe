import { CarPage } from '@/01_pages/car';
import { getCarJsonLd } from '@/04_entities/car';
import { getCar } from '@/04_entities/car/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
import { deslugify } from '@/05_shared/utils/deslugify';
import { slugify } from '@/05_shared/utils/slugify';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{
    carSlug: string;
  }>;
  searchParams: AsyncPageSearchParams;

}

export async function generateMetadata({ params }: Params) {
  const { carSlug } = await params;
  const carId = deslugify(carSlug);
  const car = await getCar(carId);

  if (!car) {
    notFound();
  }

  const fullName = `${car.manufacturer} ${car.name} ${car.year}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_BLOB_URL}/car/${slugify([car.manufacturer, car.name, car.year.toString()])}.webp`;

  return {
    title: `${fullName} - GT7 Setups, Tunes & Specs`,
    description: `Find optimal Gran Turismo 7 setups and tunes for ${fullName}. Browse track-specific setups, performance specs, and custom tuning configurations.`,
    keywords: getKeywords([
      `${car.name}`,
      `${car.manufacturer} ${car.name}`,
      `${car.name} bop`,
      `${car.name} gt7 setup`,
      `${car.name} tuning`,
      `${fullName} specs`,
      'track setups',
    ]),
    alternates: {
      canonical: `/car/${carSlug}`,
    },
    openGraph: {
      title: fullName,
      description: `Gran Turismo 7 setups and tunes for ${fullName}`,
      url: `/car/${carSlug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 750,
          alt: fullName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullName,
      description: `Gran Turismo 7 setups and tunes for ${fullName}`,
      images: [imageUrl],
    },
  };
}

export default async function CarAppPage({ params, searchParams }: Params) {
  const { carSlug } = await params;
  const carId = deslugify(carSlug);
  const car = await getCar(carId);

  if (!car) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCarJsonLd(car)) }}
      />

      <CarPage carId={carId} searchParams={searchParams} />
    </>
  );
}
