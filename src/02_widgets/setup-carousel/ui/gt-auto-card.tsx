import { SetupInclude } from '@/04_entities/setup';
import { CUSTOM_PART, CUSTOM_WING } from '@/05_shared/lib/dictionaries';

interface Props {
  setup: SetupInclude;
}

export function GtAutoCard({ setup }: Props) {
  const { hasWideBody, gtAutoFront, gtAutoRear, gtAutoSide, gtAutoWing } = setup;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">GT Auto</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Wide body:</div>

        <div className="text-base text-white">
          {hasWideBody ? 'Installed' : 'None'}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Custom parts front:</div>

        <div className="text-base text-white">
          {CUSTOM_PART[gtAutoFront]}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Custom parts side:</div>

        <div className="text-base text-white">
          {CUSTOM_PART[gtAutoSide]}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Custom parts rear:</div>

        <div className="text-base text-white">
          {CUSTOM_PART[gtAutoRear]}
        </div>
      </div>

      <div className="flex gap-2 justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Custom parts wing:</div>

        <div className="text-base text-white">
          {CUSTOM_WING[gtAutoWing]}
        </div>
      </div>
    </div>
  );
}
