import { SetupInclude } from '@/04_entities/setup';
import {
  SUSPENSION,
} from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function SuspensionCard({ setup }: Props) {
  const { susCamberFront, susCamberRear, susNaturalFreqFront, susNaturalFreqRear, susToeFront, susToeRear, suspensionType, susBodyHeightFront, susBodyHeightRear, susAntiRollBarFront, susAntiRollBarRear, susDampingCompFront, susDampingCompRear, susDampingExpFront, susDampingExpRear } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Suspension</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Suspension:</div>

        <div className="text-base text-white">
          {SUSPENSION[suspensionType]}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Body Height Adjustment:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {susBodyHeightFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {susBodyHeightRear}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Anti-Roll Bar:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {susAntiRollBarFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {susAntiRollBarRear}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Damping Ratio (Compression):</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {susDampingCompFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {susDampingCompRear}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Damping Ratio (Expansion):</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {susDampingExpFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {susDampingExpRear}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Natural Frequency:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {(susNaturalFreqFront).toFixed(2)}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {(susNaturalFreqRear).toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Negative Camber Angle:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {(susCamberFront).toFixed(1)}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {(susCamberRear).toFixed(1)}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Toe Angle:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {(susToeFront).toFixed(2)}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {(susToeRear).toFixed(2)}
        </div>
      </div>
    </div>

  );
}
