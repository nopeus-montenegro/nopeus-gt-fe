'use client';

import { Route } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { CarList } from '@/02_widgets/car-list';
import { TrackList } from '@/02_widgets/track-list';
import { SetupUserList } from '@/02_widgets/user-page-list';
import { CarFilters, getFilterList, SetupUserFilters, TrackFilters } from '@/03_features/filter-sort';
import { DASHBOARD_TABS, useUrlTabs } from '@/03_features/user-dashboard';
import { SetupCarUser } from '@/04_entities/setup';
import { UserInclude } from '@/04_entities/user';
import { InfiniteScroll } from '@/05_shared/ui/infinite-scroll';

interface Props {
  userData: UserInclude;
}

export function UserPageList({ userData }: Props) {
  const { currentTab } = useUrlTabs();

  if (!userData) {
    redirect('/error' as Route);
  }

  switch (currentTab) {
    case DASHBOARD_TABS.CAR:
      return (
        <>
          <Suspense>
            <CarFilters filterList={getFilterList(userData.favCars)} />
          </Suspense>

          <Suspense>
            <CarList cars={userData.favCars} />
          </Suspense>
        </>
      );
    case DASHBOARD_TABS.TRACK:
      return (
        <>
          <Suspense>
            <TrackFilters />
          </Suspense>

          <Suspense>
            <TrackList tracks={userData.favTracks} />
          </Suspense>
        </>
      );
    case DASHBOARD_TABS.SETUP:
      return (
        <>
          <Suspense>
            <SetupUserFilters filterList={getFilterList(userData.favSetups.map(setup => setup.car))} />
          </Suspense>

          <Suspense>
            <SetupUserList setups={userData.favSetups} />
          </Suspense>
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
