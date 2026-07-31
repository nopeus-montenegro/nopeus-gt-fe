import { MainNav } from '@/02_widgets/main-nav';
import { setupDetailRoute } from '@/05_shared/lib/next/routes';
import { cn } from '@/05_shared/lib/shadcn/utils';
import Image from 'next/image';
import Link from 'next/link';

export function MainPage() {
  return (
    <div className="relative flex flex-col max-w-5xl mx-auto px-4 antialiased">
      <MainNav />

      <div className="pt-32 md:pt-48 lg:pt-36 mb-12 space-y-4">
        <Link
          href={setupDetailRoute('cmr1zewws00ycd2bysg63xkfe')}
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
            src="https://19z3gdb0u05zouco.public.blob.vercel-storage.com/news/dr/2026-07-28.webp"
            alt="news image"
            width={1200}
            height={750}
          />
          <div className="flex flex-col gap-2 col-span-3">
            <h2 className="text-2xl font-bold">
              Gran Turismo 7 Daily Races: July&nbsp;28,&nbsp;2026
            </h2>

            <p className="text-slate-400">
              Barcelona Gr.2 pit strategy, Trial Mountain Gr.3 sprint, and Tsukuba X-BOW one-make.
            </p>

            <p className="mt-3 text-slate-400/60 text-xs self-end">
              2026-07-28
            </p>
          </div>
        </Link>
        <Link
          href={setupDetailRoute('cmr1zewws00ycd2bysg63xkfe')}
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
            src="https://19z3gdb0u05zouco.public.blob.vercel-storage.com/news/dr/2026-07-28.webp"
            alt="news image"
            width={1200}
            height={750}
          />
          <div className="flex flex-col gap-2 col-span-3">
            <h2 className="text-2xl font-bold">
              Gran Turismo 7 Daily Races: July&nbsp;28,&nbsp;2026
            </h2>

            <p className="text-slate-400">
              Barcelona Gr.2 pit strategy, Trial Mountain Gr.3 sprint, and Tsukuba X-BOW one-make.
            </p>

            <p className="mt-3 text-slate-400/60 text-xs self-end">
              2026-07-28
            </p>
          </div>
        </Link>
        <Link
          href={setupDetailRoute('cmr1zewws00ycd2bysg63xkfe')}
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
            src="https://19z3gdb0u05zouco.public.blob.vercel-storage.com/news/dr/2026-07-28.webp"
            alt="news image"
            width={1200}
            height={750}
          />
          <div className="flex flex-col gap-2 col-span-3">
            <h2 className="text-2xl font-bold">
              Gran Turismo 7 Daily Races: July&nbsp;28,&nbsp;2026
            </h2>

            <p className="text-slate-400">
              Barcelona Gr.2 pit strategy, Trial Mountain Gr.3 sprint, and Tsukuba X-BOW one-make.
            </p>

            <p className="mt-3 text-slate-400/60 text-xs self-end">
              2026-07-28
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
