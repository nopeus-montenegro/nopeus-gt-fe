'use client';

import { BopTrackClass, TrackClass, TrackRegion, TrackSurface } from '@prisma/client';
import { ArrowBigRightDash, ArrowDownAZ, ArrowDownZA, SlidersHorizontal, StickyNoteX } from 'lucide-react';
import { useCallback, useState } from 'react';

import { SETUP_FILTER, SETUP_SORT, SORT_DIRECTION, SORT_TYPE, TRACK_FILTER, TRACK_SORT } from '@/05_shared/lib/const';
import { BOP_CLASS_LABEL, REGION_LABEL, SETUP_TRACK_SORT_LABELS, SURFACE_LABEL, TRACK_CLASS_LABEL } from '@/05_shared/lib/dictionaries';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Checkbox } from '@/05_shared/ui/shadcn/checkbox';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from '@/05_shared/ui/shadcn/combobox';
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/05_shared/ui/shadcn/field';
import { Label } from '@/05_shared/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/05_shared/ui/shadcn/select';
import { Slider } from '@/05_shared/ui/shadcn/slider';
import { MAX_LIMITS } from '@/05_shared/utils/parse-limits';

import { useUrlFilters } from '../hooks/use-url-filters';

export function SetupTrackFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => {
    setCurrentFilters(getFiltersFromUrl());
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  const { searchParams, setFilter, clearFilters } = useUrlFilters();
  const getFiltersFromUrl = useCallback(() => ({
    [SORT_TYPE.DATA]: searchParams.get(SORT_TYPE.DATA) || TRACK_SORT.NAME,
    [SORT_TYPE.DIRECTION]: searchParams.get(SORT_TYPE.DIRECTION) || SORT_DIRECTION.ASCENDING,

    [TRACK_FILTER.REGION]: searchParams.get(TRACK_FILTER.REGION),
    [TRACK_FILTER.SURFACE]: searchParams.get(TRACK_FILTER.SURFACE),
    [TRACK_FILTER.TRACK_CLASS]: searchParams.get(TRACK_FILTER.TRACK_CLASS),
    [TRACK_FILTER.BOP]: searchParams.get(TRACK_FILTER.BOP),
    [TRACK_FILTER.RAIN]: searchParams.get(TRACK_FILTER.RAIN),
    [TRACK_FILTER.SOPHY]: searchParams.get(TRACK_FILTER.SOPHY),

    [SETUP_FILTER.PP_LIM_MIN]: searchParams.get(SETUP_FILTER.PP_LIM_MIN),
    [SETUP_FILTER.PP_LIM_MAX]: searchParams.get(SETUP_FILTER.PP_LIM_MAX),
    [SETUP_FILTER.POWER_LIM_MIN]: searchParams.get(SETUP_FILTER.POWER_LIM_MIN),
    [SETUP_FILTER.POWER_LIM_MAX]: searchParams.get(SETUP_FILTER.POWER_LIM_MAX),
    [SETUP_FILTER.TORQUE_LIM_MIN]: searchParams.get(SETUP_FILTER.TORQUE_LIM_MIN),
    [SETUP_FILTER.TORQUE_LIM_MAX]: searchParams.get(SETUP_FILTER.TORQUE_LIM_MAX),
    [SETUP_FILTER.WEIGHT_LIM_MIN]: searchParams.get(SETUP_FILTER.WEIGHT_LIM_MIN),
    [SETUP_FILTER.WEIGHT_LIM_MAX]: searchParams.get(SETUP_FILTER.WEIGHT_LIM_MAX),
    [SETUP_FILTER.WPR_LIM_MIN]: searchParams.get(SETUP_FILTER.WPR_LIM_MIN),
    [SETUP_FILTER.WPR_LIM_MAX]: searchParams.get(SETUP_FILTER.WPR_LIM_MAX),
  }), [searchParams]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string | null>>(getFiltersFromUrl());
  const onFiltersChange = (filters: {
    key: string;
    value: string | null;
  }) => setCurrentFilters(current => ({
    ...current,
    [filters.key]: filters.value,
  }));
  const onFiltersApply = () => {
    setFilter(currentFilters ? Object.entries(currentFilters).map(filter => ({ key: filter[0], value: filter[1] })) : []);
    closeDrawer();
  };

  const regionRef = useComboboxAnchor();
  const surfaceRef = useComboboxAnchor();
  const classRef = useComboboxAnchor();
  const bopRef = useComboboxAnchor();

  return (
    <>
      <button
        onClick={openDrawer}
        type="button"
        className={cn(
          'group fixed bottom-6 right-6 z-40',
          'm-0 px-4 py-3',
          'flex items-center gap-2',
          'rounded-full border border-zinc-800 bg-zinc-900/90',
          'text-sm font-medium text-slate-200',
          'shadow-xl backdrop-blur-md transition-transform',
          'hover:scale-105 active:scale-95',
        )}
      >
        <SlidersHorizontal className="w-5 h-5 text-slate-400" />
        <span className="hidden md:group-hover:block ">Filters</span>
      </button>

      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 z-40 mb-0 bg-black/60 backdrop-blur-sm transition-all overscroll-contain"
        />
      )}

      <div
        className={cn(
          'fixed z-50 border-zinc-800 bg-zinc-950 p-6 m-0 text-slate-200 shadow-2xl transition-transform duration-300 ease-in-out overscroll-contain',
          // Mobile
          'bottom-0 left-0 right-0 max-h-[90dvh] rounded-t-2xl border-t overflow-y-auto',
          // Desktop
          'md:top-0 md:right-0 md:left-auto md:h-full md:w-85 md:max-h-screen md:rounded-none md:rounded-l-2xl md:border-l md:border-t-0 md:translate-y-0',
          isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <h2 className="text-lg font-semibold tracking-wide text-slate-100">Sort and Filters</h2>

          <div>
            <button
              onClick={() => {
                clearFilters();
                closeDrawer();
              }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-zinc-900 hover:text-slate-200"
            >
              <StickyNoteX className="w-6 h-6" />
            </button>

            <button
              onClick={closeDrawer}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-zinc-900 hover:text-slate-200"
            >
              <ArrowBigRightDash className="rotate-90 md:rotate-0 w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Sort:</h3>

            <button
              onClick={currentFilters[SORT_TYPE.DIRECTION] === SORT_DIRECTION.ASCENDING
                ? () => onFiltersChange({ key: SORT_TYPE.DIRECTION, value: SORT_DIRECTION.DESCENDING })
                : () => onFiltersChange({ key: SORT_TYPE.DIRECTION, value: SORT_DIRECTION.ASCENDING })}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-zinc-900 hover:text-slate-200"
            >
              {
                currentFilters[SORT_TYPE.DIRECTION] === SORT_DIRECTION.ASCENDING
                  ? <ArrowDownAZ className="w-6 h-6 cursor-pointer" />
                  : <ArrowDownZA className="w-6 h-6 cursor-pointer" />
              }
            </button>
          </div>

          <div className="space-y-2">
            <Select
              value={currentFilters[SORT_TYPE.DATA]!}
              onValueChange={key => onFiltersChange({ key: SORT_TYPE.DATA, value: key as TRACK_SORT })}
            >
              <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-muted-foreground">
                <SelectValue placeholder="Choose Sort" />
              </SelectTrigger>

              <SelectContent
                className="p-1 bg-zinc-900 border-zinc-800 text-slate-200"
                position="popper"
              >
                {(Object.entries(SETUP_TRACK_SORT_LABELS) as [TRACK_SORT & SETUP_SORT, string][]).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Filters:</h3>

          <div className="space-y-2">
            <Combobox
              multiple
              autoHighlight
              items={Object.keys(REGION_LABEL) as TrackRegion[]}
              value={currentFilters[TRACK_FILTER.REGION] ? currentFilters[TRACK_FILTER.REGION]?.split(',') as TrackRegion[] : []}
              onValueChange={key => onFiltersChange({ key: TRACK_FILTER.REGION, value: key.join(',') })}
            >
              <ComboboxChips ref={regionRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {REGION_LABEL[value as TrackRegion]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[TRACK_FILTER.REGION]
                        && <ComboboxChipsInput placeholder={currentFilters[TRACK_FILTER.REGION] ? '' : 'Region'} />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={regionRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {REGION_LABEL[item as TrackRegion]}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="space-y-2">
            <Combobox
              multiple
              autoHighlight
              items={Object.keys(SURFACE_LABEL) as TrackSurface[]}
              value={currentFilters[TRACK_FILTER.SURFACE] ? currentFilters[TRACK_FILTER.SURFACE]?.split(',') as TrackSurface[] : []}
              onValueChange={key => onFiltersChange({ key: TRACK_FILTER.SURFACE, value: key.join(',') })}
            >
              <ComboboxChips ref={surfaceRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {SURFACE_LABEL[value as TrackSurface]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[TRACK_FILTER.SURFACE]
                        && <ComboboxChipsInput placeholder={currentFilters[TRACK_FILTER.SURFACE] ? '' : 'Surface'} />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={surfaceRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {SURFACE_LABEL[item as TrackSurface]}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="space-y-2">
            <Combobox
              multiple
              autoHighlight
              items={Object.keys(TRACK_CLASS_LABEL) as TrackClass[]}
              value={currentFilters[TRACK_FILTER.TRACK_CLASS] ? currentFilters[TRACK_FILTER.TRACK_CLASS]?.split(',') as TrackClass[] : []}
              onValueChange={key => onFiltersChange({ key: TRACK_FILTER.TRACK_CLASS, value: key.join(',') })}
            >
              <ComboboxChips ref={classRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {TRACK_CLASS_LABEL[value as TrackClass]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[TRACK_FILTER.TRACK_CLASS]
                        && <ComboboxChipsInput placeholder={currentFilters[TRACK_FILTER.TRACK_CLASS] ? '' : 'Class'} />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={classRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {TRACK_CLASS_LABEL[item as TrackClass]}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="space-y-2">
            <Combobox
              multiple
              autoHighlight
              items={Object.keys(BOP_CLASS_LABEL) as BopTrackClass[]}
              value={currentFilters[TRACK_FILTER.BOP] ? currentFilters[TRACK_FILTER.BOP]?.split(',') as BopTrackClass[] : []}
              onValueChange={key => onFiltersChange({ key: TRACK_FILTER.BOP, value: key.join(',') })}
            >
              <ComboboxChips ref={bopRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {BOP_CLASS_LABEL[value as BopTrackClass]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[TRACK_FILTER.BOP]
                        && <ComboboxChipsInput placeholder={currentFilters[TRACK_FILTER.BOP] ? '' : 'BoP'} />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={bopRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {BOP_CLASS_LABEL[item as BopTrackClass]}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="space-y-2">
            <FieldLabel>
              <Field orientation="horizontal" className="gap-3">
                <Checkbox
                  id={TRACK_FILTER.RAIN}
                  name={TRACK_FILTER.RAIN}
                  checked={!!currentFilters[TRACK_FILTER.RAIN]}
                  onCheckedChange={checked => onFiltersChange({
                    key: TRACK_FILTER.RAIN,
                    value: checked ? 'true' : '',
                  })}
                />
                <FieldContent>
                  <FieldTitle className="text-muted-foreground">Rain available</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>

          <div className="space-y-2">
            <FieldLabel>
              <Field orientation="horizontal" className="gap-3">
                <Checkbox
                  id={TRACK_FILTER.SOPHY}
                  name={TRACK_FILTER.SOPHY}
                  checked={!!currentFilters[TRACK_FILTER.SOPHY]}
                  onCheckedChange={checked => onFiltersChange({
                    key: TRACK_FILTER.SOPHY,
                    value: checked ? 'true' : '',
                  })}
                />
                <FieldContent>
                  <FieldTitle className="text-muted-foreground">Sophy available</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>

          <div className="mx-auto grid w-full gap-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="slider-pp" className="text-muted-foreground">PP</Label>
              <span className="text-sm text-muted-foreground">
                {currentFilters[SETUP_FILTER.PP_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.PP_LIM_MIN]!, 10) : 0}
                {' - '}
                {currentFilters[SETUP_FILTER.PP_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.PP_LIM_MAX]!, 10) : MAX_LIMITS.PP}
              </span>
            </div>

            <Slider
              id="slider-pp"
              value={[
                currentFilters[SETUP_FILTER.PP_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.PP_LIM_MIN]!, 10) : 0,
                currentFilters[SETUP_FILTER.PP_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.PP_LIM_MAX]!, 10) : MAX_LIMITS.PP,
              ]}
              onValueChange={(value) => {
                onFiltersChange({ key: SETUP_FILTER.PP_LIM_MIN, value: value[0].toString() });
                onFiltersChange({ key: SETUP_FILTER.PP_LIM_MAX, value: value[1].toString() });
              }}
              min={0}
              max={MAX_LIMITS.PP}
              step={1}
            />
          </div>

          <div className="mx-auto grid w-full gap-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="slider-power" className="text-muted-foreground">Power</Label>
              <span className="text-sm text-muted-foreground">
                {currentFilters[SETUP_FILTER.POWER_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.POWER_LIM_MIN]!, 10) : 0}
                {' - '}
                {currentFilters[SETUP_FILTER.POWER_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.POWER_LIM_MAX]!, 10) : MAX_LIMITS.POWER}
              </span>
            </div>

            <Slider
              id="slider-power"
              value={[
                currentFilters[SETUP_FILTER.POWER_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.POWER_LIM_MIN]!, 10) : 0,
                currentFilters[SETUP_FILTER.POWER_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.POWER_LIM_MAX]!, 10) : MAX_LIMITS.POWER,
              ]}
              onValueChange={(value) => {
                onFiltersChange({ key: SETUP_FILTER.POWER_LIM_MIN, value: value[0].toString() });
                onFiltersChange({ key: SETUP_FILTER.POWER_LIM_MAX, value: value[1].toString() });
              }}
              min={0}
              max={MAX_LIMITS.POWER}
              step={1}
            />
          </div>

          <div className="mx-auto grid w-full gap-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="slider-torque" className="text-muted-foreground">Torque</Label>
              <span className="text-sm text-muted-foreground">
                {currentFilters[SETUP_FILTER.TORQUE_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.TORQUE_LIM_MIN]!, 10) : 0}
                {' - '}
                {currentFilters[SETUP_FILTER.TORQUE_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.TORQUE_LIM_MAX]!, 10) : MAX_LIMITS.TORQUE}
              </span>
            </div>

            <Slider
              id="slider-torque"
              value={[
                currentFilters[SETUP_FILTER.TORQUE_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.TORQUE_LIM_MIN]!, 10) : 0,
                currentFilters[SETUP_FILTER.TORQUE_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.TORQUE_LIM_MAX]!, 10) : MAX_LIMITS.TORQUE,
              ]}
              onValueChange={(value) => {
                onFiltersChange({ key: SETUP_FILTER.TORQUE_LIM_MIN, value: value[0].toString() });
                onFiltersChange({ key: SETUP_FILTER.TORQUE_LIM_MAX, value: value[1].toString() });
              }}
              min={0}
              max={MAX_LIMITS.TORQUE}
              step={1}
            />
          </div>

          <div className="mx-auto grid w-full gap-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="slider-weight" className="text-muted-foreground">Weight</Label>
              <span className="text-sm text-muted-foreground">
                {currentFilters[SETUP_FILTER.WEIGHT_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.WEIGHT_LIM_MIN]!, 10) : 0}
                {' - '}
                {currentFilters[SETUP_FILTER.WEIGHT_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.WEIGHT_LIM_MAX]!, 10) : MAX_LIMITS.WEIGHT}
              </span>
            </div>

            <Slider
              id="slider-weight"
              value={[
                currentFilters[SETUP_FILTER.WEIGHT_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.WEIGHT_LIM_MIN]!, 10) : 0,
                currentFilters[SETUP_FILTER.WEIGHT_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.WEIGHT_LIM_MAX]!, 10) : MAX_LIMITS.WEIGHT,
              ]}
              onValueChange={(value) => {
                onFiltersChange({ key: SETUP_FILTER.WEIGHT_LIM_MIN, value: value[0].toString() });
                onFiltersChange({ key: SETUP_FILTER.WEIGHT_LIM_MAX, value: value[1].toString() });
              }}
              min={0}
              max={MAX_LIMITS.WEIGHT}
              step={1}
            />
          </div>

          <div className="mx-auto grid w-full gap-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="slider-wpr" className="text-muted-foreground">WPR</Label>
              <span className="text-sm text-muted-foreground">
                {currentFilters[SETUP_FILTER.WPR_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.WPR_LIM_MIN]!, 10) : 0}
                {' - '}
                {currentFilters[SETUP_FILTER.WPR_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.WPR_LIM_MAX]!, 10) : MAX_LIMITS.WPR}
              </span>
            </div>

            <Slider
              id="slider-wpr"
              value={[
                currentFilters[SETUP_FILTER.WPR_LIM_MIN] ? parseInt(currentFilters[SETUP_FILTER.WPR_LIM_MIN]!, 10) : 0,
                currentFilters[SETUP_FILTER.WPR_LIM_MAX] ? parseInt(currentFilters[SETUP_FILTER.WPR_LIM_MAX]!, 10) : MAX_LIMITS.WPR,
              ]}
              onValueChange={(value) => {
                onFiltersChange({ key: SETUP_FILTER.WPR_LIM_MIN, value: value[0].toString() });
                onFiltersChange({ key: SETUP_FILTER.WPR_LIM_MAX, value: value[1].toString() });
              }}
              min={0}
              max={MAX_LIMITS.WPR}
              step={0.01}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-900 pt-4">
          <button
            onClick={onFiltersApply}
            className="w-full rounded-xl bg-slate-200 py-3 text-center text-sm font-semibold text-zinc-950 transition-colors hover:bg-slate-100 active:scale-[0.99]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
