'use client';

import { Track, TrackRegion } from '@prisma/client';

import { Authorization } from '@/03_features/authorization';
import { TrackCard } from '@/04_entities/track';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { REGIONS_PRELOAD } from '@/05_shared/lib/const';
import { REGION_LABEL } from '@/05_shared/lib/dictionaries';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal';
import { useState } from 'react';
import { useFilter } from '../hooks/use-filter';
import { useSort } from '../hooks/use-sort';
import { TrackCardAction } from './track-card-action';

interface Props {
  tracks: Track[];
};

export function TrackList({ tracks }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

  const filtered = useFilter(tracks);
  const sorted = useSort(filtered);

  const regions = Object.values(TrackRegion);

  return (
    <>
      <Portal>
        <ModalDrawerControlled
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
        >
          {() => <Authorization />}
        </ModalDrawerControlled>
      </Portal>

      {
        regions.map((region, index) => {
          const regionTracks = sorted.filter(t => t.region === region);

          if (regionTracks.length === 0) return null;

          return (
            <section key={region}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">{REGION_LABEL[region]}</h2>
                <div className="h-px flex-1 bg-linear-to-r from-border/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {regionTracks.map(track => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    preload={index < REGIONS_PRELOAD}
                    action={(
                      <TrackCardAction
                        id={track.id}
                        onUnauthenticated={() => setIsOpen(true)}
                      />
                    )}
                  />
                ))}
              </div>
            </section>
          );
        })
      }
    </>
  );
}
