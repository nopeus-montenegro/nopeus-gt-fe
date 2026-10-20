# Nopeus GT - Database & Data Models

This document provides a detailed breakdown of the database architecture for the Nopeus GT platform. The specification is structured to be completely open-source friendly and safe for public repositories.

## Tech Stack

- Database: PostgreSQL (the primary choice for both local development and production environments).

- ORM: Prisma (handles strict typing, automatic migration generation, and provides a type-safe client API for the TypeScript/Next.js ecosystem).

## Prisma Data Schema (schema.prisma)

To maximize filtering flexibility, simplify UI components, and maintain robust typing, the platform utilizes a comprehensive flat structure for the `Setup` table combined with relational fields. The core data models documented below represent the domain entities: `Car`, `Track`, `Setup`, and `LapTime`.

```prisma
model Car {
  id           String     @id @default(cuid())
  name         String     // ex. "296 GT3"
  manufacturer String     // ex. "Ferrari"
  country      String     // ex. "Italy"
  year         Int
  class        CarClass
  drivetrain   Drivetrain

  engineCode   String     // ex. "F163CE"
  displacement Int        // ex. "2992"
  engineType   String     // ex. "V6"
  aspiration   AspirationType
  engineLayout EngineLayout
  isHybrid     Boolean        @default(false)
  gearbox      Int        // gears count
  overtake     OvertakeType

  length Int
  width  Int
  height Int

  setups    Setup[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  favBy     User[]

  @@unique([name, manufacturer, year])
  @@index([class])
  @@index([manufacturer])
  @@index([drivetrain])
  @@index([engineLayout])
}
```

```prisma
model Track {
  id         String      @id @default(cuid())
  name       String      // ex. "Suzuka Circuit"
  configName String      // ex. "East Course"
  region     TrackRegion
  country    String

  length          Int     // meters
  longestStraight Float   // meters
  cornerCount     Int
  elevationDiff   Float

  surface    TrackSurface
  trackClass TrackClass
  bopClass   BopTrackClass
  hasRain    Boolean       @default(false)
  hasSophy   Boolean       @default(false)

  lapTimes  LapTime[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  favBy     User[]

  @@unique([name, configName])
  @@index([region])
  @@index([trackClass])
  @@index([bopClass])
}
```

