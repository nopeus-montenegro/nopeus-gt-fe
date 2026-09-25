import { UserNav } from '@/02_widgets/nav';
import { UserPageList } from '@/02_widgets/user-page-list';
import { Authorization } from '@/03_features/authorization';
import { UserDashboardSettings } from '@/03_features/user-dashboard';
import { UserInclude } from '@/04_entities/user';
import { getUser } from '@/04_entities/user/model/get-user';
import { Suspense } from 'react';

export async function UserPage() {
  const userData = await getUser() as UserInclude;

  if (!userData) {
    return <Authorization />;
  }

  return (
    <div className="relative flex flex-col max-w-7xl mx-auto px-4 pt-40 space-y-8 antialiased">
      <UserNav />

      <UserPageList userData={userData} />

      <Suspense>
        <UserDashboardSettings />
      </Suspense>
    </div>
  );
};
