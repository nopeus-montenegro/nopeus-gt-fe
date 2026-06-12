import { CarPage } from '@/01_pages/car';

interface Params {
  params: {
    carId: string;
  };
}

export default function CarAppPage({ params }: Params) {
  return (
    <CarPage carId={params.carId} />
  );
}
