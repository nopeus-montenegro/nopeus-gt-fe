import { TrackPage } from '@/01_pages/track';
import { getTrack } from '@/04_entities/track';

interface Params {
  params: Promise<{
    trackId: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { trackId } = await params;
  const track = await getTrack(trackId);

  return {
    title: `${track?.name}${track?.configName ? ` ${track?.configName}` : ''} details`,
    description: `Tune your favorite Gran Turismo 7 car the fastest on ${track?.name}${track?.configName ? ` ${track?.configName}` : ''}`,
  };
}

export default async function TrackAppPage({ params }: Params) {
  const { trackId } = await params;

  return (
    <TrackPage trackId={trackId} />
  );
}
