import { Car } from '@prisma/client';

export function getCarListJsonLd(cars: Car[]) {
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
            'name': 'Cars',
            'item': 'https://nopeus-gt.app/car',
          },
        ],
      },

      {
        '@type': 'CollectionPage',
        '@id': 'https://nopeus-gt.app/car#collection',
        'url': 'https://nopeus-gt.app/car',
        'name': 'Gran Turismo 7 Cars & Specs',
        'description': 'Browse the complete list of Gran Turismo 7 cars, technical specs and setups.',
        'publisher': {
          '@type': 'Organization',
          '@id': 'https://nopeus-gt.app/#organization',
          'name': 'Nopeus GT',
        },
        'mainEntity': {
          '@type': 'ItemList',
          'numberOfItems': cars.length,
          'itemListElement': cars.map((car, index) => ({
            '@type': 'ListItem',
            '@id': `https://nopeus-gt.app/car/${car.id}#car`,
            'position': index + 1,
            'name': `${car.manufacturer} ${car.name} ${car.year}`,
            'url': `https://nopeus-gt.app/car/${car.id}`,
          })),
        },
      },
    ],
  };
}
