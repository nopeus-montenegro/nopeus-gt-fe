import { TrackPage } from '@/01_pages/track';

interface Params {
  params: {
    trackId: string;
  };
}

export default function TrackAppPage({ params }: Params) {
  return (
    <TrackPage trackId={params.trackId} />
  );
}
