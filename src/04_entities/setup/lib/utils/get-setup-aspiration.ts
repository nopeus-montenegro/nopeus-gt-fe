import { AspirationType } from '@prisma/client';
import { SetupInclude } from '../types';

export function getSetupAspiration(setup: SetupInclude): AspirationType {
  const hasTurbocharger = setup.turboType !== 'NONE';
  const hasSupercharger = setup.superchargerType !== 'NONE';
  const isEV = setup.car.aspiration === 'EV';

  if (isEV) return 'EV';
  if (hasTurbocharger && hasSupercharger) return 'TC_SC';
  if (hasTurbocharger) return 'TC';
  if (hasSupercharger) return 'SC';

  return 'NA';
};
