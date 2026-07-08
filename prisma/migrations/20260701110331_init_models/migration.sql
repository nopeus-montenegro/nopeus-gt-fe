-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SetupDifficulty" AS ENUM ('SAFE', 'BALANCED', 'ALIEN');

-- CreateEnum
CREATE TYPE "CarClass" AS ENUM ('GR_1', 'GR_2', 'GR_3', 'GR_4', 'GR_B', 'ROAD');

-- CreateEnum
CREATE TYPE "TyreType" AS ENUM ('CH', 'CM', 'CS', 'SH', 'SM', 'SS', 'RH', 'RM', 'RS', 'IM', 'W', 'D', 'S');

-- CreateEnum
CREATE TYPE "AspirationType" AS ENUM ('NA', 'TC', 'SC', 'TC_SC', 'EV', 'NONE');

-- CreateEnum
CREATE TYPE "Drivetrain" AS ENUM ('FWD', 'RWD', 'AWD');

-- CreateEnum
CREATE TYPE "EngineLayout" AS ENUM ('FRONT', 'MID', 'REAR');

-- CreateEnum
CREATE TYPE "OvertakeType" AS ENUM ('NONE', 'ENGINE_BOOST', 'KERS', 'DRS');

-- CreateEnum
CREATE TYPE "NitroType" AS ENUM ('NONE', 'NORMAL', 'NITROUS');

-- CreateEnum
CREATE TYPE "TrackRegion" AS ENUM ('AMERICAS', 'EUROPE_MIDDLE_EAST', 'ASIA_OCEANIA');

-- CreateEnum
CREATE TYPE "TrackClass" AS ENUM ('SPEED', 'TECHNICAL', 'HYBRID', 'RALLY');

-- CreateEnum
CREATE TYPE "BopTrackClass" AS ENUM ('HIGH_SPEED', 'MID_SPEED', 'LOW_SPEED');

-- CreateEnum
CREATE TYPE "TrackSurface" AS ENUM ('TARMAC', 'DIRT', 'SNOW');

-- CreateEnum
CREATE TYPE "SuspensionType" AS ENUM ('NORMAL', 'STREET', 'SPORTS', 'HEIGHT_ADJUSTABLE_SPORTS', 'FULLY_CUSTOMISABLE');

-- CreateEnum
CREATE TYPE "DifferentialType" AS ENUM ('NORMAL', 'ONE_WAY_LSD', 'TWO_WAY_LSD', 'FULLY_CUSTOMISABLE');

-- CreateEnum
CREATE TYPE "TorqueVectoringType" AS ENUM ('NONE', 'NORMAL', 'TORQUE_VECTORING_CENTRE');

-- CreateEnum
CREATE TYPE "EcuType" AS ENUM ('NORMAL', 'SPORTS', 'FULLY_CUSTOMISABLE');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('NORMAL', 'CLOSE_RATIO_LOW', 'CLOSE_RATIO_HIGH', 'FULLY_CUSTOMISABLE_MANUAL', 'FULLY_CUSTOMISABLE_RACING');

-- CreateEnum
CREATE TYPE "TurbochargerType" AS ENUM ('NONE', 'NORMAL', 'LOW_RPM', 'MEDIUM_RPM', 'HIGH_RPM', 'ULTRA_HIGH_RPM');

-- CreateEnum
CREATE TYPE "AntiLagType" AS ENUM ('OFF', 'WEAK', 'STRONG');

-- CreateEnum
CREATE TYPE "IntercoolerType" AS ENUM ('NONE', 'NORMAL', 'SPORTS', 'RACING');

-- CreateEnum
CREATE TYPE "SuperchargerType" AS ENUM ('NONE', 'NORMAL', 'LOW_END_TORQUE', 'HIGH_END_TORQUE', 'HIGH_RPM');

-- CreateEnum
CREATE TYPE "AirCleanerType" AS ENUM ('NONE', 'NORMAL', 'SPORTS', 'RACING');

-- CreateEnum
CREATE TYPE "SilencerType" AS ENUM ('NORMAL', 'SPORTS', 'SEMI_RACING', 'RACING');

-- CreateEnum
CREATE TYPE "ExhaustManifoldType" AS ENUM ('NONE', 'NORMAL', 'RACING');

-- CreateEnum
CREATE TYPE "BrakeSystemType" AS ENUM ('NORMAL', 'SPORTS', 'RACING_SLOTTED', 'RACING_DRILLED', 'CARBON');

-- CreateEnum
CREATE TYPE "BrakePadsType" AS ENUM ('NORMAL', 'SPORTS', 'RACING');

-- CreateEnum
CREATE TYPE "HandbrakeType" AS ENUM ('NORMAL', 'HYDRAULIC');

-- CreateEnum
CREATE TYPE "BrakeBalanceType" AS ENUM ('NORMAL', 'CONTROLLER');

