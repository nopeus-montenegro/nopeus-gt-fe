import { SetupInclude } from '@/04_entities/setup';
import { ANTI_LAG, INTERCOOLER, SUPERCHARGER, TURBO } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function SuperchargerCard({ setup }: Props) {
  const { turboType, antiLagType, intercoolerType, superchargerType } = setup;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="px-1 text-lg text-slate-300">Supercharger</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Turbocharger:</div>

        <div className="text-base text-white">
          {TURBO[turboType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Anti-Lag System:</div>

        <div className="text-base text-white">
          {ANTI_LAG[antiLagType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Intercooler:</div>

        <div className="text-base text-white">
          {INTERCOOLER[intercoolerType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Spercharger:</div>

        <div className="text-base text-white">
          {SUPERCHARGER[superchargerType]}
        </div>
      </div>
    </div>
  );
}
