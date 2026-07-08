import { cache } from 'react';

import { CAR_FILTER, CAR_SORT, LAP_TIME_FILTER, LAP_TIME_SORT, SETUP_FILTER, SETUP_SORT, SORT_TYPE, TRACK_FILTER, TRACK_SORT } from '@/05_shared/lib/const';
import { prisma } from '@/05_shared/lib/prisma/db';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { MAX_LIMITS, parseLimits } from '@/05_shared/utils/parse-limits';
import { parsePrismaEnum } from '@/05_shared/utils/parse-prisma-enum';
import { AspirationType, BopTrackClass, CarClass, Drivetrain, EngineLayout, OvertakeType, Prisma, TrackClass, TrackRegion, TrackSurface, VerificationStatus } from '@prisma/client';
import { lapTimeCarInclude, lapTimeTrackInclude } from './config';

function getSetupLimits(searchParams: ResolvedPageSearchParams): Prisma.SetupWhereInput {
  const [ppMin, ppMax] = parseLimits(searchParams[SETUP_FILTER.PP_LIM_MIN], searchParams[SETUP_FILTER.PP_LIM_MAX], MAX_LIMITS.PP);
  const [powerMin, powerMax] = parseLimits(searchParams[SETUP_FILTER.POWER_LIM_MIN], searchParams[SETUP_FILTER.POWER_LIM_MAX], MAX_LIMITS.POWER);
  const [torqueMin, torqueMax] = parseLimits(searchParams[SETUP_FILTER.TORQUE_LIM_MIN], searchParams[SETUP_FILTER.TORQUE_LIM_MAX], MAX_LIMITS.TORQUE);
  const [weighMin, weighMax] = parseLimits(searchParams[SETUP_FILTER.WEIGHT_LIM_MIN], searchParams[SETUP_FILTER.WEIGHT_LIM_MAX], MAX_LIMITS.WEIGHT);
  const [wprMin, wprMax] = parseLimits(searchParams[SETUP_FILTER.WPR_LIM_MIN], searchParams[SETUP_FILTER.WPR_LIM_MAX], MAX_LIMITS.WPR);

  return {
    isBase: false,
    pp: (ppMin > 0 || ppMax < MAX_LIMITS.PP) ? { gte: ppMin, lte: ppMax } : undefined,
    power: (powerMin > 0 || powerMax < MAX_LIMITS.POWER) ? { gte: powerMin, lte: powerMax } : undefined,
    torque: (torqueMin > 0 || torqueMax < MAX_LIMITS.TORQUE) ? { gte: torqueMin, lte: torqueMax } : undefined,
    weight: (weighMin > 0 || weighMax < MAX_LIMITS.WEIGHT) ? { gte: weighMin, lte: weighMax } : undefined,
    wpr: (wprMin > 0 || wprMax < MAX_LIMITS.WPR) ? { gte: wprMin, lte: wprMax } : undefined,
  };
}

