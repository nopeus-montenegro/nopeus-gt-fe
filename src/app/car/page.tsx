import { CarListPage } from '@/01_pages/car-list';
import { getCarListJsonLd } from '@/04_entities/car';
import { getCarList } from '@/04_entities/car/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gran Turismo 7 Cars & Specs Database',
  description: 'Browse the complete Gran Turismo 7 car list. Filter GT7 cars by Performance Points (PP), drivetrain, and category to find specs and optimal setups.',
  keywords: getKeywords([
    // Core & Search intent
    'car list',
    'car database',
    'car specs',

    // Specific GT7 filters (LSI)
    'pp',
    'bop',
    'gr.1 cars',
    'gr.2 cars',
    'gr.3 cars',
    'gr.4 cars',
    'gr.b cars',
  ]),
  alternates: {
    canonical: '/car',
  },
};

export default async function CarListAppPage() {
  const cars = await getCarList();

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(getCarListJsonLd(cars)) }}
  />;

  return (
    <CarListPage />
  );
}
