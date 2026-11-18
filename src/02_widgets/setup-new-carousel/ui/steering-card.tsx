import { SetupInclude } from '@/04_entities/setup';
import { AWS, STEERING } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function SteeringCard({ setup }: Props) {
  const { steeringAngleKit, fourWheelSteeringType, rearSteeringAngle } = setup;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="px-1 text-lg text-slate-300">Steering</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Steering Angle Kit:</div>

        <div className="text-base text-white">
          {STEERING[steeringAngleKit]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">4WS System:</div>

        <div className="text-base text-white">
          {AWS[fourWheelSteeringType]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Rear Steering Angle:</div>

        <div className="text-base text-white">
          {rearSteeringAngle}
        </div>
      </div>
    </div>
  );
}
