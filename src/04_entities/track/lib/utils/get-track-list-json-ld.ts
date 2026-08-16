import { Track } from '@prisma/client';

export function getTrackListJsonLd(tracks: Track[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://nopeus-gt.app/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Tracks',
            'item': 'https://nopeus-gt.app/track',
          },
        ],
      },

      {
        '@type': 'CollectionPage',
        '@id': 'https://nopeus-gt.app/track#collection',
        'url': 'https://nopeus-gt.app/track',
        'name': 'Gran Turismo 7 Tracks & Telemetry',
        'description': 'Explore Gran Turismo 7 tracks, layout specs and optimal tunes.',
        'publisher': {
          '@type': 'Organization',
          '@id': 'https://nopeus-gt.app/#organization',
          'name': 'Nopeus GT',
        },
        'mainEntity': {
          '@type': 'ItemList',
          'numberOfItems': tracks.length,
          'itemListElement': tracks.map((track, index) => ({
            '@type': 'ListItem',
            '@id': `https://nopeus-gt.app/track/${track.id}#track`,
            'position': index + 1,
            'name': `${track.name} ${track.configName}`,
            'url': `https://nopeus-gt.app/track/${track.id}`,
          })),
        },
      },
    ],
  };
}
