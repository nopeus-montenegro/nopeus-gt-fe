'use client';

import { AspirationType, CarClass, Drivetrain, EngineLayout, OvertakeType } from '@prisma/client';
import { ArrowBigRightDash, ArrowDownAZ, ArrowDownZA, SlidersHorizontal, StickyNoteX } from 'lucide-react';
import { useCallback, useState } from 'react';

import { CAR_FILTER, CAR_SORT, SETUP_FILTER, SETUP_SORT, SORT_DIRECTION, SORT_TYPE } from '@/05_shared/lib/const';
import { ASPIRATION, CAR_CLASS, DRIVETRAIN, ENGINE_LAYOUT, OVERTAKE, SETUP_CAR_SORT_LABELS } from '@/05_shared/lib/dictionaries';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Checkbox } from '@/05_shared/ui/shadcn/checkbox';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from '@/05_shared/ui/shadcn/combobox';
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/05_shared/ui/shadcn/field';
import { Label } from '@/05_shared/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/05_shared/ui/shadcn/select';
import { Slider } from '@/05_shared/ui/shadcn/slider';
import { MAX_LIMITS } from '@/05_shared/utils/parse-limits';
import { useUrlFilters } from '../hooks/use-url-filters';

interface Props {
  filterList: {
    countries: string[];
    manufacturers: string[];
  };
}

