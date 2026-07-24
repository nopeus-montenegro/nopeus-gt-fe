import { TrackPage } from '@/01_pages/track';
import { getTrack } from '@/04_entities/track/index.server';
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

  return {
    title: `${track?.name}${track?.configName ? ` ${track?.configName}` : ''} details`,
    description: `Tune your favorite Gran Turismo 7 car the fastest on ${track?.name}${track?.configName ? ` ${track?.configName}` : ''}`,
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
