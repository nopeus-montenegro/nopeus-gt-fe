import { TrackListPage } from '@/01_pages/track-list';
import { getTrackListJsonLd } from '@/04_entities/track';
import { getTrackList } from '@/04_entities/track/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gran Turismo 7 Tracks & Layouts Database',
  description: 'Browse the complete Gran Turismo 7 track list. Filter real-world circuits and original tracks by type, BoP, and weather conditions to find optimal car and setup.',
  keywords: getKeywords([
    'track list',
    'layout database',
    'track specs',
    'track length',
    'real world tracks',
    'fictional tracks',
    'original tracks',
    'track layouts',
    'weather conditions',
    'track with Sophy',
  ]),
  alternates: {
    canonical: '/track',
  },
};

export default async function TrackListAppPage() {
  const tracks = await getTrackList();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getTrackListJsonLd(tracks)) }}
      />

      <TrackListPage />
    </>
  );
}
