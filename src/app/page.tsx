import { MainPage } from '@/01_pages/main';
import { getKeywords } from '@/05_shared/config/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gran Turismo 7 Setups, Car Tunes & Telemetry Hub',
  description: 'Explore Gran Turismo 7 car details, track data, setups and telemetry. Share optimal tunes and race strategies. Get the latest community GT7 events & news.',
  keywords: getKeywords([
    // Data & Specs
    'car details',
    'track data',
    'telemetry',

    // Strategy & Community
    'daily races',
    'weekly challenges',
    'race strategies',
    'community events',
    'game news',
  ]),
  alternates: {
    canonical: './',
  },
};

export default function Home() {
  return (
    <MainPage />
  );
}
