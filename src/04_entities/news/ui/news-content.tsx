import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/05_shared/lib/shadcn/utils';
import { NewsPost } from '../lib/types';

interface Props {
  news: NewsPost;
}

export function NewsContent({ news }: Props) {
  return (
    <div className="prose prose-invert prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="pb-2 mt-8 mb-3 border-b border-white/10 text-2xl font-semibold text-slate-100 tracking-wide">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="my-4 text-lg font-bold text-slate-200">
              {children}
            </h3>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white/90">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className={cn(
              'space-y-1.5 my-3 text-slate-300 list-none pl-0',
              '[&_ul]:pl-6 [&_ul]:my-1.5 [&_ul]:text-sm [&_ul]:text-slate-400 [&_ul]:list-disc',
            )}
            >
              {children}
            </ul>
          ),
          a: ({ children, href, ...props }) => (
            <a className="underline" href={href} {...props}>
              {children}
            </a>
          ),
          hr: () => (
            <hr className="border-white/60 mt-8 mb-1" />
          ),
        }}
      >
        {news.content}
      </ReactMarkdown>
    </div>
  );
}
