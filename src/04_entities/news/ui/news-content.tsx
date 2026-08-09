import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
