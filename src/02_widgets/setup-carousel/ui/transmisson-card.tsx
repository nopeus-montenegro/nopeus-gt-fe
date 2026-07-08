import { SetupInclude } from '@/04_entities/setup';
import { AIR_CLEANER, EXHAUST_MANIFOLD, SILENCER } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function TransmissionCard({ setup }: Props) {
  const { airCleanerType, silencerType, exhaustManifoldType } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Transmission</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Air Cleaner:</div>

        <div className="text-base text-white">
          {AIR_CLEANER[airCleanerType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Silencer:</div>

        <div className="text-base text-white">
          {SILENCER[silencerType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Exhaust Manifold:</div>

        <div className="text-base text-white">
          {EXHAUST_MANIFOLD[exhaustManifoldType]}
        </div>
      </div>
    </div>
  );
}
