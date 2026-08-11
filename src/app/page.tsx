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
        'url': 'https://nopeus-gt.app',
        'name': 'Nopeus GT',
        'description': 'Explore Gran Turismo 7 car details, track data, setups and telemetry.',
        'publisher': {
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
            'position': 1,
            'name': 'Cars & Specs',
            'url': 'https://nopeus-gt.app/car',
          },
          {
            '@type': 'SiteNavigationElement',
            'position': 2,
            'name': 'Tracks & Specs',
            'url': 'https://nopeus-gt.app/track',
          },
        ],
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