```prisma
model Setup {
  id     String  @id @default(cuid())
  title  String
  isBase Boolean @default(false)

  carId    String
  car      Car       @relation(fields: [carId], references: [id], onDelete: Cascade)
  authorId String
  author   User      @relation("UserCreatedSetups", fields: [authorId], references: [id], onDelete: Cascade)
  lapTimes LapTime[]
  favBy    User[]    @relation("UserFavoriteSetups")

  // ==========================================
  // BASE PERFORMANCE / RESULTS
  // ==========================================
  pp                 Float // Performance Points
  power              Int   // BHP
  powerRpm           Int
  torque             Float // kgfm
  torqueRpm          Int
  weight             Int   // kg
  wpr                Float // Weight to Power Ratio
  weightBalanceFront Int
  weightBalanceRear  Int

  // ==========================================
  // WIDE BODY / SWAP
  // ==========================================
  hasWideBody        Boolean @default(false)
  swappedEngineModel String

  // GT Auto
  gtAutoFront CustomPartType
  gtAutoSide  CustomPartType
  gtAutoRear  CustomPartType
  gtAutoWing  CustomWingType

  // ==========================================
  // Tyres
  // ==========================================
  tyresFront TyreType
  tyresRear  TyreType

  // ==========================================
  // Suspension
  // ==========================================
  suspensionType      SuspensionType
  susBodyHeightFront  Int
  susBodyHeightRear   Int
  susAntiRollBarFront Int
  susAntiRollBarRear  Int
  susDampingCompFront Int
  susDampingCompRear  Int
  susDampingExpFront  Int
  susDampingExpRear   Int
  susNaturalFreqFront Float
  susNaturalFreqRear  Float
  susCamberFront      Float
  susCamberRear       Float
  susToeFront         Float
  susToeRear          Float

  // ==========================================
  // Differential Gear
  // ==========================================
  diffType            DifferentialType
  diffInitTorqueFront Int
  diffInitTorqueRear  Int
  diffAccelSensFront  Int
  diffAccelSensRear   Int
  diffBrakeSensFront  Int
  diffBrakeSensRear   Int

  // 4WD
  diffTorqueVectoring TorqueVectoringType
  diffTorqueFront     Int
  diffTorqueRear      Int

  // ==========================================
  // Aerodynamics
  // ==========================================
  aeroDownforceFront Int
  aeroDownforceRear  Int

  // ==========================================
  // ECU / Power Restrictor
  // ==========================================
  ecuType         EcuType
  ecuOutput       Int
  powerRestrictor Int

  // ==========================================
  // Performance Adjustment
  // ==========================================
  ballastWeight   Int
  ballastPosition Int

  // ==========================================
  // Transmission
  // ==========================================
  transmissionType  TransmissionType
  transTopSpeedAuto Int
  transFinalGear    Float
  transGearRatios   Float[]

  // ==========================================
  // Nitrous / Overtake
  // ==========================================
  nitro       NitroType
  nitroOutput Int

  // ==========================================
  // Supercharger / Turbo
  // ==========================================
  turboType        TurbochargerType
  antiLagType      AntiLagType
  intercoolerType  IntercoolerType
  superchargerType SuperchargerType

  // ==========================================
  // Intake & Exhaust
  // ==========================================
  airCleanerType      AirCleanerType
  silencerType        SilencerType
  exhaustManifoldType ExhaustManifoldType

  // ==========================================
  // Brakes
  // ==========================================
  brakeSystemType  BrakeSystemType
  brakePadsType    BrakePadsType
  handbrakeType    HandbrakeType
  handbrakeTorque  Int
  brakeBalanceType BrakeBalanceType
  brakeBalance     Int

  // ==========================================
  // Steering
  // ==========================================
  steeringAngleKit      SteeringAngleKitType
  fourWheelSteeringType FourWheelSteeringType
  rearSteeringAngle     Int

  // ==========================================
  // Drivetrain
  // ==========================================
  clutchFlywheelType ClutchFlywheelType
  propellerShaftType PropellerShaftType

  // ==========================================
  // Engine Tuning
  // ==========================================
  engineBoreUp           EngineUpgradeTier
  engineStrokeUp         EngineUpgradeTier
  engineBalanceTuning    EngineUpgradeTier
  enginePolishPorts      EngineUpgradeTier
  engineHighLiftCamshaft EngineUpgradeTier
  engineTitaniumRods     EngineUpgradeTier
  engineRacingCrank      EngineUpgradeTier
  engineHighCompPistons  EngineUpgradeTier

  // ==========================================
  // Bodywork
  // ==========================================
  weightReductionStage Int
  isBodyRigidity       Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([carId])
  @@index([authorId])
  // Composite natural key for fail-safe seeding / skipDuplicates
  // @@unique([carId, authorId, title, isBase])
}
```

```prisma
model LapTime {
  id       String  @id @default(cuid())
  lapTime  Int     // ms (0 = placeholder)
  videoUrl String
  isWet    Boolean @default(false)

  status VerificationStatus

  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  setupId String
  setup   Setup  @relation(fields: [setupId], references: [id], onDelete: Cascade)

  trackId String
  track   Track  @relation(fields: [trackId], references: [id], onDelete: Restrict)

  createdAt DateTime @default(now())

  @@index([setupId])
  @@index([trackId])
  @@index([authorId])
  @@index([lapTime])
  @@index([status])
  // Composite natural key for fail-safe seeding / skipDuplicates
  // @@unique([setupId, trackId, authorId])
}
```

## Relational Logic & Filtering Specs

Since each setup is directly tied to a specific physical car model, it remains completely autonomous. The relationship between `Setup` and `Track` is managed via a junction table called `LapTime` (a many-to-many relationship). This design solves two critical engineering challenges at once:

