import { CarPage } from '@/01_pages/car';
import { getCarJsonLd } from '@/04_entities/car';
import { getCar } from '@/04_entities/car/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
import { slugify } from '@/05_shared/utils/slugify';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{
    carId: string;
  }>;
  searchParams: AsyncPageSearchParams;

}

export async function generateMetadata({ params }: Params) {
  const { carId } = await params;
  const car = await getCar(carId);

  if (!car) {
    notFound();
  }

  const fullName = `${car.manufacturer} ${car.name} ${car.year}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_BLOB_URL}/cars/${slugify([car.manufacturer, car.name, car.year.toString()])}.webp`;

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
      canonical: `/car/${carId}`,
    },
    openGraph: {
      title: fullName,
      description: `Gran Turismo 7 setups and tunes for ${fullName}`,
      url: `/car/${carId}`,
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
  const { carId } = await params;
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
