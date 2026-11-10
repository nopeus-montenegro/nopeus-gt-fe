'use client';

import { Authorization } from '@/03_features/authorization';
import { SetupCarUser } from '@/04_entities/setup';
import { SetupUserInclude } from '@/04_entities/setup/lib/types';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { InfiniteScroll } from '@/05_shared/ui/infinite-scroll';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal';
import { Suspense, useState } from 'react';
import { useFilter } from '../hooks/use-filter';
import { useSort } from '../hooks/use-sort';
import { SetupUserAction } from './setup-user-action';

interface Props {
  setups: SetupUserInclude[];
}

export function SetupUserList({ setups }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

  const filtered = useFilter(setups);
  const sorted = useSort(filtered);

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

      <Suspense>
        <InfiniteScroll items={sorted} keyExtractor={setup => setup.id}>
          {setup => (
            <SetupCarUser
              setup={setup}
              action={(
                <SetupUserAction
                  id={setup.id}
                  onUnauthenticated={() => setIsOpen(true)}
                />
              )}
            />
          )}
        </InfiniteScroll>
      </Suspense>
    </>
  );
}
