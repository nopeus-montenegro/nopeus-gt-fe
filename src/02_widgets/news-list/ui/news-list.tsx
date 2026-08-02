'use client';

import { NewsCard, NewsPostMeta } from '@/04_entities/news';
import { getNewsFeed } from '@/app/actions/news-feed';
import { useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface NewsFeedProps {
  initialNews: NewsPostMeta[];
  initialHasMore: boolean;
}

export function NewsList({ initialNews, initialHasMore }: NewsFeedProps) {
  const [news, setNews] = useState<NewsPostMeta[]>(initialNews);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const { ref } = useInView({
    threshold: 0,
    rootMargin: '400px',
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        loadMore();
      }
    },
  });

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const data = await getNewsFeed(nextPage);

      setNews(prev => [...prev, ...data.news]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error('Failed to load next page:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {news.map(post => (
          <NewsCard key={post.slug} news={post} />
        ))}
      </div>

      <div ref={ref} className="w-full flex justify-center p-8">
        {isLoading && (
          <div className="text-slate-500 animate-pulse text-sm uppercase tracking-widest">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
