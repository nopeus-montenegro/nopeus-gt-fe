import { SetupInclude } from '@/04_entities/setup';

interface Props {
  setup: SetupInclude;
}

export function AerodynamicsCard({ setup }: Props) {
  const { aeroDownforceFront, aeroDownforceRear } = setup;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="px-1 text-lg text-slate-300">Aerodynamics</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Downforce:</div>

        <div className="grid grid-cols-[repeat(4,2rem)] align-middle gap-2 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {aeroDownforceFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {aeroDownforceRear}
        </div>
      </div>
    </div>
  );
}
