'use server';

import { NewsPostMeta } from '@/04_entities/news';
import { CARDS_PER_PAGE } from '@/05_shared/lib/const';

export async function getNewsFeed(page: number = 1, limit: number = CARDS_PER_PAGE) {
  try {
    const res = await fetch(
      process.env.GITHUB_NL_URL!,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_NL_TOKEN}`,
          Accept: 'application/json',
        },
        next: {
          revalidate: 86400,
          tags: ['news-manifest'],
        },
      },
    );

    if (!res.ok) throw new Error('Failed to fetch manifest');

    const allPosts: NewsPostMeta[] = await res.json();

    const start = (page - 1) * limit;
    const end = start + limit;
    const news = allPosts.slice(start, end);
    const hasMore = end < allPosts.length;

    return {
      news,
      hasMore,
    };
  } catch (error) {
    console.error('Error fetching news feed:', error);
    return { news: [], hasMore: false };
  }
}
