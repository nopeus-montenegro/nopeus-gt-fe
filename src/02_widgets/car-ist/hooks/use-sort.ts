import { CAR_SORT, CarInclude } from '@/04_entities/car';
import { SETUP_SORT } from '@/04_entities/setup';
import { SORT_DIRECTION, SORT_TYPE } from '@/05_shared/lib/const';
import { useSearchParams } from 'next/navigation';

export function useSort(cars: CarInclude[]) {
  const searchParams = useSearchParams();

  const sortDirection = searchParams.get(SORT_TYPE.DIRECTION) || SORT_DIRECTION.ASCENDING;
  const sortBy = searchParams.get(SORT_TYPE.DATA) || CAR_SORT.NAME;

  const modifier = sortDirection === SORT_DIRECTION.ASCENDING ? 1 : -1;

  return cars.toSorted((a, b) => {
    switch (sortBy) {
      case SETUP_SORT.PP:
        return ((a.setups[0].pp || 0) - (b.setups[0].pp || 0)) * modifier;

      case SETUP_SORT.POWER:
        return ((a.setups[0].power || 0) - (b.setups[0].power || 0)) * modifier;

      case SETUP_SORT.TORQUE:
        return ((a.setups[0].torque || 0) - (b.setups[0].torque || 0)) * modifier;

      case SETUP_SORT.WEIGHT:
        return ((a.setups[0].weight || 0) - (b.setups[0].weight || 0)) * modifier;

      case SETUP_SORT.WPR:
        return ((a.setups[0].weight / a.setups[0].power || 0) - (b.setups[0].weight / b.setups[0].power || 0)) * modifier;

      case CAR_SORT.YEAR:
        return ((a.year || 0) - (b.year || 0)) * modifier;

      case CAR_SORT.DISPLACEMENT:
        return ((a.displacement || 0) - (b.displacement || 0)) * modifier;

      case CAR_SORT.GEARBOX:
        return ((a.gearbox || 0) - (b.gearbox || 0)) * modifier;

      case CAR_SORT.NAME:
      default:
        return a.name.localeCompare(b.name) * modifier;
    }
  });
}
