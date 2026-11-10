'use client';

import { DASHBOARD_TABS } from '@/03_features/user-dashboard';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = (searchParams.get('tab') as DASHBOARD_TABS) || DASHBOARD_TABS.CAR;

  const setCurrentTab = useCallback((tab: DASHBOARD_TABS) => {
    const url = `${pathname}?tab=${tab}`;

    window.history.pushState(null, '', url);
  }, [pathname]);

  return { currentTab, setCurrentTab };
}
