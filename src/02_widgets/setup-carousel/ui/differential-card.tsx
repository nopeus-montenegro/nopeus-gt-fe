import { SetupInclude } from '@/04_entities/setup';
import {
  DIFFERENTIAL,
  TORQUE_VECTORING,
} from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function DifferentialCard({ setup }: Props) {
  const { diffType, diffAccelSensFront, diffAccelSensRear, diffBrakeSensFront, diffBrakeSensRear, diffInitTorqueFront, diffInitTorqueRear, diffTorqueVectoring, diffTorqueFront, diffTorqueRear } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Differential Gear</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Differential:</div>

        <div className="text-base text-white">
          {DIFFERENTIAL[diffType]}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Initial Torque:</div>

        <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {diffInitTorqueFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {diffInitTorqueRear}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Acceleration Sensitivity:</div>

        <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {diffAccelSensFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {diffAccelSensRear}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Braking Sensitivity:</div>

        <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {diffBrakeSensFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {diffBrakeSensRear}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Torque-Vectoring Centre Differential:</div>

        <div className="text-base text-white">
          {TORQUE_VECTORING[diffTorqueVectoring]}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Front / Rear Torque Distribution:</div>

        <div className="text-base text-white">
          {diffTorqueFront === 0 && diffTorqueRear === 0
            ? '- : -'
            : `${diffTorqueFront} : ${diffTorqueRear}`}
        </div>
      </div>
    </div>
  );
}
