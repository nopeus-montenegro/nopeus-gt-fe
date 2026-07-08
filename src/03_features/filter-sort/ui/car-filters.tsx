'use client';

import { ArrowBigRightDash, ArrowDownAZ, ArrowDownZA, SlidersHorizontal, StickyNoteX } from 'lucide-react';
import { useState } from 'react';

import { CarInclude } from '@/04_entities/car';
import { CAR_FILTER, CAR_SORT, SETUP_FILTER, SETUP_SORT, SORT_DIRECTION, SORT_TYPE } from '@/05_shared/lib/const';
import { ASPIRATION, CAR_CLASS, CAR_SORT_LABELS, DRIVETRAIN, ENGINE_LAYOUT, OVERTAKE } from '@/05_shared/lib/dictionaries';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Checkbox } from '@/05_shared/ui/shadcn/checkbox';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from '@/05_shared/ui/shadcn/combobox';
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/05_shared/ui/shadcn/field';
import { Label } from '@/05_shared/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/05_shared/ui/shadcn/select';
import { Slider } from '@/05_shared/ui/shadcn/slider';
import { MAX_LIMITS } from '@/05_shared/utils/parse-limits';
import { AspirationType, CarClass, Drivetrain, EngineLayout, OvertakeType } from '@prisma/client';
import { useUrlFilters } from '../hooks/use-url-filters';

interface Props {
  cars: CarInclude[];
}

