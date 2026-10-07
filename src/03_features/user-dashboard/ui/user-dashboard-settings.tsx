'use client';

import { UserRoundCog } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { MENU_PRIORITY, MenuPortal } from '@/05_shared/ui/menu-portal';
import { ModalDrawer } from '@/05_shared/ui/modal-drawer';

export function UserDashboardSettings() {
  const pathname = usePathname();

  if (pathname !== '/user') {
    return null;
  }

  return (
    <MenuPortal priority={MENU_PRIORITY.AUTH}>
      <ModalDrawer
        buttonAria="User Settings"
        buttonIcon={<UserRoundCog className="w-7 h-7 ml-0.5 mr-[-0.5] text-white/90" />}
        buttonText="Settings"
      >
        {() => (
          <div>
            User Settings
          </div>
        )}
      </ModalDrawer>
    </MenuPortal>

  );
}
