import { SetupUserInclude } from '@/04_entities/setup/lib/types';
import { CAR_SORT, SETUP_SORT, SORT_DIRECTION, SORT_TYPE } from '@/05_shared/lib/const';
import { useSearchParams } from 'next/navigation';

export function useSort(cars: SetupUserInclude[]) {
  const searchParams = useSearchParams();

  const sortDirection = searchParams.get(SORT_TYPE.DIRECTION) || SORT_DIRECTION.ASCENDING;
  const sortBy = searchParams.get(SORT_TYPE.DATA) || CAR_SORT.MANUFACTURER;

  const modifier = sortDirection === SORT_DIRECTION.ASCENDING ? 1 : -1;

  return cars.toSorted((a, b) => {
    switch (sortBy) {
      case SETUP_SORT.PP:
        return ((a.pp || 0) - (b.pp || 0)) * modifier;

      case SETUP_SORT.POWER:
        return ((a.power || 0) - (b.power || 0)) * modifier;

      case SETUP_SORT.TORQUE:
        return ((a.torque || 0) - (b.torque || 0)) * modifier;

      case SETUP_SORT.WEIGHT:
        return ((a.weight || 0) - (b.weight || 0)) * modifier;

      case SETUP_SORT.WPR:
        return ((a.wpr || 0) - (b.wpr || 0)) * modifier;

      case CAR_SORT.YEAR:
        return ((a.car.year || 0) - (b.car.year || 0)) * modifier;

      case CAR_SORT.DISPLACEMENT:
        return ((a.car.displacement || 0) - (b.car.displacement || 0)) * modifier;

      case CAR_SORT.GEARBOX:
        return ((a.car.gearbox || 0) - (b.car.gearbox || 0)) * modifier;

      case CAR_SORT.MANUFACTURER:
      default:
        return a.car.manufacturer.localeCompare(b.car.manufacturer) * modifier;
    }
  });
}
