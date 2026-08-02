import { getNewsFeed, getNewsPost } from '@/app/actions/news-feed';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const news = await getNewsPost(slug);

  if (!news) {
    notFound();
  }

  return (
    <article className="container max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8 space-y-4">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white text-balance">
          {news.title}
        </h1>

        <time className="text-sm text-white/40 font-mono tracking-wider">
          {news.date}
        </time>
      </header>

      <div className="relative w-full mb-10 overflow-hidden rounded-xl border border-white/10">
        <Image
          src={`${process.env.NEXT_PUBLIC_BLOB_URL}${news.cover}`}
          alt={news.title}
          width={1200}
          height={750}
          priority
        />
      </div>

      <div className="prose prose-invert prose-slate max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="pb-2 mt-6 mb-3 border-b border-white/10 text-xl font-semibold text-slate-100 tracking-wide">
                {children}
              </h2>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-white/90">
                {children}
              </strong>
            ),
            ul: ({ children }) => (
              <ul className="space-y-1.5 my-3 text-slate-300 list-none pl-0">
                {children}
              </ul>
            ),
          }}
        >
          {news.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
