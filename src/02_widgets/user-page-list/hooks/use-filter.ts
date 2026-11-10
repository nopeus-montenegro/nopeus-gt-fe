import { SetupUserInclude } from '@/04_entities/setup/lib/types';
import { CAR_FILTER, SETUP_FILTER } from '@/05_shared/lib/const';
import { MAX_LIMITS, parseLimits } from '@/05_shared/utils/parse-limits';
import { useSearchParams } from 'next/navigation';

export function useFilter(setups: SetupUserInclude[]) {
  const searchParams = useSearchParams();
  let filtered = [...setups];

  const manufacturer = searchParams.get(CAR_FILTER.MANUFACTURER)?.split(',') || [];
  const country = searchParams.get(CAR_FILTER.COUNTRY)?.split(',') || [];
  const carClass = searchParams.get(CAR_FILTER.CAR_CLASS)?.split(',') || [];
  const drivetrain = searchParams.get(CAR_FILTER.DRIVETRAIN)?.split(',') || [];
  const engineLayout = searchParams.get(CAR_FILTER.ENGINE_LAYOUT)?.split(',') || [];
  const aspiration = searchParams.get(CAR_FILTER.ASPIRATION)?.split(',') || [];
  const overtake = searchParams.get(CAR_FILTER.OVERTAKE)?.split(',') || [];
  const hybrid = searchParams.get(CAR_FILTER.HYBRID);
  const [ppMinParsed, ppMaxParsed] = parseLimits(searchParams.get(SETUP_FILTER.PP_LIM_MIN), searchParams.get(SETUP_FILTER.PP_LIM_MAX), MAX_LIMITS.PP);
  const [powerMinParsed, powerMaxParsed] = parseLimits(searchParams.get(SETUP_FILTER.POWER_LIM_MIN), searchParams.get(SETUP_FILTER.POWER_LIM_MAX), MAX_LIMITS.POWER);
  const [torqueMinParsed, torqueMaxParsed] = parseLimits(searchParams.get(SETUP_FILTER.TORQUE_LIM_MIN), searchParams.get(SETUP_FILTER.TORQUE_LIM_MAX), MAX_LIMITS.TORQUE);
  const [weighMinParsed, weighMaxParsed] = parseLimits(searchParams.get(SETUP_FILTER.WEIGHT_LIM_MIN), searchParams.get(SETUP_FILTER.WEIGHT_LIM_MAX), MAX_LIMITS.WEIGHT);
  const [wprMinParsed, wprMaxParsed] = parseLimits(searchParams.get(SETUP_FILTER.WPR_LIM_MIN), searchParams.get(SETUP_FILTER.WPR_LIM_MAX), MAX_LIMITS.WPR);

  if (manufacturer.length > 0) {
    filtered = filtered.filter(t => manufacturer.includes(t.car.manufacturer));
  }

  if (country.length > 0) {
    filtered = filtered.filter(t => country.includes(t.car.country));
  }

  if (carClass.length > 0) {
    filtered = filtered.filter(t => carClass.includes(t.car.class));
  }

  if (drivetrain.length > 0) {
    filtered = filtered.filter(t => drivetrain.includes(t.car.drivetrain));
  }

  if (engineLayout.length > 0) {
    filtered = filtered.filter(t => engineLayout.includes(t.car.engineLayout));
  }

  if (aspiration.length > 0) {
    filtered = filtered.filter(t => aspiration.includes(t.car.aspiration));
  }

  if (overtake.length > 0) {
    filtered = filtered.filter(t => overtake.includes(t.car.overtake));
  }

  if (ppMinParsed > 0 || ppMaxParsed < MAX_LIMITS.PP) {
    filtered = filtered.filter(t => t.pp >= ppMinParsed && t.pp <= ppMaxParsed);
  }

  if (powerMinParsed > 0 || powerMaxParsed < MAX_LIMITS.POWER) {
    filtered = filtered.filter(t => t.power >= powerMinParsed && t.power <= powerMaxParsed);
  }

  if (torqueMinParsed > 0 || torqueMaxParsed < MAX_LIMITS.TORQUE) {
    filtered = filtered.filter(t => t.torque >= torqueMinParsed && t.torque <= torqueMaxParsed);
  }

  if (weighMinParsed > 0 || weighMaxParsed < MAX_LIMITS.WEIGHT) {
    filtered = filtered.filter(t => t.weight >= weighMinParsed && t.weight <= weighMaxParsed);
  }

  if (wprMinParsed > 0 || wprMaxParsed < MAX_LIMITS.WPR) {
    filtered = filtered.filter(t => t.wpr >= wprMinParsed && t.wpr <= wprMaxParsed);
  }

  if (hybrid !== null) {
    filtered = filtered.filter(t => String(t.car.isHybrid) === hybrid);
  }

  return filtered;
}
