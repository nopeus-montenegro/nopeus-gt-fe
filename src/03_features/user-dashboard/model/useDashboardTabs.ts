import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DASHBOARD_TABS } from '../lib/const';

interface UserDashboardState {
  activeTab: DASHBOARD_TABS;
  // searchQuery: string;

  setActiveTab: (tab: DASHBOARD_TABS) => void;
  // setSearchQuery: (query: string) => void;
}

export const useUserDashboardStore = create<UserDashboardState>()(
  devtools(
    set => ({
      activeTab: DASHBOARD_TABS.MY_SETUP,
      // searchQuery: '',

      setActiveTab: activeTab => set({ activeTab }),
      // setSearchQuery: searchQuery => set({ searchQuery }),
    }),
    {
      name: 'Dashboard Tabs',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);
