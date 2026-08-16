import { slugify } from '@/05_shared/utils/slugify';
import { Track } from '@prisma/client';

export function getTrackJsonLd(track: Track) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Garage',
            'item': 'https://nopeus-gt.app/',
          },
          {
            '@type': 'ListItem',
            'position': 2, 'name':
            'Track',
            'item': 'https://nopeus-gt.app/track',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': track.name,
            'item': `https://nopeus-gt.app/track/${track.id}`,
          },
        ],
      },
      {
        '@type': 'SportsActivityLocation',
        '@id': `https://nopeus-gt.app/track/${track.id}#track`,
        'name': `${track.name} ${track.configName}`,
        'description': `Gran Turismo 7 track ${track.name} ${track.configName}`,
        'image': `${process.env.NEXT_PUBLIC_BLOB_URL}/tracks/${slugify([track.name, track.configName])}.webp`,
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': track.country,
        },
        'additionalProperty': [
          {
            '@type': 'PropertyValue',
            'name': 'Length',
            'value': track.length,
            'unitCode': 'MTR',
            'unitText': 'm',
          },
          {
            '@type': 'PropertyValue',
            'name': 'Longest Straight',
            'value': track.longestStraight,
            'unitCode': 'MTR',
            'unitText': 'm',
          },
          {
            '@type': 'PropertyValue',
            'name': 'Corners',
            'value': track.cornerCount,
          },
          {
            '@type': 'PropertyValue',
            'name': 'Elevation Difference',
            'value': track.elevationDiff,
            'unitCode': 'MTR',
            'unitText': 'm',
          },
        ],
      },
    ],
  };
}
