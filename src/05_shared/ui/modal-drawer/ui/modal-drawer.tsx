import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { useState } from 'react';

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

      {isOpen && (
        <div
          onClick={toggleDrawer}
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
        {children({ toggleDrawer })}
      </div>
    </>
  );
}
