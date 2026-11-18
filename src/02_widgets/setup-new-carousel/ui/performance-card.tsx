import { SetupInclude } from '@/04_entities/setup';

interface Props {
  setup: SetupInclude;
}

export function PerformanceCard({ setup }: Props) {
  const { ballastWeight, ballastPosition, powerRestrictor } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Performance Adjustment</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Ballast:</div>

        <div className="text-base text-white">
          {ballastWeight}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Ballast Positioning:</div>

        <div className="text-base text-white">
          {ballastPosition}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Power Restrictor:</div>

        <div className="text-base text-white">
          {powerRestrictor}
        </div>
      </div>
    </div>
  );
}