-- CreateEnum
CREATE TYPE "SteeringAngleKitType" AS ENUM ('NORMAL', 'ADAPTER');

-- CreateEnum
CREATE TYPE "FourWheelSteeringType" AS ENUM ('NONE', 'FOUR_WHEEL_STEERING');

-- CreateEnum
CREATE TYPE "ClutchFlywheelType" AS ENUM ('NORMAL', 'SPORTS', 'SEMI_RACING', 'RACING');

-- CreateEnum
CREATE TYPE "PropellerShaftType" AS ENUM ('NONE', 'NORMAL', 'CARBON');

-- CreateEnum
CREATE TYPE "EngineUpgradeTier" AS ENUM ('NONE', 'NORMAL', 'S');

-- CreateEnum
CREATE TYPE "CustomPartType" AS ENUM ('STANDARD', 'TYPE_A', 'TYPE_B', 'TYPE_C');

-- CreateEnum
CREATE TYPE "CustomWingType" AS ENUM ('STANDARD', 'WINGLESS', 'TYPE_A', 'TYPE_B', 'CUSTOM');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "class" "CarClass" NOT NULL,
    "drivetrain" "Drivetrain" NOT NULL,
    "engineCode" TEXT NOT NULL,
    "displacement" INTEGER NOT NULL,
    "engineType" TEXT NOT NULL,
    "aspiration" "AspirationType" NOT NULL,
    "engineLayout" "EngineLayout" NOT NULL,
    "isHybrid" BOOLEAN NOT NULL DEFAULT false,
    "gearbox" INTEGER NOT NULL,
    "overtake" "OvertakeType" NOT NULL,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isBase" BOOLEAN NOT NULL DEFAULT false,
    "carId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "pp" DOUBLE PRECISION NOT NULL,
    "power" INTEGER NOT NULL,
    "powerRpm" INTEGER NOT NULL,
    "torque" DOUBLE PRECISION NOT NULL,
    "torqueRpm" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "wpr" DOUBLE PRECISION NOT NULL,
    "weightBalanceFront" INTEGER NOT NULL,
    "weightBalanceRear" INTEGER NOT NULL,
    "hasWideBody" BOOLEAN NOT NULL DEFAULT false,
    "swappedEngineModel" TEXT NOT NULL,
    "gtAutoFront" "CustomPartType" NOT NULL,
    "gtAutoSide" "CustomPartType" NOT NULL,
    "gtAutoRear" "CustomPartType" NOT NULL,
    "gtAutoWing" "CustomWingType" NOT NULL,
    "tyresFront" "TyreType" NOT NULL,
    "tyresRear" "TyreType" NOT NULL,
    "suspensionType" "SuspensionType" NOT NULL,
    "susBodyHeightFront" INTEGER NOT NULL,
    "susBodyHeightRear" INTEGER NOT NULL,
    "susAntiRollBarFront" INTEGER NOT NULL,
    "susAntiRollBarRear" INTEGER NOT NULL,
    "susDampingCompFront" INTEGER NOT NULL,
    "susDampingCompRear" INTEGER NOT NULL,
    "susDampingExpFront" INTEGER NOT NULL,
    "susDampingExpRear" INTEGER NOT NULL,
    "susNaturalFreqFront" DOUBLE PRECISION NOT NULL,
    "susNaturalFreqRear" DOUBLE PRECISION NOT NULL,
    "susCamberFront" DOUBLE PRECISION NOT NULL,
    "susCamberRear" DOUBLE PRECISION NOT NULL,
    "susToeFront" DOUBLE PRECISION NOT NULL,
    "susToeRear" DOUBLE PRECISION NOT NULL,
    "diffType" "DifferentialType" NOT NULL,
    "diffInitTorqueFront" INTEGER NOT NULL,
    "diffInitTorqueRear" INTEGER NOT NULL,
    "diffAccelSensFront" INTEGER NOT NULL,
    "diffAccelSensRear" INTEGER NOT NULL,
    "diffBrakeSensFront" INTEGER NOT NULL,
    "diffBrakeSensRear" INTEGER NOT NULL,
    "diffTorqueVectoring" "TorqueVectoringType" NOT NULL,
    "diffTorqueFront" INTEGER NOT NULL,
    "diffTorqueRear" INTEGER NOT NULL,
    "aeroDownforceFront" INTEGER NOT NULL,
    "aeroDownforceRear" INTEGER NOT NULL,
    "ecuType" "EcuType" NOT NULL,
    "ecuOutput" INTEGER NOT NULL,
    "powerRestrictor" INTEGER NOT NULL,
    "ballastWeight" INTEGER NOT NULL,
    "ballastPosition" INTEGER NOT NULL,
    "transmissionType" "TransmissionType" NOT NULL,
    "transTopSpeedAuto" INTEGER NOT NULL,
    "transFinalGear" DOUBLE PRECISION NOT NULL,
    "transGearRatios" DOUBLE PRECISION[],
    "nitro" "NitroType" NOT NULL,
    "nitroOutput" INTEGER NOT NULL,
    "turboType" "TurbochargerType" NOT NULL,
    "antiLagType" "AntiLagType" NOT NULL,
    "intercoolerType" "IntercoolerType" NOT NULL,
    "superchargerType" "SuperchargerType" NOT NULL,
    "airCleanerType" "AirCleanerType" NOT NULL,
    "silencerType" "SilencerType" NOT NULL,
    "exhaustManifoldType" "ExhaustManifoldType" NOT NULL,
    "brakeSystemType" "BrakeSystemType" NOT NULL,
    "brakePadsType" "BrakePadsType" NOT NULL,
    "handbrakeType" "HandbrakeType" NOT NULL,
    "handbrakeTorque" INTEGER NOT NULL,
    "brakeBalanceType" "BrakeBalanceType" NOT NULL,
    "brakeBalance" INTEGER NOT NULL,
    "steeringAngleKit" "SteeringAngleKitType" NOT NULL,
    "fourWheelSteeringType" "FourWheelSteeringType" NOT NULL,
    "rearSteeringAngle" INTEGER NOT NULL,
    "clutchFlywheelType" "ClutchFlywheelType" NOT NULL,
    "propellerShaftType" "PropellerShaftType" NOT NULL,
    "engineBoreUp" "EngineUpgradeTier" NOT NULL,
    "engineStrokeUp" "EngineUpgradeTier" NOT NULL,
    "engineBalanceTuning" "EngineUpgradeTier" NOT NULL,
    "enginePolishPorts" "EngineUpgradeTier" NOT NULL,
    "engineHighLiftCamshaft" "EngineUpgradeTier" NOT NULL,
    "engineTitaniumRods" "EngineUpgradeTier" NOT NULL,
    "engineRacingCrank" "EngineUpgradeTier" NOT NULL,
    "engineHighCompPistons" "EngineUpgradeTier" NOT NULL,
    "weightReductionStage" INTEGER NOT NULL,
    "isBodyRigidity" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "configName" TEXT NOT NULL,
    "region" "TrackRegion" NOT NULL,
    "country" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "longestStraight" DOUBLE PRECISION NOT NULL,
    "cornerCount" INTEGER NOT NULL,
    "elevationDiff" DOUBLE PRECISION NOT NULL,
    "surface" "TrackSurface" NOT NULL,
    "trackClass" "TrackClass" NOT NULL,
    "bopClass" "BopTrackClass" NOT NULL,
    "hasRain" BOOLEAN NOT NULL DEFAULT false,
    "hasSophy" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LapTime" (
    "id" TEXT NOT NULL,
    "lapTime" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "isWet" BOOLEAN NOT NULL DEFAULT false,
    "status" "VerificationStatus" NOT NULL,
    "authorId" TEXT NOT NULL,
    "setupId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LapTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Car_class_idx" ON "Car"("class");

