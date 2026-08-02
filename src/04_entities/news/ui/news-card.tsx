import Image from 'next/image';
import Link from 'next/link';

import { newsPostRoute } from '@/05_shared/lib/next/routes';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { NewsPostMeta } from '../lib/types';

interface Props {
  news: NewsPostMeta;
  priority?: boolean;
}

export function NewsCard({ news, priority = false }: Props) {
  return (
    <Link
      href={newsPostRoute(news.slug)}
      target="_blank"
      className={cn(
        'flex flex-col md:grid md:grid-cols-5 items-center gap-16',
        'py-6 px-6 md:px-8',
        'rounded-xl border border-white/5',
        'bg-slate-900/20 backdrop-blur-sm',
        'hover:bg-slate-900/40 hover:-translate-y-0.5 hover:shadow-lg transition-all',
      )}
    >
      <Image
        className="col-span-2 w-full rounded-sm"
        src={`${process.env.NEXT_PUBLIC_BLOB_URL}${news.cover}`}
        alt={news.title}
        width={1200}
        height={750}
        sizes="(max-width: 768px) 100vw, 320px"
        priority={priority}
      />
      <div className="flex flex-col justify-between col-span-3 h-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {news.title}
          </h2>

          <p className="text-slate-400">
            {news.description}
          </p>
        </div>

        <p className="mt-3 text-slate-400/60 text-xs self-end">
          {news.date}
        </p>
      </div>
    </Link>

  );
}
