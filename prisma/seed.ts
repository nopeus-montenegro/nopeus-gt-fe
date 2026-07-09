import { AirCleanerType, AntiLagType, AspirationType, BopTrackClass, BrakeBalanceType, BrakePadsType, BrakeSystemType, CarClass, ClutchFlywheelType, CustomPartType, CustomWingType, DifferentialType, Drivetrain, EcuType, EngineLayout, EngineUpgradeTier, ExhaustManifoldType, FourWheelSteeringType, HandbrakeType, IntercoolerType, NitroType, OvertakeType, Prisma, PrismaClient, PropellerShaftType, SilencerType, SteeringAngleKitType, SuperchargerType, SuspensionType, TorqueVectoringType, TrackClass, TrackRegion, TrackSurface, TransmissionType, TurbochargerType, TyreType, VerificationStatus } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient({
  accelerateUrl: process.env.ACCELERATE_DATABASE_URL,
});

function parseCSV<T>(fileName: string): T[] {
  const filePath = path.join(__dirname, 'data', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return parse(fileContent, {
    columns: true, // Automatically uses the first row (headers) as keys
    skip_empty_lines: true,
    trim: true, // Cuts any unwanted whitespaces automatically
    bom: true, // Fixes hidden Excel encoding artifacts safely
  });
}

async function main() {
  console.log('Starting Nopeus GT database seeding...');

  const authorId = 'nopeus-gt';

  // --- STAGE 0: System User ---
  const systemUser = await prisma.user.upsert({
    where: { username: 'Nopeus GT' },
    update: {},
    create: {
      id: authorId,
      username: 'Nopeus GT',
      email: 'nopeus-gt@nopeus.gt',
    },
  });
  console.log(`System user ready: ${systemUser.username}`);

  // --- STAGE 1: Core Data (Cars & Tracks) ---
  console.log('Reading cars data...');
  const rawCars = parseCSV<RawCarRow>('cars.csv');
  const carsData = rawCars.map(car => ({
    name: String(car.name).trim(),
    manufacturer: String(car.manufacturer).trim(),
    country: String(car.country).trim(),
    year: parseInt(car.year, 10),
    class: String(car.class).trim() as CarClass,
    drivetrain: String(car.drivetrain).trim() as Drivetrain,
    engineCode: String(car.engineCode).trim(),
    displacement: car.displacement ? parseInt(car.displacement, 10) : 0,
    engineType: car.engineType ? String(car.engineType).trim() : '',
    aspiration: String(car.aspiration).trim() as AspirationType,
    engineLayout: String(car.engineLayout).trim() as EngineLayout,
    isHybrid: String(car.isHybrid).toUpperCase() === 'TRUE',
    gearbox: parseInt(car.gearbox, 10),
    overtake: String(car.overtake).trim() as OvertakeType,
    length: parseInt(car.length, 10),
    width: parseInt(car.width, 10),
    height: parseInt(car.height, 10),
  }));

  console.log(`Cars ready to upload: ${carsData.length}`);
  const carsResult = await prisma.car.createMany({
    data: carsData,
    skipDuplicates: true,
  });
  console.log(`Cars loaded: ${carsResult.count} new records.`);

  console.log('Reading tracks data...');
  const rawTracks = parseCSV<RawTrackRow>('tracks.csv');
  const tracksData = rawTracks.map(track => ({
    name: String(track.name).trim(),
    configName: track.configName ? String(track.configName).trim() : '',
    region: String(track.region).trim() as TrackRegion,
    country: String(track.country).trim(),
    length: parseInt(track.length),
    longestStraight: parseFloat(track.longestStraight),
    cornerCount: parseInt(track.cornerCount, 10),
    elevationDiff: parseFloat(track.elevationDiff),
    surface: String(track.surface).trim() as TrackSurface,
    trackClass: String(track.trackClass).trim() as TrackClass,
    bopClass: String(track.bopClass).trim() as BopTrackClass,
    hasRain: String(track.hasRain).toUpperCase() === 'TRUE',
    hasSophy: String(track.hasSophy).toUpperCase() === 'TRUE',
  }));

  console.log(`Tracks ready to upload: ${tracksData.length}`);
  const tracksResult = await prisma.track.createMany({
    data: tracksData,
    skipDuplicates: true,
  });
  console.log(`Tracks loaded: ${tracksResult.count} new configurations.`);

  // --- STAGE 2: Dealership Specs (isBase: true) ---
  console.log('Seeding dealership specs...');
  const rawBasicSetups = parseCSV<RawSetupRow>('basic_setups.csv');

  const cars = await prisma.car.findMany({
    select: { id: true, name: true, manufacturer: true, year: true },
  });

  const carMap = new Map<string, string>();
  cars.forEach((car) => {
    const key = `${car.manufacturer}|${car.name}|${car.year}`;
    carMap.set(key, car.id);
  });

  const setupsData = rawBasicSetups.map((basicSetup) => {
    const carKey = `${basicSetup.manufacturer}|${basicSetup.name}|${basicSetup.year}`;
    const carId = carMap.get(carKey);

    if (!carId) {
      throw new Error(`CRITICAL: Unable to find the car: ${carKey}. Seed data is corrupted!`);
    }

    return {
      title: String(basicSetup.title).trim(),
      isBase: String(basicSetup.isBase).toUpperCase() === 'TRUE',

      carId,
      authorId,

      pp: parseFloat(basicSetup.pp),
      power: parseInt(basicSetup.power, 10),
      powerRpm: parseInt(basicSetup.powerRpm, 10),
      torque: parseFloat(basicSetup.torque),
      torqueRpm: parseInt(basicSetup.torqueRpm, 10),
      weight: parseInt(basicSetup.weight, 10),
      wpr: parseFloat((parseInt(basicSetup.weight, 10) / parseInt(basicSetup.power, 10)).toFixed(2)),
      weightBalanceFront: parseInt(basicSetup.weightBalanceFront, 10),
      weightBalanceRear: parseInt(basicSetup.weightBalanceRear, 10),

      hasWideBody: String(basicSetup.hasWideBody).toUpperCase() === 'TRUE',
      swappedEngineModel: String(basicSetup.swappedEngineModel).trim(),

      gtAutoFront: String(basicSetup.gtAutoFront).trim() as CustomPartType,
      gtAutoSide: String(basicSetup.gtAutoSide).trim() as CustomPartType,
      gtAutoRear: String(basicSetup.gtAutoRear).trim() as CustomPartType,
      gtAutoWing: String(basicSetup.gtAutoWing).trim() as CustomWingType,

      tyresFront: String(basicSetup.tyresFront).trim() as TyreType,
      tyresRear: String(basicSetup.tyresRear).trim() as TyreType,

      suspensionType: String(basicSetup.suspensionType).trim() as SuspensionType,
      susBodyHeightFront: basicSetup.susBodyHeightFront ? parseInt(basicSetup.susBodyHeightFront, 10) : 0,
      susBodyHeightRear: basicSetup.susBodyHeightRear ? parseInt(basicSetup.susBodyHeightRear, 10) : 0,
      susAntiRollBarFront: parseInt(basicSetup.susAntiRollBarFront, 10),
      susAntiRollBarRear: parseInt(basicSetup.susAntiRollBarRear, 10),
      susDampingCompFront: parseInt(basicSetup.susDampingCompFront, 10),
      susDampingCompRear: parseInt(basicSetup.susDampingCompRear, 10),
      susDampingExpFront: parseInt(basicSetup.susDampingExpFront, 10),
      susDampingExpRear: parseInt(basicSetup.susDampingExpRear, 10),
      susNaturalFreqFront: basicSetup.susNaturalFreqFront ? parseFloat(basicSetup.susNaturalFreqFront) : 0,
      susNaturalFreqRear: basicSetup.susNaturalFreqRear ? parseFloat(basicSetup.susNaturalFreqRear) : 0,
      susCamberFront: basicSetup.susCamberFront ? parseFloat(basicSetup.susCamberFront) : 0,
      susCamberRear: basicSetup.susCamberRear ? parseFloat(basicSetup.susCamberRear) : 0,
      susToeFront: basicSetup.susToeFront ? parseFloat(basicSetup.susToeFront) : 0,
      susToeRear: basicSetup.susToeRear ? parseFloat(basicSetup.susToeRear) : 0,

      diffType: String(basicSetup.diffType).trim() as DifferentialType,
      diffInitTorqueFront: basicSetup.diffInitTorqueFront ? parseInt(basicSetup.diffInitTorqueFront, 10) : 0,
      diffInitTorqueRear: basicSetup.diffInitTorqueRear ? parseInt(basicSetup.diffInitTorqueRear, 10) : 0,
      diffAccelSensFront: basicSetup.diffAccelSensFront ? parseInt(basicSetup.diffAccelSensFront, 10) : 0,
      diffAccelSensRear: basicSetup.diffAccelSensRear ? parseInt(basicSetup.diffAccelSensRear, 10) : 0,
      diffBrakeSensFront: basicSetup.diffBrakeSensFront ? parseInt(basicSetup.diffBrakeSensFront, 10) : 0,
      diffBrakeSensRear: basicSetup.diffBrakeSensRear ? parseInt(basicSetup.diffBrakeSensRear, 10) : 0,

      diffTorqueVectoring: String(basicSetup.diffTorqueVectoring).trim() as TorqueVectoringType,
      diffTorqueFront: parseInt(basicSetup.diffTorqueFront, 10),
      diffTorqueRear: parseInt(basicSetup.diffTorqueRear, 10),

      aeroDownforceFront: basicSetup.aeroDownforceFront ? parseInt(basicSetup.aeroDownforceFront, 10) : 0,
      aeroDownforceRear: basicSetup.aeroDownforceRear ? parseInt(basicSetup.aeroDownforceRear, 10) : 0,

      ecuType: String(basicSetup.ecuType).trim() as EcuType,
      ecuOutput: parseInt(basicSetup.ecuOutput, 10),
      powerRestrictor: parseInt(basicSetup.powerRestrictor, 10),

      ballastWeight: parseInt(basicSetup.ballastWeight, 10),
      ballastPosition: parseInt(basicSetup.ballastPosition, 10),

      transmissionType: String(basicSetup.transmissionType).trim() as TransmissionType,
      transTopSpeedAuto: parseInt(basicSetup.transTopSpeedAuto, 10),
      transFinalGear: basicSetup.transFinalGear ? parseFloat(basicSetup.transFinalGear) : 0,
      transGearRatios: basicSetup.transGearRatios ? String(basicSetup.transGearRatios).trim().split(',').map(ratio => parseFloat(ratio)) : [],

      nitro: String(basicSetup.nitro).trim() as NitroType,
      nitroOutput: parseInt(basicSetup.nitroOutput, 10),

      turboType: String(basicSetup.turboType).trim() as TurbochargerType,
      antiLagType: String(basicSetup.antiLagType).trim() as AntiLagType,
      intercoolerType: String(basicSetup.intercoolerType).trim() as IntercoolerType,
      superchargerType: String(basicSetup.superchargerType).trim() as SuperchargerType,

      airCleanerType: String(basicSetup.airCleanerType).trim() as AirCleanerType,
      silencerType: String(basicSetup.silencerType).trim() as SilencerType,
      exhaustManifoldType: String(basicSetup.exhaustManifoldType).trim() as ExhaustManifoldType,

      brakeSystemType: String(basicSetup.brakeSystemType).trim() as BrakeSystemType,
      brakePadsType: String(basicSetup.brakePadsType).trim() as BrakePadsType,
      handbrakeType: String(basicSetup.handbrakeType).trim() as HandbrakeType,
      handbrakeTorque: parseInt(basicSetup.handbrakeTorque, 10),
      brakeBalanceType: String(basicSetup.brakeBalanceType).trim() as BrakeBalanceType,
      brakeBalance: parseInt(basicSetup.brakeBalance, 10),

      steeringAngleKit: String(basicSetup.steeringAngleKit).trim() as SteeringAngleKitType,
      fourWheelSteeringType: String(basicSetup.fourWheelSteeringType).trim() as FourWheelSteeringType,
      rearSteeringAngle: parseInt(basicSetup.rearSteeringAngle, 10),

      clutchFlywheelType: String(basicSetup.clutchFlywheelType).trim() as ClutchFlywheelType,
      propellerShaftType: String(basicSetup.propellerShaftType).trim() as PropellerShaftType,

      engineBoreUp: String(basicSetup.engineBoreUp).trim() as EngineUpgradeTier,
      engineStrokeUp: String(basicSetup.engineStrokeUp).trim() as EngineUpgradeTier,
      engineBalanceTuning: String(basicSetup.engineBalanceTuning).trim() as EngineUpgradeTier,
      enginePolishPorts: String(basicSetup.enginePolishPorts).trim() as EngineUpgradeTier,
      engineHighLiftCamshaft: String(basicSetup.engineHighLiftCamshaft).trim() as EngineUpgradeTier,
      engineTitaniumRods: String(basicSetup.engineTitaniumRods).trim() as EngineUpgradeTier,
      engineRacingCrank: String(basicSetup.engineRacingCrank).trim() as EngineUpgradeTier,
      engineHighCompPistons: String(basicSetup.engineHighCompPistons).trim() as EngineUpgradeTier,

      weightReductionStage: parseInt(basicSetup.weightReductionStage, 10),
      isBodyRigidity: String(basicSetup.isBodyRigidity).toUpperCase() === 'TRUE',
    };
  }).filter(setup => setup !== null);

  console.log(`Setups ready to upload: ${setupsData.length}`);
  const setupsResult = await prisma.setup.createMany({
    data: setupsData,
    skipDuplicates: true,
  });
  console.log(`Setups loaded: ${setupsResult.count} new specs.`);

  // --- STAGE 3: Casino Templates & Lap Times (isBase: false) ---
  let loadedCount = 0;
  let skippedCount = 0;

  console.log('Seeding Nopeus GT tech setups and linking to tech tracks by zero lap times...');
  const rawTechSetups = parseCSV<RawSetupRow>('tech_setups.csv');
  const techTracks = await prisma.track.findMany({ where: { trackClass: 'TECHNICAL' } });

  for (const techSetup of rawTechSetups) {
    try {
      const carKey = `${techSetup.manufacturer}|${techSetup.name}|${techSetup.year}`;
      const carId = carMap.get(carKey);

      if (!carId) {
        skippedCount++;
        throw new Error(`CRITICAL: Unable to find the car: ${carKey}. Seed data is corrupted!`);
      };

      await prisma.setup.create({
        data: {
          title: String(techSetup.title).trim(),
          isBase: String(techSetup.isBase).toUpperCase() === 'TRUE',

          carId,
          authorId,
          lapTimes: {
            create: techTracks.map(track => ({
              lapTime: 0,
              videoUrl: '',

              status: 'PENDING' as VerificationStatus,

              authorId,
              trackId: track.id,
            })),
          },

          pp: parseFloat(techSetup.pp),
          power: parseInt(techSetup.power, 10),
          powerRpm: parseInt(techSetup.powerRpm, 10),
          torque: parseFloat(techSetup.torque),
          torqueRpm: parseInt(techSetup.torqueRpm, 10),
          weight: parseInt(techSetup.weight, 10),
          wpr: parseFloat((parseInt(techSetup.weight, 10) / parseInt(techSetup.power, 10)).toFixed(2)),
          weightBalanceFront: parseInt(techSetup.weightBalanceFront, 10),
          weightBalanceRear: parseInt(techSetup.weightBalanceRear, 10),

          hasWideBody: String(techSetup.hasWideBody).toUpperCase() === 'TRUE',
          swappedEngineModel: String(techSetup.swappedEngineModel).trim(),

          gtAutoFront: String(techSetup.gtAutoFront).trim() as CustomPartType,
          gtAutoSide: String(techSetup.gtAutoSide).trim() as CustomPartType,
          gtAutoRear: String(techSetup.gtAutoRear).trim() as CustomPartType,
          gtAutoWing: String(techSetup.gtAutoWing).trim() as CustomWingType,

          tyresFront: String(techSetup.tyresFront).trim() as TyreType,
          tyresRear: String(techSetup.tyresRear).trim() as TyreType,

          suspensionType: String(techSetup.suspensionType).trim() as SuspensionType,
          susBodyHeightFront: techSetup.susBodyHeightFront ? parseInt(techSetup.susBodyHeightFront, 10) : 0,
          susBodyHeightRear: techSetup.susBodyHeightRear ? parseInt(techSetup.susBodyHeightRear, 10) : 0,
          susAntiRollBarFront: parseInt(techSetup.susAntiRollBarFront, 10),
          susAntiRollBarRear: parseInt(techSetup.susAntiRollBarRear, 10),
          susDampingCompFront: parseInt(techSetup.susDampingCompFront, 10),
          susDampingCompRear: parseInt(techSetup.susDampingCompRear, 10),
          susDampingExpFront: parseInt(techSetup.susDampingExpFront, 10),
          susDampingExpRear: parseInt(techSetup.susDampingExpRear, 10),
          susNaturalFreqFront: techSetup.susNaturalFreqFront ? parseFloat(techSetup.susNaturalFreqFront) : 0,
          susNaturalFreqRear: techSetup.susNaturalFreqRear ? parseFloat(techSetup.susNaturalFreqRear) : 0,
          susCamberFront: techSetup.susCamberFront ? parseFloat(techSetup.susCamberFront) : 0,
          susCamberRear: techSetup.susCamberRear ? parseFloat(techSetup.susCamberRear) : 0,
          susToeFront: techSetup.susToeFront ? parseFloat(techSetup.susToeFront) : 0,
          susToeRear: techSetup.susToeRear ? parseFloat(techSetup.susToeRear) : 0,

          diffType: String(techSetup.diffType).trim() as DifferentialType,
          diffInitTorqueFront: techSetup.diffInitTorqueFront ? parseInt(techSetup.diffInitTorqueFront, 10) : 0,
          diffInitTorqueRear: techSetup.diffInitTorqueRear ? parseInt(techSetup.diffInitTorqueRear, 10) : 0,
          diffAccelSensFront: techSetup.diffAccelSensFront ? parseInt(techSetup.diffAccelSensFront, 10) : 0,
          diffAccelSensRear: techSetup.diffAccelSensRear ? parseInt(techSetup.diffAccelSensRear, 10) : 0,
          diffBrakeSensFront: techSetup.diffBrakeSensFront ? parseInt(techSetup.diffBrakeSensFront, 10) : 0,
          diffBrakeSensRear: techSetup.diffBrakeSensRear ? parseInt(techSetup.diffBrakeSensRear, 10) : 0,

          diffTorqueVectoring: String(techSetup.diffTorqueVectoring).trim() as TorqueVectoringType,
          diffTorqueFront: parseInt(techSetup.diffTorqueFront, 10),
          diffTorqueRear: parseInt(techSetup.diffTorqueRear, 10),

          aeroDownforceFront: techSetup.aeroDownforceFront ? parseInt(techSetup.aeroDownforceFront, 10) : 0,
          aeroDownforceRear: techSetup.aeroDownforceRear ? parseInt(techSetup.aeroDownforceRear, 10) : 0,

          ecuType: String(techSetup.ecuType).trim() as EcuType,
          ecuOutput: parseInt(techSetup.ecuOutput, 10),
          powerRestrictor: parseInt(techSetup.powerRestrictor, 10),

          ballastWeight: parseInt(techSetup.ballastWeight, 10),
          ballastPosition: parseInt(techSetup.ballastPosition, 10),

          transmissionType: String(techSetup.transmissionType).trim() as TransmissionType,
          transTopSpeedAuto: parseInt(techSetup.transTopSpeedAuto, 10),
          transFinalGear: techSetup.transFinalGear ? parseFloat(techSetup.transFinalGear) : 0,
          transGearRatios: techSetup.transGearRatios ? String(techSetup.transGearRatios).trim().split(',').map(ratio => parseFloat(ratio)) : [],

          nitro: String(techSetup.nitro).trim() as NitroType,
          nitroOutput: parseInt(techSetup.nitroOutput, 10),

          turboType: String(techSetup.turboType).trim() as TurbochargerType,
          antiLagType: String(techSetup.antiLagType).trim() as AntiLagType,
          intercoolerType: String(techSetup.intercoolerType).trim() as IntercoolerType,
          superchargerType: String(techSetup.superchargerType).trim() as SuperchargerType,

          airCleanerType: String(techSetup.airCleanerType).trim() as AirCleanerType,
          silencerType: String(techSetup.silencerType).trim() as SilencerType,
          exhaustManifoldType: String(techSetup.exhaustManifoldType).trim() as ExhaustManifoldType,

          brakeSystemType: String(techSetup.brakeSystemType).trim() as BrakeSystemType,
          brakePadsType: String(techSetup.brakePadsType).trim() as BrakePadsType,
          handbrakeType: String(techSetup.handbrakeType).trim() as HandbrakeType,
          handbrakeTorque: parseInt(techSetup.handbrakeTorque, 10),
          brakeBalanceType: String(techSetup.brakeBalanceType).trim() as BrakeBalanceType,
          brakeBalance: parseInt(techSetup.brakeBalance, 10),

          steeringAngleKit: String(techSetup.steeringAngleKit).trim() as SteeringAngleKitType,
          fourWheelSteeringType: String(techSetup.fourWheelSteeringType).trim() as FourWheelSteeringType,
          rearSteeringAngle: parseInt(techSetup.rearSteeringAngle, 10),

          clutchFlywheelType: String(techSetup.clutchFlywheelType).trim() as ClutchFlywheelType,
          propellerShaftType: String(techSetup.propellerShaftType).trim() as PropellerShaftType,

          engineBoreUp: String(techSetup.engineBoreUp).trim() as EngineUpgradeTier,
          engineStrokeUp: String(techSetup.engineStrokeUp).trim() as EngineUpgradeTier,
          engineBalanceTuning: String(techSetup.engineBalanceTuning).trim() as EngineUpgradeTier,
          enginePolishPorts: String(techSetup.enginePolishPorts).trim() as EngineUpgradeTier,
          engineHighLiftCamshaft: String(techSetup.engineHighLiftCamshaft).trim() as EngineUpgradeTier,
          engineTitaniumRods: String(techSetup.engineTitaniumRods).trim() as EngineUpgradeTier,
          engineRacingCrank: String(techSetup.engineRacingCrank).trim() as EngineUpgradeTier,
          engineHighCompPistons: String(techSetup.engineHighCompPistons).trim() as EngineUpgradeTier,

          weightReductionStage: parseInt(techSetup.weightReductionStage, 10),
          isBodyRigidity: String(techSetup.isBodyRigidity).toUpperCase() === 'TRUE',
        },
      });

      loadedCount++;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          skippedCount++;
        } else {
          console.error(`Prisma error. Setup: "${techSetup.title}":`, error.message);
        }
      } else if (error instanceof Error) {
        console.error(`System error. Setup: "${techSetup.title}":`, error.message);
      } else {
        console.error(`Unknown error. Setup: "${techSetup.title}":`, error);
      }
    }
  }

  console.log(`Tech setups loaded: ${loadedCount} new specs.`);
  if (skippedCount > 0) {
    console.log(`Setups skipped (duplicates): ${skippedCount}.`);
  }

  console.log('Seeding Nopeus GT hybrid setups and linking to hybrid tracks by zero lap times...');
  const rawHybridSetups = parseCSV<RawSetupRow>('hybrid_setups.csv');
  const hybridTracks = await prisma.track.findMany({ where: { trackClass: 'HYBRID' } });

  for (const hybridSetup of rawHybridSetups) {
    try {
      const carKey = `${hybridSetup.manufacturer}|${hybridSetup.name}|${hybridSetup.year}`;
      const carId = carMap.get(carKey);

      if (!carId) {
        throw new Error(`CRITICAL: Unable to find the car: ${carKey}. Seed data is corrupted!`);
      };

      await prisma.setup.create({
        data: {
          title: String(hybridSetup.title).trim(),
          isBase: String(hybridSetup.isBase).toUpperCase() === 'TRUE',

          carId,
          authorId,
          lapTimes: {
            create: hybridTracks.map(track => ({
              lapTime: 0,
              videoUrl: '',

              status: 'PENDING' as VerificationStatus,

              authorId,
              trackId: track.id,
            })),
          },

          pp: parseFloat(hybridSetup.pp),
          power: parseInt(hybridSetup.power, 10),
          powerRpm: parseInt(hybridSetup.powerRpm, 10),
          torque: parseFloat(hybridSetup.torque),
          torqueRpm: parseInt(hybridSetup.torqueRpm, 10),
          weight: parseInt(hybridSetup.weight, 10),
          wpr: parseFloat((parseInt(hybridSetup.weight, 10) / parseInt(hybridSetup.power, 10)).toFixed(2)),
          weightBalanceFront: parseInt(hybridSetup.weightBalanceFront, 10),
          weightBalanceRear: parseInt(hybridSetup.weightBalanceRear, 10),

          hasWideBody: String(hybridSetup.hasWideBody).toUpperCase() === 'TRUE',
          swappedEngineModel: String(hybridSetup.swappedEngineModel).trim(),

          gtAutoFront: String(hybridSetup.gtAutoFront).trim() as CustomPartType,
          gtAutoSide: String(hybridSetup.gtAutoSide).trim() as CustomPartType,
          gtAutoRear: String(hybridSetup.gtAutoRear).trim() as CustomPartType,
          gtAutoWing: String(hybridSetup.gtAutoWing).trim() as CustomWingType,

          tyresFront: String(hybridSetup.tyresFront).trim() as TyreType,
          tyresRear: String(hybridSetup.tyresRear).trim() as TyreType,

          suspensionType: String(hybridSetup.suspensionType).trim() as SuspensionType,
          susBodyHeightFront: hybridSetup.susBodyHeightFront ? parseInt(hybridSetup.susBodyHeightFront, 10) : 0,
          susBodyHeightRear: hybridSetup.susBodyHeightRear ? parseInt(hybridSetup.susBodyHeightRear, 10) : 0,
          susAntiRollBarFront: parseInt(hybridSetup.susAntiRollBarFront, 10),
          susAntiRollBarRear: parseInt(hybridSetup.susAntiRollBarRear, 10),
          susDampingCompFront: parseInt(hybridSetup.susDampingCompFront, 10),
          susDampingCompRear: parseInt(hybridSetup.susDampingCompRear, 10),
          susDampingExpFront: parseInt(hybridSetup.susDampingExpFront, 10),
          susDampingExpRear: parseInt(hybridSetup.susDampingExpRear, 10),
          susNaturalFreqFront: hybridSetup.susNaturalFreqFront ? parseFloat(hybridSetup.susNaturalFreqFront) : 0,
          susNaturalFreqRear: hybridSetup.susNaturalFreqRear ? parseFloat(hybridSetup.susNaturalFreqRear) : 0,
          susCamberFront: hybridSetup.susCamberFront ? parseFloat(hybridSetup.susCamberFront) : 0,
          susCamberRear: hybridSetup.susCamberRear ? parseFloat(hybridSetup.susCamberRear) : 0,
          susToeFront: hybridSetup.susToeFront ? parseFloat(hybridSetup.susToeFront) : 0,
          susToeRear: hybridSetup.susToeRear ? parseFloat(hybridSetup.susToeRear) : 0,

          diffType: String(hybridSetup.diffType).trim() as DifferentialType,
          diffInitTorqueFront: hybridSetup.diffInitTorqueFront ? parseInt(hybridSetup.diffInitTorqueFront, 10) : 0,
          diffInitTorqueRear: hybridSetup.diffInitTorqueRear ? parseInt(hybridSetup.diffInitTorqueRear, 10) : 0,
          diffAccelSensFront: hybridSetup.diffAccelSensFront ? parseInt(hybridSetup.diffAccelSensFront, 10) : 0,
          diffAccelSensRear: hybridSetup.diffAccelSensRear ? parseInt(hybridSetup.diffAccelSensRear, 10) : 0,
          diffBrakeSensFront: hybridSetup.diffBrakeSensFront ? parseInt(hybridSetup.diffBrakeSensFront, 10) : 0,
          diffBrakeSensRear: hybridSetup.diffBrakeSensRear ? parseInt(hybridSetup.diffBrakeSensRear, 10) : 0,

          diffTorqueVectoring: String(hybridSetup.diffTorqueVectoring).trim() as TorqueVectoringType,
          diffTorqueFront: parseInt(hybridSetup.diffTorqueFront, 10),
          diffTorqueRear: parseInt(hybridSetup.diffTorqueRear, 10),

          aeroDownforceFront: hybridSetup.aeroDownforceFront ? parseInt(hybridSetup.aeroDownforceFront, 10) : 0,
          aeroDownforceRear: hybridSetup.aeroDownforceRear ? parseInt(hybridSetup.aeroDownforceRear, 10) : 0,

          ecuType: String(hybridSetup.ecuType).trim() as EcuType,
          ecuOutput: parseInt(hybridSetup.ecuOutput, 10),
          powerRestrictor: parseInt(hybridSetup.powerRestrictor, 10),

          ballastWeight: parseInt(hybridSetup.ballastWeight, 10),
          ballastPosition: parseInt(hybridSetup.ballastPosition, 10),

          transmissionType: String(hybridSetup.transmissionType).trim() as TransmissionType,
          transTopSpeedAuto: parseInt(hybridSetup.transTopSpeedAuto, 10),
          transFinalGear: hybridSetup.transFinalGear ? parseFloat(hybridSetup.transFinalGear) : 0,
          transGearRatios: hybridSetup.transGearRatios ? String(hybridSetup.transGearRatios).trim().split(',').map(ratio => parseFloat(ratio)) : [],

          nitro: String(hybridSetup.nitro).trim() as NitroType,
          nitroOutput: parseInt(hybridSetup.nitroOutput, 10),

          turboType: String(hybridSetup.turboType).trim() as TurbochargerType,
          antiLagType: String(hybridSetup.antiLagType).trim() as AntiLagType,
          intercoolerType: String(hybridSetup.intercoolerType).trim() as IntercoolerType,
          superchargerType: String(hybridSetup.superchargerType).trim() as SuperchargerType,

          airCleanerType: String(hybridSetup.airCleanerType).trim() as AirCleanerType,
          silencerType: String(hybridSetup.silencerType).trim() as SilencerType,
          exhaustManifoldType: String(hybridSetup.exhaustManifoldType).trim() as ExhaustManifoldType,

          brakeSystemType: String(hybridSetup.brakeSystemType).trim() as BrakeSystemType,
          brakePadsType: String(hybridSetup.brakePadsType).trim() as BrakePadsType,
          handbrakeType: String(hybridSetup.handbrakeType).trim() as HandbrakeType,
          handbrakeTorque: parseInt(hybridSetup.handbrakeTorque, 10),
          brakeBalanceType: String(hybridSetup.brakeBalanceType).trim() as BrakeBalanceType,
          brakeBalance: parseInt(hybridSetup.brakeBalance, 10),

          steeringAngleKit: String(hybridSetup.steeringAngleKit).trim() as SteeringAngleKitType,
          fourWheelSteeringType: String(hybridSetup.fourWheelSteeringType).trim() as FourWheelSteeringType,
          rearSteeringAngle: parseInt(hybridSetup.rearSteeringAngle, 10),

          clutchFlywheelType: String(hybridSetup.clutchFlywheelType).trim() as ClutchFlywheelType,
          propellerShaftType: String(hybridSetup.propellerShaftType).trim() as PropellerShaftType,

          engineBoreUp: String(hybridSetup.engineBoreUp).trim() as EngineUpgradeTier,
          engineStrokeUp: String(hybridSetup.engineStrokeUp).trim() as EngineUpgradeTier,
          engineBalanceTuning: String(hybridSetup.engineBalanceTuning).trim() as EngineUpgradeTier,
          enginePolishPorts: String(hybridSetup.enginePolishPorts).trim() as EngineUpgradeTier,
          engineHighLiftCamshaft: String(hybridSetup.engineHighLiftCamshaft).trim() as EngineUpgradeTier,
          engineTitaniumRods: String(hybridSetup.engineTitaniumRods).trim() as EngineUpgradeTier,
          engineRacingCrank: String(hybridSetup.engineRacingCrank).trim() as EngineUpgradeTier,
          engineHighCompPistons: String(hybridSetup.engineHighCompPistons).trim() as EngineUpgradeTier,

          weightReductionStage: parseInt(hybridSetup.weightReductionStage, 10),
          isBodyRigidity: String(hybridSetup.isBodyRigidity).toUpperCase() === 'TRUE',
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          skippedCount++;
        } else {
          console.error(`Prisma error. Setup: "${hybridSetup.title}":`, error.message);
        }
      } else if (error instanceof Error) {
        console.error(`System error. Setup: "${hybridSetup.title}":`, error.message);
      } else {
        console.error(`Unknown error. Setup: "${hybridSetup.title}":`, error);
      }
    }
  }

  console.log(`Hybrid setups loaded: ${loadedCount} new specs.`);
  if (skippedCount > 0) {
    console.log(`Setups skipped (duplicates): ${skippedCount}.`);
  }

  console.log('Seeding Nopeus GT speed setups and linking to speed tracks by zero lap times...');
  const rawSpeedSetups = parseCSV<RawSetupRow>('speed_setups.csv');
  const speedTracks = await prisma.track.findMany({ where: { trackClass: 'SPEED' } });

  for (const speedSetup of rawSpeedSetups) {
    try {
      const carKey = `${speedSetup.manufacturer}|${speedSetup.name}|${speedSetup.year}`;
      const carId = carMap.get(carKey);

      if (!carId) {
        throw new Error(`CRITICAL: Unable to find the car: ${carKey}. Seed data is corrupted!`);
      };

      await prisma.setup.create({
        data: {
          title: String(speedSetup.title).trim(),
          isBase: String(speedSetup.isBase).toUpperCase() === 'TRUE',

          carId,
          authorId,
          lapTimes: {
            create: speedTracks.map(track => ({
              lapTime: 0,
              videoUrl: '',

              status: 'PENDING' as VerificationStatus,

              authorId,
              trackId: track.id,
            })),
          },

          pp: parseFloat(speedSetup.pp),
          power: parseInt(speedSetup.power, 10),
          powerRpm: parseInt(speedSetup.powerRpm, 10),
          torque: parseFloat(speedSetup.torque),
          torqueRpm: parseInt(speedSetup.torqueRpm, 10),
          weight: parseInt(speedSetup.weight, 10),
          wpr: parseFloat((parseInt(speedSetup.weight, 10) / parseInt(speedSetup.power, 10)).toFixed(2)),
          weightBalanceFront: parseInt(speedSetup.weightBalanceFront, 10),
          weightBalanceRear: parseInt(speedSetup.weightBalanceRear, 10),

          hasWideBody: String(speedSetup.hasWideBody).toUpperCase() === 'TRUE',
          swappedEngineModel: String(speedSetup.swappedEngineModel).trim(),

          gtAutoFront: String(speedSetup.gtAutoFront).trim() as CustomPartType,
          gtAutoSide: String(speedSetup.gtAutoSide).trim() as CustomPartType,
          gtAutoRear: String(speedSetup.gtAutoRear).trim() as CustomPartType,
          gtAutoWing: String(speedSetup.gtAutoWing).trim() as CustomWingType,

          tyresFront: String(speedSetup.tyresFront).trim() as TyreType,
          tyresRear: String(speedSetup.tyresRear).trim() as TyreType,

          suspensionType: String(speedSetup.suspensionType).trim() as SuspensionType,
          susBodyHeightFront: speedSetup.susBodyHeightFront ? parseInt(speedSetup.susBodyHeightFront, 10) : 0,
          susBodyHeightRear: speedSetup.susBodyHeightRear ? parseInt(speedSetup.susBodyHeightRear, 10) : 0,
          susAntiRollBarFront: parseInt(speedSetup.susAntiRollBarFront, 10),
          susAntiRollBarRear: parseInt(speedSetup.susAntiRollBarRear, 10),
          susDampingCompFront: parseInt(speedSetup.susDampingCompFront, 10),
          susDampingCompRear: parseInt(speedSetup.susDampingCompRear, 10),
          susDampingExpFront: parseInt(speedSetup.susDampingExpFront, 10),
          susDampingExpRear: parseInt(speedSetup.susDampingExpRear, 10),
          susNaturalFreqFront: speedSetup.susNaturalFreqFront ? parseFloat(speedSetup.susNaturalFreqFront) : 0,
          susNaturalFreqRear: speedSetup.susNaturalFreqRear ? parseFloat(speedSetup.susNaturalFreqRear) : 0,
          susCamberFront: speedSetup.susCamberFront ? parseFloat(speedSetup.susCamberFront) : 0,
          susCamberRear: speedSetup.susCamberRear ? parseFloat(speedSetup.susCamberRear) : 0,
          susToeFront: speedSetup.susToeFront ? parseFloat(speedSetup.susToeFront) : 0,
          susToeRear: speedSetup.susToeRear ? parseFloat(speedSetup.susToeRear) : 0,

          diffType: String(speedSetup.diffType).trim() as DifferentialType,
          diffInitTorqueFront: speedSetup.diffInitTorqueFront ? parseInt(speedSetup.diffInitTorqueFront, 10) : 0,
          diffInitTorqueRear: speedSetup.diffInitTorqueRear ? parseInt(speedSetup.diffInitTorqueRear, 10) : 0,
          diffAccelSensFront: speedSetup.diffAccelSensFront ? parseInt(speedSetup.diffAccelSensFront, 10) : 0,
          diffAccelSensRear: speedSetup.diffAccelSensRear ? parseInt(speedSetup.diffAccelSensRear, 10) : 0,
          diffBrakeSensFront: speedSetup.diffBrakeSensFront ? parseInt(speedSetup.diffBrakeSensFront, 10) : 0,
          diffBrakeSensRear: speedSetup.diffBrakeSensRear ? parseInt(speedSetup.diffBrakeSensRear, 10) : 0,

          diffTorqueVectoring: String(speedSetup.diffTorqueVectoring).trim() as TorqueVectoringType,
          diffTorqueFront: parseInt(speedSetup.diffTorqueFront, 10),
          diffTorqueRear: parseInt(speedSetup.diffTorqueRear, 10),

          aeroDownforceFront: speedSetup.aeroDownforceFront ? parseInt(speedSetup.aeroDownforceFront, 10) : 0,
          aeroDownforceRear: speedSetup.aeroDownforceRear ? parseInt(speedSetup.aeroDownforceRear, 10) : 0,

          ecuType: String(speedSetup.ecuType).trim() as EcuType,
          ecuOutput: parseInt(speedSetup.ecuOutput, 10),
          powerRestrictor: parseInt(speedSetup.powerRestrictor, 10),

          ballastWeight: parseInt(speedSetup.ballastWeight, 10),
          ballastPosition: parseInt(speedSetup.ballastPosition, 10),

          transmissionType: String(speedSetup.transmissionType).trim() as TransmissionType,
          transTopSpeedAuto: parseInt(speedSetup.transTopSpeedAuto, 10),
          transFinalGear: speedSetup.transFinalGear ? parseFloat(speedSetup.transFinalGear) : 0,
          transGearRatios: speedSetup.transGearRatios ? String(speedSetup.transGearRatios).trim().split(',').map(ratio => parseFloat(ratio)) : [],

          nitro: String(speedSetup.nitro).trim() as NitroType,
          nitroOutput: parseInt(speedSetup.nitroOutput, 10),

          turboType: String(speedSetup.turboType).trim() as TurbochargerType,
          antiLagType: String(speedSetup.antiLagType).trim() as AntiLagType,
          intercoolerType: String(speedSetup.intercoolerType).trim() as IntercoolerType,
          superchargerType: String(speedSetup.superchargerType).trim() as SuperchargerType,

          airCleanerType: String(speedSetup.airCleanerType).trim() as AirCleanerType,
          silencerType: String(speedSetup.silencerType).trim() as SilencerType,
          exhaustManifoldType: String(speedSetup.exhaustManifoldType).trim() as ExhaustManifoldType,

          brakeSystemType: String(speedSetup.brakeSystemType).trim() as BrakeSystemType,
          brakePadsType: String(speedSetup.brakePadsType).trim() as BrakePadsType,
          handbrakeType: String(speedSetup.handbrakeType).trim() as HandbrakeType,
          handbrakeTorque: parseInt(speedSetup.handbrakeTorque, 10),
          brakeBalanceType: String(speedSetup.brakeBalanceType).trim() as BrakeBalanceType,
          brakeBalance: parseInt(speedSetup.brakeBalance, 10),

          steeringAngleKit: String(speedSetup.steeringAngleKit).trim() as SteeringAngleKitType,
          fourWheelSteeringType: String(speedSetup.fourWheelSteeringType).trim() as FourWheelSteeringType,
          rearSteeringAngle: parseInt(speedSetup.rearSteeringAngle, 10),

          clutchFlywheelType: String(speedSetup.clutchFlywheelType).trim() as ClutchFlywheelType,
          propellerShaftType: String(speedSetup.propellerShaftType).trim() as PropellerShaftType,

          engineBoreUp: String(speedSetup.engineBoreUp).trim() as EngineUpgradeTier,
          engineStrokeUp: String(speedSetup.engineStrokeUp).trim() as EngineUpgradeTier,
          engineBalanceTuning: String(speedSetup.engineBalanceTuning).trim() as EngineUpgradeTier,
          enginePolishPorts: String(speedSetup.enginePolishPorts).trim() as EngineUpgradeTier,
          engineHighLiftCamshaft: String(speedSetup.engineHighLiftCamshaft).trim() as EngineUpgradeTier,
          engineTitaniumRods: String(speedSetup.engineTitaniumRods).trim() as EngineUpgradeTier,
          engineRacingCrank: String(speedSetup.engineRacingCrank).trim() as EngineUpgradeTier,
          engineHighCompPistons: String(speedSetup.engineHighCompPistons).trim() as EngineUpgradeTier,

          weightReductionStage: parseInt(speedSetup.weightReductionStage, 10),
          isBodyRigidity: String(speedSetup.isBodyRigidity).toUpperCase() === 'TRUE',
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          skippedCount++;
        } else {
          console.error(`Prisma error. Setup: "${speedSetup.title}":`, error.message);
        }
      } else if (error instanceof Error) {
        console.error(`System error. Setup: "${speedSetup.title}":`, error.message);
      } else {
        console.error(`Unknown error. Setup: "${speedSetup.title}":`, error);
      }
    }
  }

  console.log(`Speed setups loaded: ${loadedCount} new specs.`);
  if (skippedCount > 0) {
    console.log(`Setups skipped (duplicates): ${skippedCount}.`);
  }

  console.log('Database successfully initialized with all stages!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

interface RawCarRow {
  name: string;
  manufacturer: string;
  country: string;
  year: string;
  class: string;
  drivetrain: string;
  engineCode: string;
  displacement?: string;
  engineType?: string;
  aspiration: string;
  engineLayout?: string;
  isHybrid: string;
  gearbox: string;
  overtake: string;
  length: string;
  width: string;
  height: string;
}

interface RawTrackRow {
  name: string;
  configName?: string;
  region: string;
  country: string;
  length: string;
  longestStraight: string;
  cornerCount: string;
  elevationDiff: string;
  surface: string;
  class: string;
  trackClass: string;
  bopClass: string;
  hasRain: string;
  hasSophy: string;
}

interface RawSetupRow {
  manufacturer: string;
  name: string;
  year: string;

  title: string;
  isBase: string;

  pp: string;
  power: string;
  powerRpm: string;
  torque: string;
  torqueRpm: string;
  weight: string;
  weightBalanceFront: string;
  weightBalanceRear: string;

  hasWideBody: string;
  swappedEngineModel: string;

  gtAutoFront: string;
  gtAutoSide: string;
  gtAutoRear: string;
  gtAutoWing: string;

  tyresFront: string;
  tyresRear: string;

  suspensionType: string;
  susBodyHeightFront: string;
  susBodyHeightRear: string;
  susAntiRollBarFront: string;
  susAntiRollBarRear: string;
  susDampingCompFront: string;
  susDampingCompRear: string;
  susDampingExpFront: string;
  susDampingExpRear: string;
  susNaturalFreqFront: string;
  susNaturalFreqRear: string;
  susCamberFront: string;
  susCamberRear: string;
  susToeFront: string;
  susToeRear: string;

  diffType: string;
  diffInitTorqueFront: string;
  diffInitTorqueRear: string;
  diffAccelSensFront: string;
  diffAccelSensRear: string;
  diffBrakeSensFront: string;
  diffBrakeSensRear: string;

  diffTorqueVectoring: string;
  diffTorqueFront: string;
  diffTorqueRear: string;

  aeroDownforceFront: string;
  aeroDownforceRear: string;

  ecuType: string;
  ecuOutput: string;
  powerRestrictor: string;

  ballastWeight: string;
  ballastPosition: string;

  transmissionType: string;
  transTopSpeedAuto: string;
  transFinalGear: string;
  transGearRatios: string;

  nitro: string;
  nitroOutput: string;

  turboType: string;
  antiLagType: string;
  intercoolerType: string;
  superchargerType: string;

  airCleanerType: string;
  silencerType: string;
  exhaustManifoldType: string;

  brakeSystemType: string;
  brakePadsType: string;
  handbrakeType: string;
  handbrakeTorque: string;
  brakeBalanceType: string;
  brakeBalance: string;

  steeringAngleKit: string;
  fourWheelSteeringType: string;
  rearSteeringAngle: string;

  clutchFlywheelType: string;
  propellerShaftType: string;

  engineBoreUp: string;
  engineStrokeUp: string;
  engineBalanceTuning: string;
  enginePolishPorts: string;
  engineHighLiftCamshaft: string;
  engineTitaniumRods: string;
  engineRacingCrank: string;
  engineHighCompPistons: string;

  weightReductionStage: string;
  isBodyRigidity: string;
}
