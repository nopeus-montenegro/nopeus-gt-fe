export const enum MAX_LIMITS {
  PP = 1500,
  POWER = 3000,
  TORQUE = 150,
  WEIGHT = 3500,
  WPR = 5,
}

export function parseLimits(min: string | null, max: string | null, maxLimits: MAX_LIMITS): [number, number] {
  const parsedMin = min && !isNaN(Number(min)) ? Number(min) : 0;
  const parsedMax = max && !isNaN(Number(max)) ? Number(max) : maxLimits;

  return [parsedMin, parsedMax];
}
