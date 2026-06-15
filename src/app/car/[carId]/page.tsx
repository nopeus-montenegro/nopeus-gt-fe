import { CarPage } from '@/01_pages/car';

interface Params {
  params: Promise<{
    carId: string;
  }>;
}

export default async function CarAppPage({ params }: Params) {
  const { carId } = await params;

  return (
    <CarPage carId={carId} />
  );
}
