'use client';

import { SetupAction } from '@/02_widgets/setup-list';
import { Authorization } from '@/03_features/authorization';
import { SetupInclude } from '@/04_entities/setup';
import { getSetupAspiration } from '@/04_entities/setup/lib/utils/get-setup-aspiration';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { useState } from 'react';

interface Props {
  setup: SetupInclude;
}

export function SetupPageHeader({ setup }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

  return (
    <>
      <Portal>
        <ModalDrawerControlled
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
        >
          {() => <Authorization />}
        </ModalDrawerControlled>
      </Portal>

      <div className="flex items-center justify-between py-4 md:py-8 px-0.5 md:px-20">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          <div className="flex gap-2">
            {setup.title}

            <div className="z-20 flex items-center pr-4 mt-0">
              <SetupAction
                id={setup.id}
                onUnauthenticated={() => setIsOpen(true)}
              />
            </div>
          </div>

          <p className="text-sm text-zinc-400">
            {setup.car.manufacturer}
            {' '}
            {setup.car.name}
            {' '}
            {setup.car.year}
          </p>
        </h1>

        <div className="flex flex-row-reverse flex-wrap gap-2 items-stretch">
          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {setup.car.class !== 'ROAD' && `${CAR_CLASS[setup.car.class]} / `}
            {'PP '}
            {setup.pp.toFixed(2)}
          </Badge>

          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {setup.car.engineLayout}
            -ENGINE
          </Badge>

          {
            setup.car.isHybrid
            && (
              <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
                HYBRID
              </Badge>
            )
          }

          {
            setup.car.overtake !== 'NONE' && (
              <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
                {setup.car.overtake.replace('_', ' ')}
              </Badge>
            )
          }

          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {getSetupAspiration(setup)}
          </Badge>

          <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {setup.car.drivetrain}
          </Badge>
        </div>
      </div>
    </>
  );
}
