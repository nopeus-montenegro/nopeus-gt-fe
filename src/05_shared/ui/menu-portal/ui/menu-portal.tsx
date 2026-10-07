'use client';

import { PropsWithChildren, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  priority: number;
}

const subscribe = () => () => {};
const getSnapshot = () => document.getElementById('menu-dock');
const getServerSnapshot = () => null;

export function MenuPortal({ priority, children }: PropsWithChildren<Props>) {
  const dock = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!dock) return null;

  return createPortal(
    <div className="pointer-events-auto" style={{ order: priority }}>
      {children}
    </div>,
    dock,
  );
}
