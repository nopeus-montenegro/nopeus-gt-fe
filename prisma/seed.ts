import { AspirationType, BopTrackClass, CarClass, Drivetrain, EngineLayout, OvertakeType, PrismaClient, TrackClass, TrackRegion, TrackSurface } from '@/generated/prisma';
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
    engineType: car.engineType ? String(car.engineType).trim() : null,
    aspiration: String(car.aspiration).trim() as AspirationType,
    engineLayout: String(car.engineLayout).trim() as EngineLayout,
    isHybrid: String(car.isHybrid).toUpperCase() === 'TRUE',
    gearbox: parseInt(car.gearbox, 10),
    overtake: String(car.overtake).trim() as OvertakeType,
    length: parseInt(car.length, 10),
    width: parseInt(car.width, 10),
    height: parseInt(car.height, 10),
  }));

  const carsResult = await prisma.car.createMany({
    data: carsData,
    skipDuplicates: true,
  });
  console.log(`Cars loaded: ${carsResult.count} new records.`);

  console.log('Reading tracks data...');
  const rawTracks = parseCSV<RawTrackRow>('tracks.csv');
  const tracksData = rawTracks.map(track => ({
    name: String(track.name).trim(),
    configName: String(track.configName).trim(),
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
  }));

  const tracksResult = await prisma.track.createMany({
    data: tracksData,
    skipDuplicates: true,
  });
  console.log(`Tracks loaded: ${tracksResult.count} new configurations.`);

  // --- STAGE 2: Dealership Specs (isBase: true) ---
  console.log('Seeding dealership specs...');
  /*
  await prisma.setup.create({
    data: {
      title: 'Dealership Specs',
      isBase: true,
      authorId,
      car: { connect: { name_manufacturer_year: { name: 'GT3', manufacturer: 'AMG', year: 2020 } } },
      pp: 735.4,
      weight: 1320,
      power: 510,
      ...
    }
  });
  */

  // --- STAGE 3: Casino Templates & Lap Times (isBase: false) ---
  console.log('Seeding casino presets and linking to tracks...');
  /*
  const amgSpeedSetup = await prisma.setup.create({
    data: {
      title: 'NopeusGT High-Speed Casino',
      isBase: false,
      authorId,
      car: { connect: { name_manufacturer_year: { name: 'GT3', manufacturer: 'AMG', year: 2020 } } },
      ...
    }
  });

  await prisma.lapTime.create({
    data: {
      time: 0,
      setupId: amgSpeedSetup.id,
      authorId,
      track: { connect: { name_configName: { name: 'Autodromo Nazionale Monza', configName: 'No Chicane' } } }
    }
  });
  */

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
