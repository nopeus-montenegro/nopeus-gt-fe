'use client';

import { AddFavoritesButton, useFavoriteCarList } from '@/03_features/add-favorites';
import { Authorization } from '@/03_features/authorization';
import { CarCard, type CarInclude } from '@/04_entities/car';
import { useBodyScroll } from '@/05_shared/hooks/use-body-scroll';
import { MANUFACTURERS_PRELOAD } from '@/05_shared/lib/const';
import { useSession } from '@/05_shared/lib/mock-auth/hooks/use-session';
import { ModalDrawerControlled } from '@/05_shared/ui/modal-drawer/ui/modal-drawer-controlled';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useFilter } from '../hooks/use-filter';
import { useSort } from '../hooks/use-sort';

interface Props {
  cars: CarInclude[];
}

export function CarList({ cars }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScroll(isOpen);
  const toggleDrawer = () => setIsOpen(current => !current);
  const session = useSession();

  const filtered = useFilter(cars);
  const sorted = useSort(filtered);

  const { data: favorites = [] } = useFavoriteCarList();

  const groupedCars = sorted.reduce((acc, car) => {
    const brand = car.manufacturer;
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(car);
    return acc;
  }, {} as Record<string, CarInclude[]>);

  return (
    <>
      <ModalDrawerControlled
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      >
        {() => <Authorization />}
      </ModalDrawerControlled>

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
                  action={
                    session.status === 'authenticated'
                      ? (
                          <AddFavoritesButton
                            buttonIcon={(
                              <Bookmark
                                fill={favorites.includes(car.id)
                                  ? 'white'
                                  : 'transparent'}
                                className="w-5 h-5 text-white/90"
                              />
                            )}
                            isFavorite={favorites.includes(car.id)}
                            id={car.id}
                          />
                        )
                      : null
                  }
                />
              ))}
            </div>
          </section>
        ))
      }
    </>
  );
}
