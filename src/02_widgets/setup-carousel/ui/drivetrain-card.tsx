import { SetupInclude } from '@/04_entities/setup';
import { CLUTCH, PROPELLER_SHAFT } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function DrivetrainCard({ setup }: Props) {
  const { clutchFlywheelType, propellerShaftType } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Drivetrain</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Clutch & Flywheel:</div>

        <div className="text-base text-white">
          {CLUTCH[clutchFlywheelType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Propeller Shaft:</div>

        <div className="text-base text-white">
          {PROPELLER_SHAFT[propellerShaftType]}
        </div>
      </div>
    </div>
  );
}
