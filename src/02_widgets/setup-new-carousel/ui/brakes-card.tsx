import { SetupInclude } from '@/04_entities/setup';
import { BRAKE_BALANCE, BRAKE_PADS, BRAKE_SYSTEM, HANDBRAKE } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function BrakesCard({ setup }: Props) {
  const { brakeSystemType, brakePadsType, handbrakeType, handbrakeTorque, brakeBalanceType, brakeBalance } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Brakes</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Brake System:</div>

        <div className="text-base text-white">
          {BRAKE_SYSTEM[brakeSystemType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Brake Pads:</div>

        <div className="text-base text-white">
          {BRAKE_PADS[brakePadsType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Handbrake:</div>

        <div className="text-base text-white">
          {HANDBRAKE[handbrakeType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Handbrake Torque:</div>

        <div className="text-base text-white">
          {handbrakeTorque}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Brake Balance:</div>

        <div className="text-base text-white">
          {BRAKE_BALANCE[brakeBalanceType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Front / Rear Balance:</div>

        <div className="text-base text-white">
          {brakeBalance}
        </div>
      </div>
    </div>
  );
}
