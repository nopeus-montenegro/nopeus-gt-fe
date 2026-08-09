import { SetupInclude } from '@/04_entities/setup';
import { ENGINE_UPGRADE } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function EngineTuningCard({ setup }: Props) {
  const { engineBoreUp, engineStrokeUp, engineBalanceTuning, enginePolishPorts, engineHighLiftCamshaft, engineTitaniumRods, engineRacingCrank, engineHighCompPistons } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Engine Tuning</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Bore Up:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[engineBoreUp]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Stroke Up:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[engineStrokeUp]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Engine Balance Tuning:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[engineBalanceTuning]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Polish Ports:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[enginePolishPorts]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">High Lift Camshaft:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[engineHighLiftCamshaft]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Titanium Connecting Rods & Pistons:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[engineTitaniumRods]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Racing Crank Shaft:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[engineRacingCrank]}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">High Compression Pistons:</div>

        <div className="text-base text-white">
          {ENGINE_UPGRADE[engineHighCompPistons]}
        </div>
      </div>
    </div>
  );
}
