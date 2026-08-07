import Image from 'next/image';
import { notFound } from 'next/navigation';

import { NewsContent } from '@/04_entities/news/ui/news-content';
import { Breadcrumbs } from '@/05_shared/ui/breadcrumbs';
import { getNewsPost } from '@/app/actions/news-feed';

interface Props {
  slug: string;
}

export async function NewsPage({ slug }: Props) {
  const news = await getNewsPost(slug);

  if (!news) {
    notFound();
  }

  return (
    <article className="container max-w-3xl mx-auto px-4 py-12">
      <header className="mb-4 space-y-4">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white text-balance">
          {news.title}
        </h1>

        <time className="text-sm text-slate-400 font-mono tracking-wider">
          {news.date}
        </time>
      </header>

      <div className="container mx-auto max-w-5xl mb-6">
        <Breadcrumbs dynamicNames={{ [slug]: `${news.title}` }} />
      </div>

      <div className="relative w-full mb-10 overflow-hidden rounded-xl border border-white/10">
        <Image
          src={`${process.env.NEXT_PUBLIC_BLOB_URL}${news.cover}`}
          alt={news.title}
          width={1200}
          height={750}
          sizes="(max-width: 1024px) 100vw, 768px"
          priority
        />
      </div>

      <NewsContent news={news} />
    </article>
  );
}
