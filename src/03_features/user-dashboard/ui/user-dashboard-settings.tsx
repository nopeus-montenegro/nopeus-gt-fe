'use client';

import { UserRoundCog } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { cn } from '@/05_shared/lib/shadcn/utils';

export function UserDashboardSettings() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const openDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  if (pathname !== '/user') {
    return null;
  }

  return (
    <>
      <button
        onClick={openDrawer}
        type="button"
        className={cn(
          'group fixed bottom-20 right-6 z-20',
          'm-0 py-2 px-2',
          'flex items-center gap-2',
          'rounded-full border border-secondary/5 bg-secondary/10',
          'text-sm font-medium text-slate-200/90',
          'shadow-xl backdrop-blur-md transition-transform',
          'hover:scale-105 active:scale-95',
        )}
      >
        <UserRoundCog className="w-7 h-7 ml-0.5 mr-[-0.5] text-white/90" />

        <span className="hidden md:group-hover:block mr-2">
          Settings
        </span>
      </button>

      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 z-40 mb-0 bg-black/60 backdrop-blur-sm transition-all overscroll-contain"
        />
      )}

      <div
        className={cn(
          'fixed z-50 border-zinc-800 bg-zinc-950 p-6 m-0 text-slate-200 shadow-2xl transition-transform duration-300 ease-in-out overscroll-contain',
          // Mobile
          'bottom-0 left-0 right-0 max-h-[90dvh] rounded-t-2xl border-t overflow-y-auto',
          // Desktop
          'md:top-0 md:right-0 md:left-auto md:h-full md:w-85 md:max-h-screen md:rounded-none md:rounded-l-2xl md:border-l md:border-t-0 md:translate-y-0',
          isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full',
        )}
      >
        <div>
          User Settings
        </div>
      </div>
    </>
  );
}
