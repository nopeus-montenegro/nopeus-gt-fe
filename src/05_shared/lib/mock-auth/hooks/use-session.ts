'use client';

import { MOCK_USER } from '../lib/const';
import { Session } from '../lib/types';

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

export function useSession() {
  const isAuthenticated = true; // Сопряжено с IS_DEV_AUTH

  const session: Session | null = isAuthenticated
    ? {
        user: MOCK_USER,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    : null;

  const status: SessionStatus = isAuthenticated ? 'authenticated' : 'unauthenticated';

  return {
    data: session,
    status,
    update: async () => {},
  };
}
