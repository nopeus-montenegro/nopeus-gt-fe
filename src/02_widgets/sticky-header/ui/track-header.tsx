'use client';

import { FAVORITE_TYPE } from '@/03_features/add-favorites';
import { Authorization } from '@/03_features/authorization';
import { TrackStickyHeader } from '@/04_entities/track';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal/ui/portal';
import { Track } from '@prisma/client';
import { useState } from 'react';
import { HeaderAction } from './header-action';

interface Props {
  track: Track;
}

export function TrackHeader({ track }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

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

      <TrackStickyHeader
        track={track}
        action={(
          <HeaderAction
            id={track.id}
            onUnauthenticated={() => setIsOpen(true)}
            favoriteType={FAVORITE_TYPE.TRACK}
          />
        )}
      />
    </>
  );
}
