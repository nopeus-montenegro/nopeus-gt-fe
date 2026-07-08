import { SetupInclude } from '@/04_entities/setup';
import { TRANSMISSION } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function TransmissionCard({ setup }: Props) {
  const { transmissionType, transTopSpeedAuto } = setup;

  return (

    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Transmission</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Transmission:</div>

        <div className="text-base text-white">
          {TRANSMISSION[transmissionType]}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Top Speed (Automatically Adjusted):</div>

        <div className="text-base text-white">
          {transTopSpeedAuto}
        </div>
      </div>
    </div>
  );
}
