import { MainPage } from '@/01_pages/main';
import { getKeywords } from '@/05_shared/config/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gran Turismo 7 Setups, Car Tunes & Telemetry Hub',
  description: 'Explore Gran Turismo 7 car details, track data, setups and telemetry. Share optimal tunes and race strategies. Get the latest community GT7 events & news.',
  keywords: getKeywords([
    // Data & Specs
    'car details',
    'track data',
    'telemetry',

    // Strategy & Community
    'daily races',
    'weekly challenges',
    'race strategies',
    'community events',
    'game news',
  ]),
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://nopeus-gt.app/#website',
        'url': 'https://nopeus-gt.app/',
        'name': 'Nopeus GT',
        'alternateName': ['NopeusGT'],
        'description': 'Explore Gran Turismo 7 car details, track data, setups and telemetry.',
        'inLanguage': 'en',
        'about': [
          {
            '@type': 'VideoGame',
            'name': 'Gran Turismo 7',
            'sameAs': 'https://www.wikidata.org/wiki/Q18345763',
          },
        ],
        'hasPart': [
          {
            '@id': 'https://nopeus-gt.app/#nav-cars',
          },
          {
            '@id': 'https://nopeus-gt.app/#nav-tracks',
          },
        ],
        'publisher': {
          '@id': 'https://nopeus-gt.app/#organization',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://nopeus-gt.app/#webapp',
        'url': 'https://nopeus-gt.app/',
        'name': 'Nopeus GT',
        'applicationCategory': 'SportsApplication',
        'genre': ['Simracing', 'Motorsport', 'Gran Turismo'],
        'keywords': 'Gran Turismo 7, GT7 setups, car list, car specs, GTWS news, Daily Races, Weekly Challenges, Online Time Trial, track data, track list, WEC, IMSA, Super GT, DTM, BTCC, GTWC, IGTC, GTWCE, GTWCA',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'softwareVersion': '0.2.2',
        'inLanguage': 'en',
        'about': [
          {
            '@type': 'VideoGame',
            'name': 'Gran Turismo 7',
            'sameAs': 'https://www.wikidata.org/wiki/Q18345763',
          },
        ],

        'isAccessibleForFree': true,
        'description': 'Gran Turismo 7 companion app: setup database, track data, car specs, game event news.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'featureList': [
          'Gran Turismo 7 setup database',
          'Detailed car specs and performance metrics',
          'Track database and layouts',
          'Game events coverage (Weekly Challenges, Daily Races, Online Time Trial, GTWS)',
          'Real-world motorsport newsfeed and championship updates',
        ],
        'provider': {
          '@id': 'https://nopeus-gt.app/#organization',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://nopeus-gt.app/#organization',
        'name': 'Nopeus GT',
        'url': 'https://www.linkedin.com/company/nopeus',
        'sameAs': [
          'https://www.linkedin.com/company/nopeus',
          'https://github.com/nopeus-montenegro',
          'https://x.com/NopeusGT',
        ],
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://nopeus-gt.app/opengraph-image.png',
        },
        'founder': {
          '@type': 'Person',
          '@id': 'https://nopeus-gt.app/#author',
          'name': 'Iurii P.',
          'url': 'https://www.linkedin.com/in/iurii-pototskii',
          'sameAs': [
            'https://www.linkedin.com/in/iurii-pototskii',
            'https://github.com/KAHUKYJlbl',
            'https://x.com/KAHUKYJlbl_me',
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://nopeus-gt.app/#navigation',
        'name': 'Main Navigation',
        'itemListElement': [
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://nopeus-gt.app/#nav-cars',
            'position': 1,
            'name': 'Cars & Specs',
            'url': 'https://nopeus-gt.app/car',
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://nopeus-gt.app/#nav-tracks',
            'position': 2,
            'name': 'Tracks & Specs',
            'url': 'https://nopeus-gt.app/track',
          },
        ],
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://nopeus-gt.app/#nav-cars',
        'name': 'Cars & Specs',
        'url': 'https://nopeus-gt.app/car',
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://nopeus-gt.app/#nav-tracks',
        'name': 'Tracks & Specs',
        'url': 'https://nopeus-gt.app/track',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <MainPage />
    </>
  );
}
