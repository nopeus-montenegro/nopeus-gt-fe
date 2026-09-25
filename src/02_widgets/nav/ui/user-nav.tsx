'use client';

import { DASHBOARD_TABS, useUserDashboardStore } from '@/03_features/user-dashboard';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Button } from '@/05_shared/ui/shadcn/button';
import { ButtonGroup } from '@/05_shared/ui/shadcn/button-group';
import { CirclePlus, UserRoundCog } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
  const activeTab = useUserDashboardStore(s => s.activeTab);
  const setActiveTab = useUserDashboardStore(s => s.setActiveTab);

  return (
    <header className="fixed top-0 md:top-8 left-0 right-0 z-30 flex justify-center px-0 md:px-8 pointer-events-none">
      <nav
        className={cn(
          'w-full max-w-5xl pointer-events-auto',
          'flex items-center justify-start lg:justify-between gap-4',
          'px-6 py-6 shadow-xl shadow-black/40',
          'rounded-b-2xl md:rounded-2xl',
          'border border-secondary/5 bg-secondary/30 backdrop-blur-sm',
        )}
      >
        <h1 className="text-2xl text-center font-black tracking-tighter uppercase italic">
          <Link href="/">
            Nopeus&nbsp;
            <span className="text-blue-500 not-italic">GT</span>
          </Link>
        </h1>

        <div className="flex gap-4">
          <ButtonGroup className="hidden lg:flex">
            {Object.values(DASHBOARD_TABS).map(item => (
              <Button
                key={item}
                variant="outline"
                className={cn(
                  activeTab === item && 'bg-secondary/30 hover:bg-secondary/30',
                  'px-4 sm:px-8 lg:px-4',
                )}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </Button>
            ))}
          </ButtonGroup>

          <Button
            variant="outline"
          >
            <UserRoundCog className="w-5 h-5" />
          </Button>

          <Button
            variant="secondary"
            className="px-4 sm:px-8 lg:px-3 text-blue-700 font-black"
          >
            <CirclePlus className="w-5 h-5" />
            ADD SETUP
          </Button>
        </div>

        {/* <Button asChild variant="outline">
          <Link href="/car" className="px-4 sm:px-8 lg:px-3">FAVORITE CARS</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/track" className="px-4 sm:px-8 lg:px-3">FAVORITE SETUPS</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/track" className="px-4 sm:px-8 lg:px-3">MY SETUPS</Link>
        </Button> */}
      </nav>
    </header>
  );
}
