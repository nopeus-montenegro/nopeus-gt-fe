import { cache } from 'react';

import { CAR_FILTER, CAR_SORT, LAP_TIME_FILTER, LAP_TIME_SORT, SETUP_FILTER, SETUP_SORT, SORT_TYPE, TRACK_FILTER, TRACK_SORT } from '@/05_shared/lib/const';
import { prisma } from '@/05_shared/lib/prisma/db';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { MAX_LIMITS, parseLimits } from '@/05_shared/utils/parse-limits';
import { parsePrismaEnum } from '@/05_shared/utils/parse-prisma-enum';
import { AspirationType, BopTrackClass, CarClass, Drivetrain, EngineLayout, OvertakeType, Prisma, TrackClass, TrackRegion, TrackSurface, VerificationStatus } from '@prisma/client';
import { lapTimeCarInclude, lapTimeTrackInclude } from './config';

export const getLapTimeCar = cache(async function (trackId: string, searchParams: ResolvedPageSearchParams) {
  const [ppMinParsed, ppMaxParsed] = parseLimits(searchParams[SETUP_FILTER.PP_LIM_MIN], searchParams[SETUP_FILTER.PP_LIM_MAX], MAX_LIMITS.PP);
  const [powerMinParsed, powerMaxParsed] = parseLimits(searchParams[SETUP_FILTER.POWER_LIM_MIN], searchParams[SETUP_FILTER.POWER_LIM_MAX], MAX_LIMITS.POWER);
  const [torqueMinParsed, torqueMaxParsed] = parseLimits(searchParams[SETUP_FILTER.TORQUE_LIM_MIN], searchParams[SETUP_FILTER.TORQUE_LIM_MAX], MAX_LIMITS.TORQUE);
  const [weighMinParsed, weighMaxParsed] = parseLimits(searchParams[SETUP_FILTER.WEIGHT_LIM_MIN], searchParams[SETUP_FILTER.WEIGHT_LIM_MAX], MAX_LIMITS.WEIGHT);
  const [wprMinParsed, wprMaxParsed] = parseLimits(searchParams[SETUP_FILTER.WPR_LIM_MIN], searchParams[SETUP_FILTER.WPR_LIM_MAX], MAX_LIMITS.WPR);

  const where: Prisma.LapTimeWhereInput = {
    trackId,

    status: searchParams[LAP_TIME_FILTER.IS_VERIFIED] === 'true' ? VerificationStatus.VERIFIED : undefined,
    lapTime: searchParams[LAP_TIME_FILTER.HAS_TIME] === 'true' ? { not: 0 } : undefined,

    setup: {
      isBase: false,

      pp: (ppMinParsed > 0 || ppMaxParsed < MAX_LIMITS.PP) ? { gte: ppMinParsed, lte: ppMaxParsed } : undefined,
      power: (powerMinParsed > 0 || powerMaxParsed < MAX_LIMITS.POWER) ? { gte: powerMinParsed, lte: powerMaxParsed } : undefined,
      torque: (torqueMinParsed > 0 || torqueMaxParsed < MAX_LIMITS.TORQUE) ? { gte: torqueMinParsed, lte: torqueMaxParsed } : undefined,
      weight: (weighMinParsed > 0 || weighMaxParsed < MAX_LIMITS.WEIGHT) ? { gte: weighMinParsed, lte: weighMaxParsed } : undefined,
      wpr: (wprMinParsed > 0 || wprMaxParsed < MAX_LIMITS.WPR) ? { gte: wprMinParsed, lte: wprMaxParsed } : undefined,

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
    case CAR_SORT.NAME:
      orderBy = { setup: { car: { name: parsePrismaEnum(searchParams[SORT_TYPE.DIRECTION], Prisma.SortOrder) || 'asc' } } };
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
    })
  );
});

export const getLapTimeTrack = cache(async function (carId: string, searchParams: ResolvedPageSearchParams) {
  const [ppMinParsed, ppMaxParsed] = parseLimits(searchParams[SETUP_FILTER.PP_LIM_MIN], searchParams[SETUP_FILTER.PP_LIM_MAX], MAX_LIMITS.PP);
  const [powerMinParsed, powerMaxParsed] = parseLimits(searchParams[SETUP_FILTER.POWER_LIM_MIN], searchParams[SETUP_FILTER.POWER_LIM_MAX], MAX_LIMITS.POWER);
  const [torqueMinParsed, torqueMaxParsed] = parseLimits(searchParams[SETUP_FILTER.TORQUE_LIM_MIN], searchParams[SETUP_FILTER.TORQUE_LIM_MAX], MAX_LIMITS.TORQUE);
  const [weighMinParsed, weighMaxParsed] = parseLimits(searchParams[SETUP_FILTER.WEIGHT_LIM_MIN], searchParams[SETUP_FILTER.WEIGHT_LIM_MAX], MAX_LIMITS.WEIGHT);
  const [wprMinParsed, wprMaxParsed] = parseLimits(searchParams[SETUP_FILTER.WPR_LIM_MIN], searchParams[SETUP_FILTER.WPR_LIM_MAX], MAX_LIMITS.WPR);

  const where: Prisma.LapTimeWhereInput = {
    status: searchParams[LAP_TIME_FILTER.IS_VERIFIED] === 'true' ? VerificationStatus.VERIFIED : undefined,
    lapTime: searchParams[LAP_TIME_FILTER.HAS_TIME] === 'true' ? { not: 0 } : undefined,

    setup: {
      carId,
      isBase: false,

      pp: (ppMinParsed > 0 || ppMaxParsed < MAX_LIMITS.PP) ? { gte: ppMinParsed, lte: ppMaxParsed } : undefined,
      power: (powerMinParsed > 0 || powerMaxParsed < MAX_LIMITS.POWER) ? { gte: powerMinParsed, lte: powerMaxParsed } : undefined,
      torque: (torqueMinParsed > 0 || torqueMaxParsed < MAX_LIMITS.TORQUE) ? { gte: torqueMinParsed, lte: torqueMaxParsed } : undefined,
      weight: (weighMinParsed > 0 || weighMaxParsed < MAX_LIMITS.WEIGHT) ? { gte: weighMinParsed, lte: weighMaxParsed } : undefined,
      wpr: (wprMinParsed > 0 || wprMaxParsed < MAX_LIMITS.WPR) ? { gte: wprMinParsed, lte: wprMaxParsed } : undefined,
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
    })
  );
});