-- CreateIndex
CREATE INDEX "Car_manufacturer_idx" ON "Car"("manufacturer");

-- CreateIndex
CREATE INDEX "Car_drivetrain_idx" ON "Car"("drivetrain");

-- CreateIndex
CREATE INDEX "Car_engineLayout_idx" ON "Car"("engineLayout");

-- CreateIndex
CREATE UNIQUE INDEX "Car_name_manufacturer_year_key" ON "Car"("name", "manufacturer", "year");

-- CreateIndex
CREATE INDEX "Setup_carId_idx" ON "Setup"("carId");

-- CreateIndex
CREATE INDEX "Setup_authorId_idx" ON "Setup"("authorId");

-- CreateIndex
CREATE INDEX "Track_region_idx" ON "Track"("region");

-- CreateIndex
CREATE INDEX "Track_trackClass_idx" ON "Track"("trackClass");

-- CreateIndex
CREATE INDEX "Track_bopClass_idx" ON "Track"("bopClass");

-- CreateIndex
CREATE UNIQUE INDEX "Track_name_configName_key" ON "Track"("name", "configName");

-- CreateIndex
CREATE INDEX "LapTime_setupId_idx" ON "LapTime"("setupId");

-- CreateIndex
CREATE INDEX "LapTime_trackId_idx" ON "LapTime"("trackId");

-- CreateIndex
CREATE INDEX "LapTime_authorId_idx" ON "LapTime"("authorId");

-- CreateIndex
CREATE INDEX "LapTime_lapTime_idx" ON "LapTime"("lapTime");

-- CreateIndex
CREATE INDEX "LapTime_status_idx" ON "LapTime"("status");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Setup" ADD CONSTRAINT "Setup_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setup" ADD CONSTRAINT "Setup_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LapTime" ADD CONSTRAINT "LapTime_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LapTime" ADD CONSTRAINT "LapTime_setupId_fkey" FOREIGN KEY ("setupId") REFERENCES "Setup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LapTime" ADD CONSTRAINT "LapTime_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
