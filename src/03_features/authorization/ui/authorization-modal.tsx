'use client';

import { UserRound, UserRoundCheck } from 'lucide-react';
import { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';

import { useSession } from '@/05_shared/lib/mock-auth/hooks/use-session';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { ModalDrawer } from '@/05_shared/ui/modal-drawer';
import { Authorization } from './authorization';

export function AuthorizationModal() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  if (pathname === '/user') {
    return null;
  }

  if (session.status === 'authenticated') {
    return (
      <button
        onClick={() => router.push('/user' as Route)}
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
        aria-label="User Dashboard"
      >
        <UserRoundCheck className="w-7 h-7 ml-0.5 mr-[-0.5] text-white/90" />

        <span className="hidden md:group-hover:block mr-2">
          {session.data?.user.name}
        </span>
      </button>
    );
  }

  return (
    <ModalDrawer
      buttonAria="Sign In"
      buttonIcon={<UserRound className="w-7 h-7 text-white/90" />}
      buttonText="Sign In"
    >
      {() => <Authorization />}
    </ModalDrawer>
  );
}
