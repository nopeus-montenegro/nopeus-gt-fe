import Link from 'next/link';

import { Button } from '@/05_shared/ui/shadcn/button';

export default function Home() {
  return (
    <div className="flex flex-col gap-12 min-h-screen items-center justify-center text-slate-50 antialiased">
      <h1 className="text-6xl font-black tracking-tighter uppercase italic">
        Nopeus
        {' '}
        <span className="text-blue-500 not-italic">GT</span>
      </h1>

      <div className="flex gap-4 mt-4">
        <Link href="/track">
          <Button className="min-w-60" variant="outline" size="lg">
            TRACKS
          </Button>
        </Link>

        <Link href="/car">
          <Button className="min-w-60" variant="outline" size="lg">
            CARS
          </Button>
        </Link>
      </div>

      <p className="flex flex-col gap-8 max-w-md text-lg text-slate-400 text-center">
        <span className="text-slate-50">( Early Access )</span>
        <br />
        We are building the ultimate GT7 telemetry hub. Currently featuring setups for every racing class across 26 real-world tracks and 3 speed profiles.
        <br />
        <span className="text-slate-50">Available cars: Gr.1 - 26, Gr.2 - 10, Gr.3 - 51, Gr.4 - 34</span>
      </p>
    </div>
  );
}
