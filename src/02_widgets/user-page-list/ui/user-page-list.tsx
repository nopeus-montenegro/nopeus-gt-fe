'use client';

import { CarList } from '@/02_widgets/car-list';
import { TrackList } from '@/02_widgets/track-list';
import { DASHBOARD_TABS, useUserDashboardStore } from '@/03_features/user-dashboard';
import { SetupCarUser } from '@/04_entities/setup';
import { UserInclude } from '@/04_entities/user';
import { Route } from 'next';
import { redirect } from 'next/navigation';

interface Props {
  userData: UserInclude;
}

export function UserPageList({ userData }: Props) {
  const activeTab = useUserDashboardStore(s => s.activeTab);

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
        <div className="mb-8 space-y-4">
          {userData?.favSetups.map(setup => (
            <SetupCarUser
              key={setup.id}
              setup={setup}
            />
          ))}
        </div>
      );
    case DASHBOARD_TABS.MY_SETUP:
      return (
        <div className="mb-8 space-y-4">
          {userData?.setups.map(setup => (
            <SetupCarUser
              key={setup.id}
              setup={setup}
            />
          ))}
        </div>
      );
  }
}