- **Zero Geometry Duplication**: A single, well-optimized car setup can be reused across multiple different tracks, creating new lap time records without duplicating complex suspension geometry and tuning data within the database.

- **Seamless Leaderboard Scalability**: In Phase 0, placeholder records are seeded with a zero `lapTime` value (`0`) and a `status` of `PENDING`, serving strictly as a logical bridge to query and display available setups within a specific track's UI. In subsequent phases, verified lap submissions transition this structure into fully ranked competitive leaderboards without any breaking schema changes.

## Indexing & Performance

To ensure low-latency database queries and prevent full table scans across catalog, filtering, and leaderboard views, the schema implements both single-column and composite indexes:

### Car Table
- `@@unique([name, manufacturer, year])`: Acts as a composite natural key, ensuring car model uniqueness and supporting idempotent imports during seeding.
- `@@index([class])`: Accelerates filtering by racing category (e.g., Gr.1, Gr.3, Gr.4, Gr.B, Road).
- `@@index([manufacturer])`: Speeds up catalog filtering by car brand.
- `@@index([drivetrain])`: Optimizes filtering by drivetrain layout (FWD, RWD, AWD).
- `@@index([engineLayout])`: Powers filtering by engine placement (Front, Mid, Rear).

### Track Table
- `@@unique([name, configName])`: Composite natural key guaranteeing configuration uniqueness (e.g., "Suzuka Circuit" + "East Course") for collision-free seeding.
- `@@index([region])`: Optimizes regional track discovery (Americas, Europe/Middle East, Asia/Oceania).
- `@@index([trackClass])`: Accelerates queries filtering tracks by characteristics (Speed, Technical, Hybrid, Rally).
- `@@index([bopClass])`: Speeds up filtering tracks categorized by BoP speed profiles (High Speed, Mid Speed, Low Speed).

### Setup Table
- `@@index([carId])`: Powers instant setup catalog rendering when a user navigates to a specific car's page.
- `@@index([authorId])`: Enables rapid filtering for user-created setups and profile dashboards.

### LapTime Table
- `@@index([setupId])`: Optimizes joins to retrieve all track lap times linked to a specific setup.
- `@@index([trackId])`: Enables fast lookup of all setups and lap times available for a given track layout.
- `@@index([authorId])`: Accelerates queries for user-submitted lap records.
- `@@index([lapTime])`: Facilitates sorted queries for leaderboard rankings.
- `@@index([status])`: Speeds up moderation queries filtering pending, verified, or rejected submissions.

---

### Hardening Seeding & Idempotency: Composite Natural Keys

> **Code Review Requirement**: Define composite natural keys (`@@unique`) within the `Setup` and `LapTime` schema definitions to enable fail-safe `skipDuplicates` processing during seeding scripts.

In Prisma with PostgreSQL, calling `createMany` with `skipDuplicates: true` or running idempotent seeding scripts requires unique constraints defined at the database level (`@unique` or `@@unique`). Relying solely on synthetic primary keys (`id String @id @default(cuid())`) causes repeated seed runs or concurrent imports to either create duplicate records with new CUIDs or fail with constraint collisions.

To ensure deterministic, fail-safe seeding scripts:

1. **`Setup` Composite Natural Key**:
   ```prisma
   @@unique([carId, authorId, title, isBase])
   ```
   Uniquely identifies a setup configuration by its target vehicle, creator, title, and baseline flag. This enables `prisma.setup.createMany({ data: setupsData, skipDuplicates: true })` in `prisma/seed.ts` to safely bypass already-seeded dealership and custom templates without duplication.

2. **`LapTime` Composite Natural Key**:
   ```prisma
   @@unique([setupId, trackId, authorId])
   ```
   Uniquely identifies track-setup association records per author, guaranteeing that placeholder records (`lapTime: 0`) and track links created during seeding scripts can execute safely with duplicate skipping.

