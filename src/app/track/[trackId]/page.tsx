import { TrackPage } from '@/01_pages/track';

interface Params {
  params: Promise<{
    trackId: string;
  }>;
}

export default async function TrackAppPage({ params }: Params) {
  const { trackId } = await params;

  return (
    <TrackPage trackId={trackId} />
  );
}
