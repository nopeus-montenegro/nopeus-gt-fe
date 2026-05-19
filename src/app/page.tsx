import { Button } from '@/05_shared/ui/shadcn/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-600 text-slate-50 antialiased">
      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="absolute -top-24 -z-10 h-64 w-64 bg-blue-600/20 blur-[120px]" />

        <h1 className="text-6xl font-black tracking-tighter uppercase italic">
          Nopeus
          {' '}
          <span className="text-blue-500 not-italic">GT</span>
        </h1>

        <p className="max-w-125 text-lg text-slate-400">
          Professional lap timing and telemetry for your
          <span className="text-slate-200"> Thrustmaster T598</span>
          {' '}
          setup.
        </p>

        <div className="flex gap-4 mt-4">
          <Button variant="default" size="lg">
            START SESSION
          </Button>
          <Button variant="outline" size="lg">
            DASHBOARD
          </Button>
        </div>
      </div>
    </main>
  );
}