export const getLapTimeCar = cache(async function (trackId: string, searchParams: ResolvedPageSearchParams) {
  const LIMIT = 12;
  const currentPage = Number(searchParams.page) || 1;

  const where: Prisma.LapTimeWhereInput = {
    trackId,

    status: searchParams[LAP_TIME_FILTER.VERIFIED] === 'true' ? VerificationStatus.VERIFIED : undefined,
    lapTime: searchParams[LAP_TIME_FILTER.TIME] === 'true' ? { not: 0 } : undefined,

    setup: {
      ...getSetupLimits(searchParams),
      car: {
        class: parsePrismaEnum(searchParams[CAR_FILTER.CAR_CLASS], CarClass),
        drivetrain: parsePrismaEnum(searchParams[CAR_FILTER.DRIVETRAIN], Drivetrain),
        engineLayout: parsePrismaEnum(searchParams[CAR_FILTER.ENGINE_LAYOUT], EngineLayout),
        aspiration: parsePrismaEnum(searchParams[CAR_FILTER.ASPIRATION], AspirationType),
        overtake: parsePrismaEnum(searchParams[CAR_FILTER.OVERTAKE], OvertakeType),
        isHybrid: searchParams[CAR_FILTER.HYBRID] === 'true' ? true : undefined,
      },
    },
  };

  let orderBy: Prisma.LapTimeOrderByWithRelationInput;
  switch (searchParams[SORT_TYPE.DATA]) {
    case CAR_SORT.YEAR:
      orderBy = { setup: { car: { year: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } } };
      break;
    case CAR_SORT.DISPLACEMENT:
      orderBy = { setup: { car: { displacement: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } } };
      break;
    case CAR_SORT.GEARBOX:
      orderBy = { setup: { car: { gearbox: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } } };
      break;
    case SETUP_SORT.PP:
      orderBy = { setup: { pp: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } };
      break;
    case SETUP_SORT.POWER:
      orderBy = { setup: { power: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } };
      break;
    case SETUP_SORT.TORQUE:
      orderBy = { setup: { torque: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } };
      break;
    case SETUP_SORT.WEIGHT:
      orderBy = { setup: { weight: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } };
      break;
    case SETUP_SORT.WPR:
      orderBy = { setup: { wpr: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } };
      break;
    case LAP_TIME_SORT.LAP_TIME:
    default:
      orderBy = { lapTime: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' };
  };

  return (
    await prisma.lapTime.findMany({
      where,
      include: lapTimeCarInclude,
      distinct: ['setupId'],
      orderBy,
      take: LIMIT,
      skip: (currentPage - 1) * LIMIT,
    })
  );
});

export const getLapTimeTrack = cache(async function (carId: string, searchParams: ResolvedPageSearchParams) {
  const LIMIT = 12;
  const currentPage = Number(searchParams.page) || 1;

  const where: Prisma.LapTimeWhereInput = {
    status: searchParams[LAP_TIME_FILTER.VERIFIED] === 'true' ? VerificationStatus.VERIFIED : undefined,
    lapTime: searchParams[LAP_TIME_FILTER.TIME] === 'true' ? { not: 0 } : undefined,

    setup: {
      ...getSetupLimits(searchParams),
      carId,
    },

    track: {
      region: parsePrismaEnum(searchParams[TRACK_FILTER.REGION], TrackRegion),
      trackClass: parsePrismaEnum(searchParams[TRACK_FILTER.TRACK_CLASS], TrackClass),
      bopClass: parsePrismaEnum(searchParams[TRACK_FILTER.BOP], BopTrackClass),
      surface: parsePrismaEnum(searchParams[TRACK_FILTER.SURFACE], TrackSurface),
      hasRain: searchParams[TRACK_FILTER.RAIN] === 'true' ? true : undefined,
      hasSophy: searchParams[TRACK_FILTER.SOPHY] === 'true' ? true : undefined,
    },
  };

  let orderBy: Prisma.LapTimeOrderByWithRelationInput[];
  switch (searchParams[SORT_TYPE.DATA]) {
    case SETUP_SORT.PP:
      orderBy = [{ setup: { pp: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case SETUP_SORT.POWER:
      orderBy = [{ setup: { power: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case SETUP_SORT.TORQUE:
      orderBy = [{ setup: { torque: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case SETUP_SORT.WEIGHT:
      orderBy = [{ setup: { weight: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case SETUP_SORT.WPR:
      orderBy = [{ setup: { wpr: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case TRACK_SORT.LENGTH:
      orderBy = [{ track: { length: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case TRACK_SORT.CORNERS:
      orderBy = [{ track: { cornerCount: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case TRACK_SORT.STRAIGHT:
      orderBy = [{ track: { longestStraight: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case TRACK_SORT.ELEVATION:
      orderBy = [{ track: { elevationDiff: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
      break;
    case TRACK_SORT.NAME:
    default:
      orderBy = [{ track: { name: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } }, { lapTime: 'asc' }];
  };

  return (
    await prisma.lapTime.findMany({
      where,
      include: lapTimeTrackInclude,
      orderBy,
      distinct: ['setupId', 'trackId'],
      take: LIMIT,
      skip: (currentPage - 1) * LIMIT,
    })
  );
});
