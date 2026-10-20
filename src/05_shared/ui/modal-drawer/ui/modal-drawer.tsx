import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { useState } from 'react';
import { ModalDrawerControlled } from './modal-drawer-controlled';

interface Props {
  buttonAria: string;
  buttonIcon: React.ReactNode;
  buttonText: string;
  children: (props: { toggleDrawer: () => void }) => React.ReactNode;
}

export function ModalDrawer({ children, buttonAria, buttonIcon, buttonText }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

  return (
    <>
      <button
        onClick={toggleDrawer}
        type="button"
        className={cn(
          'group flex items-center gap-2',
          'm-0 py-2 px-2',
          'rounded-full border border-secondary/5 bg-secondary/10',
          'text-sm font-medium text-slate-200/90',
          'shadow-xl backdrop-blur-md transition-transform',
          'hover:scale-105 active:scale-95',
        )}
        aria-label={buttonAria}
      >
        {buttonIcon}

        <span className="hidden md:group-hover:block mr-2">
          {buttonText}
        </span>
      </button>

      <ModalDrawerControlled
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      >
        {({ toggleDrawer }) => (
          children({ toggleDrawer })
        )}
      </ModalDrawerControlled>
    </>
  );
}
