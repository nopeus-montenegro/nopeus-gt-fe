import { AspirationType, Setup } from '@prisma/client';

export function getSetupAspiration(setup: Setup): AspirationType {
  const hasTurbocharger = setup.turboType !== 'NONE';
  const hasSupercharger = setup.superchargerType !== 'NONE';

  if (hasTurbocharger && hasSupercharger) return 'TC_SC';
  if (hasSupercharger) return 'SC';
  if (hasTurbocharger) return 'TC';

  return 'NONE';
};
