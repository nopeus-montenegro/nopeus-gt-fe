'use client';

import { SORT_DIRECTION, SORT_TYPE, TRACK_FILTER, TRACK_SORT } from '@/05_shared/lib/const';
import { BOP_CLASS_LABEL, REGION_LABEL, SURFACE_LABEL, TRACK_CLASS_LABEL, TRACK_SORT_LABELS } from '@/05_shared/lib/dictionaries';
import { Checkbox } from '@/05_shared/ui/shadcn/checkbox';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from '@/05_shared/ui/shadcn/combobox';
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/05_shared/ui/shadcn/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/05_shared/ui/shadcn/select';
import { BopTrackClass, TrackClass, TrackRegion, TrackSurface } from '@prisma/client';
import { ArrowBigRightDash, ArrowDownAZ, ArrowDownZA, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useUrlFilters } from '../hooks/use-url-filters';

export function TrackFilters() {
  const [isOpen, setIsOpen] = useState(false);

  const { searchParams, setFilter } = useUrlFilters();

  const regionRef = useComboboxAnchor();
  const surfaceRef = useComboboxAnchor();
  const classRef = useComboboxAnchor();
  const bopRef = useComboboxAnchor();

  const currentSortBy = searchParams.get(SORT_TYPE.DATA) || TRACK_SORT.NAME;
  const currentSortDir = searchParams.get(SORT_TYPE.DIRECTION) || SORT_DIRECTION.ASCENDING;
  const currentRegion = searchParams.get(TRACK_FILTER.REGION)?.split(',') as TrackRegion[] || [];
  const currentSurface = searchParams.get(TRACK_FILTER.SURFACE)?.split(',') as TrackSurface[] || [];
  const currentTrackClass = searchParams.get(TRACK_FILTER.TRACK_CLASS)?.split(',') as TrackClass[] || [];
  const currentBopClass = searchParams.get(TRACK_FILTER.BOP)?.split(',') as BopTrackClass[] || [];
  const hasRain = searchParams.get(TRACK_FILTER.RAIN) === true.toString();
  const hasSophy = searchParams.get(TRACK_FILTER.SOPHY) === true.toString();

  const toggleDrawer = () => setIsOpen(current => !current);

  return (
    <>
      <button
        onClick={toggleDrawer}
        type="button"
        className="group fixed bottom-6 right-6 z-40 m-0 px-4 py-3 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 text-sm font-medium text-slate-200 shadow-xl backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
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
        className={`fixed z-50 border-zinc-800 bg-zinc-950 p-6 m-0 text-slate-200 shadow-2xl transition-transform duration-300 ease-in-out overscroll-contain
          /* Mobile */
          bottom-0 left-0 right-0 max-h-[90dvh] rounded-t-2xl border-t overflow-y-auto
          /* Desktop */
          md:top-0 md:right-0 md:left-auto md:h-full md:w-85 md:max-h-screen md:rounded-none md:rounded-l-2xl md:border-l md:border-t-0 md:translate-y-0
          ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <h2 className="text-lg font-semibold tracking-wide text-slate-100">Sort and Filters</h2>

          <button
            onClick={toggleDrawer}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-zinc-900 hover:text-slate-200"
          >
            <ArrowBigRightDash className="rotate-90 md:rotate-0 w-6 h-6" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Sort:</h3>

            <button
              onClick={currentSortDir === SORT_DIRECTION.ASCENDING
                ? () => setFilter(SORT_TYPE.DIRECTION, SORT_DIRECTION.DESCENDING)
                : () => setFilter(SORT_TYPE.DIRECTION, SORT_DIRECTION.ASCENDING)}
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
              onValueChange={key => setFilter(SORT_TYPE.DATA, key as TRACK_SORT)}
            >
              <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-slate-200">
                <SelectValue placeholder="Choose Sort" />
              </SelectTrigger>

              <SelectContent
                className="p-1 bg-zinc-900 border-zinc-800 text-slate-200"
                position="popper"
              >
                {(Object.entries(TRACK_SORT_LABELS) as [TRACK_SORT, string][]).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Filters:</h3>

          <div className="space-y-2">
            <Combobox
              multiple
              autoHighlight
              items={Object.keys(REGION_LABEL) as TrackRegion[]}
              value={currentRegion}
              onValueChange={key => setFilter(TRACK_FILTER.REGION, key.join(','))}
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
                        currentRegion.length === 0
                        && <ComboboxChipsInput placeholder={currentRegion ? 'Region' : ''} />
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
              items={Object.keys(SURFACE_LABEL) as TrackRegion[]}
              value={currentSurface}
              onValueChange={key => setFilter(TRACK_FILTER.SURFACE, key.join(','))}
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
                        currentSurface.length === 0
                        && <ComboboxChipsInput placeholder={currentSurface ? 'Surface' : ''} />
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
              items={Object.keys(TRACK_CLASS_LABEL) as TrackRegion[]}
              value={currentTrackClass}
              onValueChange={key => setFilter(TRACK_FILTER.TRACK_CLASS, key.join(','))}
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
                        currentTrackClass.length === 0
                        && <ComboboxChipsInput placeholder={currentTrackClass ? 'Class' : ''} />
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
              value={currentBopClass}
              onValueChange={key => setFilter(TRACK_FILTER.BOP, key.join(','))}
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
                        currentBopClass.length === 0
                        && <ComboboxChipsInput placeholder={currentBopClass ? 'BoP' : ''} />
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
            <FieldLabel className="bg-zinc-900 border-zinc-800 text-slate-200">
              <Field orientation="horizontal">
                <Checkbox id={TRACK_FILTER.RAIN} name={TRACK_FILTER.RAIN} checked={hasRain} onCheckedChange={checked => setFilter(TRACK_FILTER.RAIN, checked ? 'true' : '')} />
                <FieldContent>
                  <FieldTitle>Rain available</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>

          <div className="space-y-2">
            <FieldLabel className="bg-zinc-900 border-zinc-800 text-slate-200">
              <Field orientation="horizontal">
                <Checkbox id={TRACK_FILTER.SOPHY} name={TRACK_FILTER.SOPHY} checked={hasSophy} onCheckedChange={checked => setFilter(TRACK_FILTER.SOPHY, checked ? 'true' : '')} />
                <FieldContent>
                  <FieldTitle>Sophy available</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
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
