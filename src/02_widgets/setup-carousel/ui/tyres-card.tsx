import { SetupInclude } from '@/04_entities/setup';
import {
  TYRES,
} from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function TyresCard({ setup }: Props) {
  const { tyresFront, tyresRear } = setup;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="px-1 text-lg text-slate-300">Tyres</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Front:</div>

        <div className="text-base text-white">
          {TYRES[tyresFront]}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Rear:</div>

        <div className="text-base text-white">
          {TYRES[tyresRear]}
        </div>
      </div>
    </div>
  );
}
