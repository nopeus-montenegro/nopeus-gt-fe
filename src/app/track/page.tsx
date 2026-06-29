import { TrackListPage } from '@/01_pages/track-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track List',
  description: 'Browse the complete list of Gran Turismo 7 tracks. Filter by type, BoP, and weather to find a perfect location for your ride.',
};

export default function TrackListAppPage() {
  return <TrackListPage />;
}
