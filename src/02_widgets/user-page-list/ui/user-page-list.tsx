'use client';

import { CarList } from '@/02_widgets/car-list';
import { TrackList } from '@/02_widgets/track-list';
import { Authorization } from '@/03_features/authorization';
import { DASHBOARD_TABS, useUserDashboardStore } from '@/03_features/user-dashboard';
import { SetupCarUser } from '@/04_entities/setup';
import { UserInclude } from '@/04_entities/user';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { InfiniteScroll } from '@/05_shared/ui/infinite-scroll';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal';
import { Route } from 'next';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { SetupUserAction } from './setup-user-action';

interface Props {
  userData: UserInclude;
}

export function UserPageList({ userData }: Props) {
  const activeTab = useUserDashboardStore(s => s.activeTab);

  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

  if (!userData) {
    redirect('/error' as Route);
  }

  switch (activeTab) {
    case DASHBOARD_TABS.CAR:
      return <CarList cars={userData.favCars} />;
    case DASHBOARD_TABS.TRACK:
      return <TrackList tracks={userData.favTracks} />;
    case DASHBOARD_TABS.SETUP:
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

          <InfiniteScroll items={userData.favSetups} keyExtractor={setup => setup.id}>
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
        </>
      );
    case DASHBOARD_TABS.MY_SETUP:
      return (
        <InfiniteScroll items={userData.setups} keyExtractor={setup => setup.id}>
          {setup => <SetupCarUser setup={setup} />}
        </InfiniteScroll>
      );
    default:
      return null;
  }
}
