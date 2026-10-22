'use client';

import { ReactNode, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

const subscribe = () => () => {};

function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function Portal({ children }: { children: ReactNode }) {
  const isHydrated = useIsHydrated();

  if (!isHydrated) return null;

  return createPortal(children, document.body);
}
