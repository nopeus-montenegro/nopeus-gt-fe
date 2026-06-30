import { CAR_FILTER, CarInclude } from '@/04_entities/car';
import { useSearchParams } from 'next/navigation';

export function useFilter(cars: CarInclude[]) {
  const searchParams = useSearchParams();
  let filtered = [...cars];

  const manufacturer = searchParams.get(CAR_FILTER.MANUFACTURER)?.split(',') || [];
  const country = searchParams.get(CAR_FILTER.COUNTRY)?.split(',') || [];
  const carClass = searchParams.get(CAR_FILTER.CAR_CLASS)?.split(',') || [];
  const drivetrain = searchParams.get(CAR_FILTER.DRIVETRAIN)?.split(',') || [];
  const engineLayout = searchParams.get(CAR_FILTER.ENGINE_LAYOUT)?.split(',') || [];
  const aspiration = searchParams.get(CAR_FILTER.ASPIRATION)?.split(',') || [];
  const overtake = searchParams.get(CAR_FILTER.OVERTAKE)?.split(',') || [];
  const hybrid = searchParams.get(CAR_FILTER.HYBRID);

  if (manufacturer.length > 0) {
    filtered = filtered.filter(t => manufacturer.includes(t.manufacturer));
  }

  if (country.length > 0) {
    filtered = filtered.filter(t => country.includes(t.country));
  }

  if (carClass.length > 0) {
    filtered = filtered.filter(t => carClass.includes(t.class));
  }

  if (drivetrain.length > 0) {
    filtered = filtered.filter(t => drivetrain.includes(t.drivetrain));
  }

  if (engineLayout.length > 0) {
    filtered = filtered.filter(t => engineLayout.includes(t.engineLayout));
  }

  if (aspiration.length > 0) {
    filtered = filtered.filter(t => aspiration.includes(t.aspiration));
  }

  if (overtake.length > 0) {
    filtered = filtered.filter(t => overtake.includes(t.overtake));
  }

  if (hybrid !== null) {
    filtered = filtered.filter(t => String(t.isHybrid) === hybrid);
  }

  return filtered;
}
