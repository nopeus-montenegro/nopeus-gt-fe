import { NewsPage } from '@/01_pages/news';
import { getNewsFeed, getNewsPost } from '@/app/actions/news-feed';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const manifest = await getNewsFeed();
  return manifest.news.map(news => ({
    slug: news.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsPost(slug);

  if (!news) {
    notFound();
  };

  return {
    title: news.title,
    description: news.description,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;

  return <NewsPage slug={slug} />;
}
