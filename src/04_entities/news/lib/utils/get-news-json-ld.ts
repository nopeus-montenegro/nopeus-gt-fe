import { NewsPost } from '../types';

export function getNewsJsonLd(news: NewsPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': news.title,
    'description': news.description,
    'image': [`${process.env.NEXT_PUBLIC_BLOB_URL}${news.cover}`],
    'datePublished': new Date(news.date).toISOString(),
    'author': {
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
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://nopeus-gt.app/#organization',
      'name': 'Nopeus GT',
    },
  };
}
