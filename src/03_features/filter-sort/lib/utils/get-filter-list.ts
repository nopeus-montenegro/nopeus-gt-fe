import { CarInclude } from '@/04_entities/car';
import { FilterList } from '../types';

export function getFilterList(cars: CarInclude[]): FilterList {
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
