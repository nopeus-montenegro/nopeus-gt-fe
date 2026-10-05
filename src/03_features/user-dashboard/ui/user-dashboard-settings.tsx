'use client';

import { UserRoundCog } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { BUTTON_POSITION, ModalDrawer } from '@/05_shared/ui/modal-drawer';

export function UserDashboardSettings() {
  const pathname = usePathname();

  if (pathname !== '/user') {
    return null;
  }

  return (
    <ModalDrawer
      buttonAria="User Settings"
      buttonIcon={<UserRoundCog className="w-7 h-7 ml-0.5 mr-[-0.5] text-white/90" />}
      buttonText="Settings"
      buttonPosition={BUTTON_POSITION.SECOND}
    >
      {() => (
        <div>
          User Settings
        </div>
      )}
    </ModalDrawer>

  );
}
