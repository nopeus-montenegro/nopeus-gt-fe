import { CarPage } from '@/01_pages/car';
import { getCar } from '@/04_entities/car/index.server';

interface Params {
  params: Promise<{
    carId: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { carId } = await params;
  const car = await getCar(carId);

  return {
    title: `${car?.manufacturer} ${car?.name} ${car?.year} specification`,
    description: `Get the perfect Gran Turismo 7 setup for ${car?.manufacturer} ${car?.name} ${car?.year}.`,
  };
}

export default async function CarAppPage({ params }: Params) {
  const { carId } = await params;

  return (
    <CarPage carId={carId} />
  );
}
