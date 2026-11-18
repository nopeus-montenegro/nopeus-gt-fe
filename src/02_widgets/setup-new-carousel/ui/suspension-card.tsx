import { Controller, useFormContext } from 'react-hook-form';

import { SetupInclude } from '@/04_entities/setup';
import { SUSPENSION } from '@/05_shared/lib/dictionaries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/05_shared/ui/shadcn/select';

interface Props {
  setup: SetupInclude;
}

export function SuspensionCard({ setup }: Props) {
  const { susCamberFront, susCamberRear, susNaturalFreqFront, susNaturalFreqRear, susToeFront, susToeRear, susAntiRollBarFront, susAntiRollBarRear, susDampingCompFront, susDampingCompRear, susDampingExpFront, susDampingExpRear } = setup;
  const { register, control } = useFormContext();

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="px-1 text-lg text-slate-300">Suspension</h2>
      <div className="h-px mb-2 bg-linear-to-r from-border/50 to-transparent" />

      <div className="flex gap-2 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <label className="text-xs text-slate-400">Suspension:</label>

        <Controller
          name="suspensionType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-45 h-8 bg-slate-900 border-white/10 text-xs focus:ring-0 focus-visible:ring-0 focus:border-white/40 focus-visible:border-white/40">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                {Object.entries(SUSPENSION).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Body Height Adjustment:</div>

        <div className="self-end sm:justify-self-end flex items-center gap-2">
          <span className="text-xs text-slate-400">F</span>
          <input
            type="number"
            inputMode="numeric"
            step="1"
            {...register('susBodyHeightFront', { valueAsNumber: true })}
            className="w-16 h-7 px-2 text-right text-sm bg-slate-900/60 rounded-md border border-white/10 text-white focus:outline-hidden focus:border-white/40 focus-visible:border-white/40"
          />
          <span className="text-xs text-slate-400 ml-2">R</span>
          <input
            type="number"
            inputMode="numeric"
            step="1"
            {...register('susBodyHeightRear', { valueAsNumber: true })}
            className="w-16 h-7 px-2 text-right text-sm bg-slate-900/60 rounded-md border border-white/10 text-white focus:outline-hidden focus:border-white/40 focus-visible:border-white/40"
          />
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Anti-Roll Bar:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {susAntiRollBarFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {susAntiRollBarRear}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Damping Ratio (Compression):</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {susDampingCompFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {susDampingCompRear}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Damping Ratio (Expansion):</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {susDampingExpFront}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {susDampingExpRear}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Natural Frequency:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {(susNaturalFreqFront).toFixed(2)}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {(susNaturalFreqRear).toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Negative Camber Angle:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {(susCamberFront).toFixed(1)}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {(susCamberRear).toFixed(1)}
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-0.5 lg:gap-3 justify-between p-3 bg-slate-950/20 rounded-xl border border-white/5 text-nowrap">
        <div className="my-1 text-xs text-slate-400 mb-1">Toe Angle:</div>

        <div className="self-end sm:justify-self-end grid grid-cols-[repeat(4,2rem)] gap-3 md:gap-0.5 lg:gap-3 text-base text-end text-white">
          <span className="mt-1 text-xs text-slate-400">front</span>
          {(susToeFront).toFixed(2)}
          <span className="mt-1 text-xs text-slate-400">rear</span>
          {(susToeRear).toFixed(2)}
        </div>
      </div>
    </div>

  );
}
