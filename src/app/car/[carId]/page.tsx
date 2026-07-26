import { CarPage } from '@/01_pages/car';
import { getCar } from '@/04_entities/car/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
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
  };

  const fullName = `${car.manufacturer} ${car.name} ${car.year}`;

  return {
    title: `${fullName} — GT7 Setups, Tunes & Specs`,
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
  };
}

export default async function CarAppPage({ params, searchParams }: Params) {
  const { carId } = await params;

  return (
    <CarPage carId={carId} searchParams={searchParams} />
  );
}
