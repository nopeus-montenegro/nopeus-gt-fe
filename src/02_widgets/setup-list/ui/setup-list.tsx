import { Car, Setup } from '@prisma/client';
import { Sliders } from 'lucide-react';

interface Props {
  header: React.ReactNode;
  data: { setup: Setup; car: Car }[];
}

export function SetupList({ header, data }: Props) {
  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {header}
      </div>

      <main className="relative z-10 container mx-auto px-4 max-w-5xl mt-6 pb-24">
        <div className="flex items-center gap-2 mb-6">
          <Sliders className="w-5 h-5 text-slate-400" />
          <h2 className="text-xl font-semibold tracking-tight text-white">Setups:</h2>
        </div>

        <div className="space-y-4">
          {data.map(d => (
            <div
              key={d.setup.id}
              className="p-5 rounded-xl border border-white/5 bg-slate-900/20 backdrop-blur-sm flex items-center justify-between hover:bg-slate-900/40 transition-colors"
            >
              <div>
                <h3 className="font-bold text-white">
                  {d.car.manufacturer}
                  {' '}
                  {d.car.name}
                  {' '}
                  {d.car.year}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Class:
                  {d.car.class}
                  {' '}
                  • Author:
                  {d.setup.authorId}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono text-emerald-400 font-semibold">{`2'14.307`}</span>
                <p className="text-[10px] text-slate-500 mt-1">3 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
