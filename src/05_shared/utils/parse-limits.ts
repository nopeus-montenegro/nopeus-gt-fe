export const enum MAX_LIMITS {
  PP = 1500,
  POWER = 3000,
  TORQUE = 150,
  WEIGHT = 3500,
  WPR = 25,
}

export function parseLimits(min: string | string[] | null | undefined, max: string | string[] | null | undefined, maxLimits: MAX_LIMITS): [number, number] {
  const minNumber = Number(min instanceof Array ? min[0] : min);
  const maxNumber = Number(max instanceof Array ? max[0] : max);

  const parsedMin = min && !isNaN(minNumber)
    ? minNumber
    : 0;
  const parsedMax = max && !isNaN(maxNumber)
    ? maxNumber
    : maxLimits;

  return [parsedMin, parsedMax];
}
