import { SetupInclude } from '@/04_entities/setup';

interface Props {
  setup: SetupInclude;
}

export function EngineCard({ setup }: Props) {
  const { car, swappedEngineModel, power, powerRpm, torque, torqueRpm, weight, wpr, weightBalanceFront, weightBalanceRear } = setup;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="px-1 text-lg text-slate-300">Engine</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Engine code:</div>

        <div className="text-base text-white">
          {swappedEngineModel || car.engineCode}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Power:</div>

        <div className="text-base text-white">
          {power}
                    &nbsp;BHP
          <span className="mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
          {powerRpm}
                    &nbsp;RPM
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Torque:</div>

        <div className="text-base text-white">
          {torque}
                    &nbsp;kgfm
          <span className="mx-2 text-xs text-slate-400">&nbsp;at&nbsp;</span>
          {torqueRpm}
                    &nbsp;RPM
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">WPR:</div>

        <div className="text-base text-white">
          {wpr}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Weight:</div>

        <div className="text-base text-white">
          {weight}
          {' kg'}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Weight balance:</div>

        <div className="text-base text-white">
          {weightBalanceFront}
          {' : '}
          {weightBalanceRear}
        </div>
      </div>
    </div>
  );
}
