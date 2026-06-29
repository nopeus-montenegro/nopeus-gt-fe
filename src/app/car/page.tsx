import { CarListPage } from '@/01_pages/car-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car List',
  description: 'Browse the complete list of Gran Turismo 7 cars. Filter by category, PP, and drivetrain to find your perfect ride.',
};

export default function CarListAppPage() {
  return (
    <CarListPage />
  );
}
