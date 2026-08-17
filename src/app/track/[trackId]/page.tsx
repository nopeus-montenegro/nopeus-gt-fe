import { TrackPage } from '@/01_pages/track';
import { getTrackJsonLd } from '@/04_entities/track';
import { getTrack } from '@/04_entities/track/index.server';
import { getKeywords } from '@/05_shared/config/seo';
import { slugify } from '@/05_shared/utils/slugify';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{
    trackId: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { trackId } = await params;
  const track = await getTrack(trackId);

  if (!track) {
    notFound();
  };

  const fullName = `${track.name}${track.configName ? ` ${track.configName}` : ''}`;
  const slugParts = [track.name, track.configName].filter(Boolean);
  const imageUrl = `${process.env.NEXT_PUBLIC_BLOB_URL}/track/${slugify(slugParts)}.webp`;

  return {
    title: `${fullName} - GT7 Cars & Setups`,
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
    openGraph: {
      title: fullName,
      description: `Gran Turismo 7 car setups and tunes for ${fullName}`,
      url: `/track/${trackId}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 750,
          alt: fullName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullName,
      description: `Gran Turismo 7 car setups and tunes for ${fullName}`,
      images: [imageUrl],
    },
  };
}

export default async function TrackAppPage({ params }: Params) {
  const { trackId } = await params;
  const track = await getTrack(trackId);

  if (!track) {
    notFound();
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getTrackJsonLd(track)) }}
      />

      <TrackPage trackId={trackId} />
    </>
  );
}
