import { CarInclude } from '@/04_entities/car';
import { Car } from '@prisma/client';
import { FilterList } from '../types';

export function getFilterList(cars: CarInclude[] | Car[]): FilterList {
  const mSet = new Set<string>();
  const cSet = new Set<string>();

  cars.forEach ((car) => {
    mSet.add(car.manufacturer);
    cSet.add(car.country);
  });

  return {
    manufacturers: [...mSet].sort(),
    countries: [...cSet].sort(),
  };
}
