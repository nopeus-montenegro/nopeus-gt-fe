import { cn } from '@/05_shared/lib/shadcn/utils';

interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
  children: (props: { toggleDrawer: () => void }) => React.ReactNode;
}

export function ModalDrawerControlled({ children, toggleDrawer, isOpen }: Props) {
  return (
    <>
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
