'use client';

import Link from 'next/link';

import { CAR_FILTER } from '@/05_shared/lib/const';
import { Button } from '@/05_shared/ui/shadcn/button';
import { CarClass } from '@prisma/client';

export default function Home() {
  return (
    <div className="flex flex-col gap-12 min-h-dvh w-full items-center justify-center text-slate-50 antialiased">
      <h1 className="text-5xl text-center font-black tracking-tighter uppercase italic">
        Nopeus
        &nbsp;
        <span className="text-blue-500 not-italic">GT</span>
      </h1>

      <div className="flex flex-col gap-4 mt-4 px-6 w-full sm:flex-row sm:w-auto">
        <Link className="w-full" href="/track">
          <Button className="w-full min-w-60" variant="outline" size="lg">
            TRACKS
          </Button>
        </Link>

        <Link className="w-full" href="/car">
          <Button className="w-full min-w-60" variant="outline" size="lg">
            CARS
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-6 max-w-lg text-center font-sans">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 rounded-full animate-pulse">
          Early Access
        </span>

        <p className="text-xl font-light tracking-wide text-slate-300 leading-relaxed">
          We are building the ultimate
          {' '}
          <span className="font-semibold text-white bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text">GT7 telemetry hub</span>
          .
          Currently featuring setups for every racing class across 26 real-world tracks and 3 speed profiles.
        </p>

        <div className="w-full h-px bg-linear-to-r from-transparent via-indigo-400 to-transparent my-1" />

        <div className="flex flex-col gap-3 items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Available cars by category
          </span>

          <div className="flex flex-wrap justify-center gap-2 max-w-sm">
            {[
              { label: 'Gr.1', count: 26, value: CarClass.GR_1 },
              { label: 'Gr.2', count: 10, value: CarClass.GR_2 },
              { label: 'Gr.3', count: 51, value: CarClass.GR_3 },
              { label: 'Gr.4', count: 34, value: CarClass.GR_4 },
            ].map(item => (
              <Link
                key={item.label}
                href={`/car?${CAR_FILTER.CAR_CLASS}=${item.value}`}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-slate-800 bg-slate-900/60 text-slate-300 rounded-md hover:border-indigo-500 hover:text-white hover:bg-indigo-950/30 transition-all duration-200 shadow-sm"
              >
                <span className="text-slate-400 font-semibold">{item.label}</span>
                <span className="h-4 w-px bg-slate-800" />
                <span className="text-indigo-400 font-mono text-xs">{item.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
