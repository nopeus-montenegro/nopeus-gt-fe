'use client';

import { FAVORITE_TYPE } from '@/03_features/add-favorites/lib/const';
import { Authorization } from '@/03_features/authorization';
import { CarInclude, CarStickyHeader } from '@/04_entities/car';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal/ui/portal';
import { useState } from 'react';
import { HeaderAction } from './header-action';

interface Props {
  car: CarInclude;
}

export function CarHeader({ car }: Props) {
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

      <CarStickyHeader
        car={car}
        action={(
          <HeaderAction
            id={car.id}
            onUnauthenticated={() => setIsOpen(true)}
            favoriteType={FAVORITE_TYPE.CAR}
          />
        )}
      />
    </>
  );
}
