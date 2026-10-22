'use client';

import { Authorization } from '@/03_features/authorization';
import { CarCard, type CarInclude } from '@/04_entities/car';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { MANUFACTURERS_PRELOAD } from '@/05_shared/lib/const';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer';
import { Portal } from '@/05_shared/ui/portal';
import { useState } from 'react';
import { useFilter } from '../hooks/use-filter';
import { useSort } from '../hooks/use-sort';
import { CarCardAction } from './car-card-action';

interface Props {
  cars: CarInclude[];
}

export function CarList({ cars }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);

  const filtered = useFilter(cars);
  const sorted = useSort(filtered);

  const groupedCars = sorted.reduce((acc, car) => {
    const brand = car.manufacturer;
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(car);
    return acc;
  }, {} as Record<string, CarInclude[]>);

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

      {
        Object.entries(groupedCars).toSorted(([a], [b]) => a.localeCompare(b)).map(([manufacturer, carList], index) => (
          <section key={manufacturer} className="space-y-3">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">{manufacturer}</h2>
              <div className="h-px flex-1 bg-linear-to-r from-border/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {carList.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  preload={index < MANUFACTURERS_PRELOAD}
                  action={(
                    <CarCardAction
                      id={car.id}
                      onUnauthenticated={() => setIsOpen(true)}
                    />
                  )}
                />
              ))}
            </div>
          </section>
        ))
      }
    </>
  );
}