export function SetupCarFilters({ filterList }: Props) {
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
    [SORT_TYPE.DATA]: searchParams.get(SORT_TYPE.DATA) || CAR_SORT.YEAR,
    [SORT_TYPE.DIRECTION]: searchParams.get(SORT_TYPE.DIRECTION) || SORT_DIRECTION.ASCENDING,

    [CAR_FILTER.COUNTRY]: searchParams.get(CAR_FILTER.COUNTRY),
    [CAR_FILTER.MANUFACTURER]: searchParams.get(CAR_FILTER.MANUFACTURER),
    [CAR_FILTER.HYBRID]: searchParams.get(CAR_FILTER.HYBRID),
    [CAR_FILTER.ASPIRATION]: searchParams.get(CAR_FILTER.ASPIRATION),
    [CAR_FILTER.CAR_CLASS]: searchParams.get(CAR_FILTER.CAR_CLASS),
    [CAR_FILTER.DRIVETRAIN]: searchParams.get(CAR_FILTER.DRIVETRAIN),
    [CAR_FILTER.ENGINE_LAYOUT]: searchParams.get(CAR_FILTER.ENGINE_LAYOUT),
    [CAR_FILTER.OVERTAKE]: searchParams.get(CAR_FILTER.OVERTAKE),

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

  const countryRef = useComboboxAnchor();
  const manufacturerRef = useComboboxAnchor();
  const aspirationRef = useComboboxAnchor();
  const classRef = useComboboxAnchor();
  const drivetrainRef = useComboboxAnchor();
  const layoutRef = useComboboxAnchor();
  const overtakeRef = useComboboxAnchor();

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
              onValueChange={key => onFiltersChange({ key: SORT_TYPE.DATA, value: key as CAR_SORT & SETUP_SORT })}
            >
              <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-muted-foreground">
                <SelectValue placeholder="Choose Sort" />
              </SelectTrigger>

              <SelectContent
                className="p-1 bg-zinc-900 border-zinc-800 text-slate-200"
                position="popper"
              >
                {(Object.entries(SETUP_CAR_SORT_LABELS) as [CAR_SORT & SETUP_SORT, string][]).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Filters:</h3>

          <div className="space-y-2">
            <Combobox
              multiple
              autoHighlight
              items={filterList.countries}
              value={currentFilters[CAR_FILTER.COUNTRY] ? currentFilters[CAR_FILTER.COUNTRY]?.split(',') : []}
              onValueChange={key => onFiltersChange({ key: CAR_FILTER.COUNTRY, value: key.join(',') })}
            >
              <ComboboxChips ref={countryRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {value}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[CAR_FILTER.COUNTRY]
                        && <ComboboxChipsInput placeholder="Country" />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={countryRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {item}
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
              items={filterList.manufacturers}
              value={currentFilters[CAR_FILTER.MANUFACTURER] ? currentFilters[CAR_FILTER.MANUFACTURER]?.split(',') : []}
              onValueChange={key => onFiltersChange({ key: CAR_FILTER.MANUFACTURER, value: key.join(',') })}
            >
              <ComboboxChips ref={manufacturerRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {value}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[CAR_FILTER.MANUFACTURER]
                        && <ComboboxChipsInput placeholder="Manufacturer" />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={manufacturerRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {item}
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
              items={Object.keys(ASPIRATION) as AspirationType[]}
              value={currentFilters[CAR_FILTER.ASPIRATION] ? currentFilters[CAR_FILTER.ASPIRATION]?.split(',') : []}
              onValueChange={key => onFiltersChange({ key: CAR_FILTER.ASPIRATION, value: key.join(',') })}
            >
              <ComboboxChips ref={aspirationRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {ASPIRATION[value as AspirationType]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[CAR_FILTER.ASPIRATION]
                        && <ComboboxChipsInput placeholder="Aspiration" />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={aspirationRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {ASPIRATION[item as AspirationType]}
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
              items={Object.keys(CAR_CLASS) as CarClass[]}
              value={currentFilters[CAR_FILTER.CAR_CLASS] ? currentFilters[CAR_FILTER.CAR_CLASS]?.split(',') : []}
              onValueChange={key => onFiltersChange({ key: CAR_FILTER.CAR_CLASS, value: key.join(',') })}
            >
              <ComboboxChips ref={classRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {CAR_CLASS[value as CarClass]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[CAR_FILTER.CAR_CLASS]
                        && <ComboboxChipsInput placeholder="Car Class" />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={classRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {CAR_CLASS[item as CarClass]}
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
              items={Object.keys(DRIVETRAIN) as Drivetrain[]}
              value={currentFilters[CAR_FILTER.DRIVETRAIN] ? currentFilters[CAR_FILTER.DRIVETRAIN]?.split(',') : []}
              onValueChange={key => onFiltersChange({ key: CAR_FILTER.DRIVETRAIN, value: key.join(',') })}
            >
              <ComboboxChips ref={drivetrainRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {DRIVETRAIN[value as Drivetrain]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[CAR_FILTER.DRIVETRAIN]
                        && <ComboboxChipsInput placeholder="Drivetrain" />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={drivetrainRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {DRIVETRAIN[item as Drivetrain]}
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
              items={Object.keys(ENGINE_LAYOUT) as EngineLayout[]}
              value={currentFilters[CAR_FILTER.ENGINE_LAYOUT] ? currentFilters[CAR_FILTER.ENGINE_LAYOUT]?.split(',') : []}
              onValueChange={key => onFiltersChange({ key: CAR_FILTER.ENGINE_LAYOUT, value: key.join(',') })}
            >
              <ComboboxChips ref={layoutRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {ENGINE_LAYOUT[value as EngineLayout]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[CAR_FILTER.ENGINE_LAYOUT]
                        && <ComboboxChipsInput placeholder="Engine Layout" />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={layoutRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {ENGINE_LAYOUT[item as EngineLayout]}
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
              items={Object.keys(OVERTAKE) as OvertakeType[]}
              value={currentFilters[CAR_FILTER.OVERTAKE] ? currentFilters[CAR_FILTER.OVERTAKE]?.split(',') : []}
              onValueChange={key => onFiltersChange({ key: CAR_FILTER.OVERTAKE, value: key.join(',') })}
            >
              <ComboboxChips ref={overtakeRef} className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <ComboboxValue>
                  {values => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value} className="bg-zinc-800 text-slate-200">
                          {OVERTAKE[value as OvertakeType]}
                        </ComboboxChip>
                      ))}

                      {
                        !currentFilters[CAR_FILTER.OVERTAKE]
                        && <ComboboxChipsInput placeholder="Overtake" />
                      }
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent anchor={overtakeRef}>
                <ComboboxList className="bg-zinc-900 border-zinc-800 text-slate-200">
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {OVERTAKE[item as OvertakeType]}
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
                  id={CAR_FILTER.HYBRID}
                  name={CAR_FILTER.HYBRID}
                  checked={!!currentFilters[CAR_FILTER.HYBRID]}
                  onCheckedChange={checked => onFiltersChange({ key: CAR_FILTER.HYBRID, value: checked ? 'true' : '' })}
                />
                <FieldContent>
                  <FieldTitle className="text-muted-foreground">Hybrid</FieldTitle>
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