export function CarFilters({ cars }: Props) {
  const countries = cars.reduce<string[]>((acc, car) => acc.includes(car.country) ? acc : [...acc, car.country], []);
  const manufacturers = cars.reduce<string[]>((acc, car) => acc.includes(car.manufacturer) ? acc : [...acc, car.manufacturer], []);

  const [isOpen, setIsOpen] = useState(false);

  const { searchParams, setFilter, clearFilters } = useUrlFilters();

  const countryRef = useComboboxAnchor();
  const manufacturerRef = useComboboxAnchor();
  const aspirationRef = useComboboxAnchor();
  const classRef = useComboboxAnchor();
  const drivetrainRef = useComboboxAnchor();
  const layoutRef = useComboboxAnchor();
  const overtakeRef = useComboboxAnchor();

  const currentSortBy = searchParams.get(SORT_TYPE.DATA) || CAR_SORT.YEAR;
  const currentSortDir = searchParams.get(SORT_TYPE.DIRECTION) || SORT_DIRECTION.ASCENDING;

  const currentCountry = searchParams.get(CAR_FILTER.COUNTRY)?.split(',') || [];
  const currentManufacturer = searchParams.get(CAR_FILTER.MANUFACTURER)?.split(',') || [];
  const isHybrid = searchParams.get(CAR_FILTER.HYBRID) === true.toString();
  const currentAspiretion = searchParams.get(CAR_FILTER.ASPIRATION)?.split(',') as AspirationType[] || [];
  const currentCarClass = searchParams.get(CAR_FILTER.CAR_CLASS)?.split(',') as CarClass[] || [];
  const currentDrivetrain = searchParams.get(CAR_FILTER.DRIVETRAIN)?.split(',') as Drivetrain[] || [];
  const currentEngineLayout = searchParams.get(CAR_FILTER.ENGINE_LAYOUT)?.split(',') as EngineLayout[] || [];
  const currentOvertake = searchParams.get(CAR_FILTER.OVERTAKE)?.split(',') as OvertakeType[] || [];

  const currentPpMin = searchParams.get(SETUP_FILTER.PP_LIM_MIN);
  const currentPpMax = searchParams.get(SETUP_FILTER.PP_LIM_MAX);
  const currentPowerMin = searchParams.get(SETUP_FILTER.POWER_LIM_MIN);
  const currentPowerMax = searchParams.get(SETUP_FILTER.POWER_LIM_MAX);
  const currentTorqueMin = searchParams.get(SETUP_FILTER.TORQUE_LIM_MIN);
  const currentTorqueMax = searchParams.get(SETUP_FILTER.TORQUE_LIM_MAX);
  const currentWeightMin = searchParams.get(SETUP_FILTER.WEIGHT_LIM_MIN);
  const currentWeightMax = searchParams.get(SETUP_FILTER.WEIGHT_LIM_MAX);
  const currentWprMin = searchParams.get(SETUP_FILTER.WPR_LIM_MIN);
  const currentWprMax = searchParams.get(SETUP_FILTER.WPR_LIM_MAX);

  const [ppSlider, setPpSlider] = useState([currentPpMin ? parseInt(currentPpMin, 10) : 0, currentPpMax ? parseInt(currentPpMax, 10) : MAX_LIMITS.PP]);
  const [powerSlider, setPowerSlider] = useState([currentPowerMin ? parseInt(currentPowerMin, 10) : 0, currentPowerMax ? parseInt(currentPowerMax, 10) : MAX_LIMITS.POWER]);
  const [torqueSlider, setTorqueSlider] = useState([currentTorqueMin ? parseInt(currentTorqueMin, 10) : 0, currentTorqueMax ? parseInt(currentTorqueMax, 10) : MAX_LIMITS.TORQUE]);
  const [weightSlider, setWeightSlider] = useState([currentWeightMin ? parseInt(currentWeightMin, 10) : 0, currentWeightMax ? parseInt(currentWeightMax, 10) : MAX_LIMITS.WEIGHT]);
  const [wprSlider, setWprSlider] = useState([currentWprMin ? parseInt(currentWprMin, 10) : 0, currentWprMax ? parseInt(currentWprMax, 10) : MAX_LIMITS.WPR]);

  const toggleDrawer = () => setIsOpen(current => !current);

  return (
    <>
      <button
        onClick={toggleDrawer}
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
          onClick={toggleDrawer}
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
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <h2 className="text-lg font-semibold tracking-wide text-slate-100">Sort and Filters</h2>

          <div>
            <button
              onClick={clearFilters}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-zinc-900 hover:text-slate-200"
            >
              <StickyNoteX className="w-6 h-6" />
            </button>

            <button
              onClick={toggleDrawer}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-zinc-900 hover:text-slate-200"
            >
              <ArrowBigRightDash className="rotate-90 md:rotate-0 w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Sort:</h3>

            <button
              onClick={currentSortDir === SORT_DIRECTION.ASCENDING
                ? () => setFilter([{ key: SORT_TYPE.DIRECTION, value: SORT_DIRECTION.DESCENDING }])
                : () => setFilter([{ key: SORT_TYPE.DIRECTION, value: SORT_DIRECTION.ASCENDING }])}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-zinc-900 hover:text-slate-200"
            >
              {
                currentSortDir === SORT_DIRECTION.ASCENDING
                  ? <ArrowDownAZ className="w-6 h-6 cursor-pointer" />
                  : <ArrowDownZA className="w-6 h-6 cursor-pointer" />
              }
            </button>
          </div>

          <div className="space-y-2">
            <Select
              value={currentSortBy}
              onValueChange={key => setFilter([{ key: SORT_TYPE.DATA, value: key as CAR_SORT & SETUP_SORT }])}
            >
              <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-muted-foreground">
                <SelectValue placeholder="Choose Sort" />
              </SelectTrigger>

              <SelectContent
                className="p-1 bg-zinc-900 border-zinc-800 text-slate-200"
                position="popper"
              >
                {(Object.entries(CAR_SORT_LABELS) as [CAR_SORT & SETUP_SORT, string][]).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Filters:</h3>

          <div className="space-y-2">
            <Combobox
              multiple
              autoHighlight
              items={countries}
              value={currentCountry}
              onValueChange={key => setFilter([{ key: CAR_FILTER.COUNTRY, value: key.join(',') }])}
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
                        currentCountry.length === 0
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
              items={manufacturers}
              value={currentManufacturer}
              onValueChange={key => setFilter([{ key: CAR_FILTER.MANUFACTURER, value: key.join(',') }])}
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
                        currentManufacturer.length === 0
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
              value={currentAspiretion}
              onValueChange={key => setFilter([{ key: CAR_FILTER.ASPIRATION, value: key.join(',') }])}
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
                        currentAspiretion.length === 0
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
              value={currentCarClass}
              onValueChange={key => setFilter([{ key: CAR_FILTER.CAR_CLASS, value: key.join(',') }])}
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
                        currentCarClass.length === 0
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
              value={currentDrivetrain}
              onValueChange={key => setFilter([{ key: CAR_FILTER.DRIVETRAIN, value: key.join(',') }])}
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
                        currentDrivetrain.length === 0
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
              value={currentEngineLayout}
              onValueChange={key => setFilter([{ key: CAR_FILTER.ENGINE_LAYOUT, value: key.join(',') }])}
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
                        currentEngineLayout.length === 0
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
              value={currentOvertake}
              onValueChange={key => setFilter([{ key: CAR_FILTER.OVERTAKE, value: key.join(',') }])}
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
                        currentOvertake.length === 0
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
            <FieldLabel className="bg-zinc-900 border-zinc-800 text-slate-200">
              <Field orientation="horizontal" className="gap-3">
                <Checkbox id={CAR_FILTER.HYBRID} name={CAR_FILTER.HYBRID} checked={isHybrid} onCheckedChange={checked => setFilter([{ key: CAR_FILTER.HYBRID, value: checked ? 'true' : '' }])} />
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
                {ppSlider[0]}
                {' - '}
                {ppSlider[1]}
              </span>
            </div>

            <Slider
              id="slider-pp"
              value={ppSlider}
              onValueChange={value => setPpSlider(value)}
              onValueCommit={(value) => {
                setFilter([
                  { key: SETUP_FILTER.PP_LIM_MIN, value: value[0].toString() },
                  { key: SETUP_FILTER.PP_LIM_MAX, value: value[1].toString() },
                ]);
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
                {powerSlider[0]}
                {' - '}
                {powerSlider[1]}
              </span>
            </div>

            <Slider
              id="slider-power"
              value={powerSlider}
              onValueChange={value => setPowerSlider(value)}
              onValueCommit={(value) => {
                setFilter([
                  { key: SETUP_FILTER.POWER_LIM_MIN, value: value[0].toString() },
                  { key: SETUP_FILTER.POWER_LIM_MAX, value: value[1].toString() },
                ]);
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
                {torqueSlider[0]}
                {' - '}
                {torqueSlider[1]}
              </span>
            </div>

            <Slider
              id="slider-torque"
              value={torqueSlider}
              onValueChange={value => setTorqueSlider(value)}
              onValueCommit={(value) => {
                setFilter([
                  { key: SETUP_FILTER.TORQUE_LIM_MIN, value: value[0].toString() },
                  { key: SETUP_FILTER.TORQUE_LIM_MAX, value: value[1].toString() },
                ]);
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
                {weightSlider[0]}
                {' - '}
                {weightSlider[1]}
              </span>
            </div>

            <Slider
              id="slider-weight"
              value={weightSlider}
              onValueChange={value => setWeightSlider(value)}
              onValueCommit={(value) => {
                setFilter([
                  { key: SETUP_FILTER.WEIGHT_LIM_MIN, value: value[0].toString() },
                  { key: SETUP_FILTER.WEIGHT_LIM_MAX, value: value[1].toString() },
                ]);
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
                {wprSlider[0]}
                {' - '}
                {wprSlider[1]}
              </span>
            </div>

            <Slider
              id="slider-wpr"
              value={wprSlider}
              onValueChange={value => setWprSlider(value)}
              onValueCommit={(value) => {
                setFilter([
                  { key: SETUP_FILTER.WPR_LIM_MIN, value: value[0].toString() },
                  { key: SETUP_FILTER.WPR_LIM_MAX, value: value[1].toString() },
                ]);
              }}
              min={0}
              max={MAX_LIMITS.WPR}
              step={0.01}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-900 pt-4 md:hidden">
          <button
            onClick={toggleDrawer}
            className="w-full rounded-xl bg-slate-200 py-3 text-center text-sm font-semibold text-zinc-950 transition-colors hover:bg-slate-100 active:scale-[0.99]"
          >
            Show results
          </button>
        </div>
      </div>
    </>
  );
}
