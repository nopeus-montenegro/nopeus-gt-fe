import { NewsPage } from '@/01_pages/news';
import { getKeywords } from '@/05_shared/config/seo';
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
    keywords: getKeywords([
      `${news.title.split(':')[0]} news`,
      'gran turismo 7 news',
    ]),
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: news.title,
      description: news.description,
      url: `/news/${slug}`,
      type: 'article',
      publishedTime: new Date(news.date).toISOString(),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BLOB_URL}${news.cover}`,
          width: 1200,
          height: 750,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.description,
      images: [`${process.env.NEXT_PUBLIC_BLOB_URL}${news.cover}`],
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;

  return <NewsPage slug={slug} />;
}
