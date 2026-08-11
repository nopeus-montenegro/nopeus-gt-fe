import { SetupInclude } from '../types';

export function getSetupJsonLd(
  setup: SetupInclude,
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://nopeus-gt.app' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Car', 'item': 'https://nopeus-gt.app/car' },
          { '@type': 'ListItem', 'position': 3, 'name': `${setup.car.manufacturer} ${setup.car.name} ${setup.car.year}`, 'item': `https://nopeus-gt.app/car/${setup.car.id}` },
          { '@type': 'ListItem', 'position': 4, 'name': setup.title, 'item': `https://nopeus-gt.app/setup/${setup.id}` },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `https://nopeus-gt.app/setup/${setup.id}#setup`,
        'name': `Gran Turismo 7 setup for ${setup.car.manufacturer} ${setup.car.name} ${setup.car.year}`,
        'description': `${setup.title} by ${setup.author}`,
        'author': {
          '@type': 'Person',
          '@id': 'https://nopeus-gt.app/#author',
          'name': 'Iurii P.',
        },
        'about': [
          { '@type': 'Car', '@id': `https://nopeus-gt.app/car/${setup.car.id}#car`, 'name': `${setup.car.manufacturer} ${setup.car.name} ${setup.car.year}` },
        ],
      },
    ],
  };
}
