import { TrackPage } from '@/01_pages/track';
import { getTrack } from '@/04_entities/track/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { AsyncPageSearchParams } from '@/05_shared/lib/types';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{
    trackId: string;
  }>;
  searchParams: AsyncPageSearchParams;
}

export async function generateMetadata({ params }: Params) {
  const { trackId } = await params;
  const track = await getTrack(trackId);

  if (!track) {
    notFound();
  };

  const fullName = `${track.name}${track.configName ? ` ${track.configName}` : ''}`;

  return {
    title: `${fullName} — GT7 Cars & Setups`,
    description: `Find optimal Gran Turismo 7 car setup for ${fullName}. Browse track-specific tunes, layout specs, and telemetry data for all car classes.`,
    keywords: getKeywords([
      fullName,
      `${fullName} gt7 setup`,
      `${fullName} gt7 best car`,
      `${fullName} tunes`,
      `${fullName} layouts`,
      'track setups',
      'car setups by track',
    ]),
    alternates: {
      canonical: `/track/${trackId}`,
    },
  };
}

export default async function TrackAppPage({ params, searchParams }: Params) {
  const { trackId } = await params;

  return (
    <TrackPage trackId={trackId} searchParams={searchParams} />
  );
}
