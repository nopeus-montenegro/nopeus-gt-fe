'use server';

import { NewsPost, NewsPostMeta } from '@/04_entities/news';
import { CARDS_PER_PAGE } from '@/05_shared/lib/const';
import matter from 'gray-matter';

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

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  try {
    const res = await fetch(
      `${process.env.GITHUB_NL_CONTENT_URL}${slug}.md`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_NL_TOKEN}`,
        },
        next: {
          revalidate: 86400,
          tags: [`news-post-${slug}`],
        },
      },
    );

    if (!res.ok) return null;

    const rawMd = await res.text();
    const { data, content } = matter(rawMd);

    return {
      title: data.title || 'Untitled',
      date: data.date || '',
      cover: data.cover || '',
      description: data.description || '',
      slug: data.slug || '',
      content,
    };
  } catch (error) {
    console.error(`Failed to fetch post: ${slug}`, error);
    return null;
  }
}
