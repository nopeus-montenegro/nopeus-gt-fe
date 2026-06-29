import { SetupInclude } from '@/04_entities/setup';

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
          {engineBoreUp ? 'Installed' : 'None'}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Stroke Up:</div>

        <div className="text-base text-white">
          {engineStrokeUp ? 'Installed' : 'None'}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Engine Balance Tuning:</div>

        <div className="text-base text-white">
          {engineBalanceTuning ? 'Installed' : 'None'}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Polish Ports:</div>

        <div className="text-base text-white">
          {enginePolishPorts ? 'Installed' : 'None'}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">High Lift Camshaft:</div>

        <div className="text-base text-white">
          {engineHighLiftCamshaft ? 'Installed' : 'None'}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Titanium Connecting Rods & Pistons:</div>

        <div className="text-base text-white">
          {engineTitaniumRods ? 'Installed' : 'None'}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Racing Crank Shaft:</div>

        <div className="text-base text-white">
          {engineRacingCrank ? 'Installed' : 'None'}
        </div>
      </div>
      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">High Compression Pistons:</div>

        <div className="text-base text-white">
          {engineHighCompPistons ? 'Installed' : 'None'}
        </div>
      </div>
    </div>
  );
}
