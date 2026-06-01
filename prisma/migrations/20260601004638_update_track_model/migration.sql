/*
  Warnings:

  - The values [MEDIUM_SPEED] on the enum `BopTrackClass` will be removed. If these variants are still used in the database, this will fail.
  - The values [FAST] on the enum `TrackClass` will be removed. If these variants are still used in the database, this will fail.
  - The values [EUROPE] on the enum `TrackRegion` will be removed. If these variants are still used in the database, this will fail.
  - The values [ASPHALT] on the enum `TrackSurface` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BopTrackClass_new" AS ENUM ('HIGH_SPEED', 'MID_SPEED', 'LOW_SPEED');
ALTER TABLE "Track" ALTER COLUMN "bopClass" TYPE "BopTrackClass_new" USING ("bopClass"::text::"BopTrackClass_new");
ALTER TYPE "BopTrackClass" RENAME TO "BopTrackClass_old";
ALTER TYPE "BopTrackClass_new" RENAME TO "BopTrackClass";
DROP TYPE "public"."BopTrackClass_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TrackClass_new" AS ENUM ('SPEED', 'TECHNICAL', 'HYBRID', 'RALLY');
ALTER TABLE "Track" ALTER COLUMN "trackClass" TYPE "TrackClass_new" USING ("trackClass"::text::"TrackClass_new");
ALTER TYPE "TrackClass" RENAME TO "TrackClass_old";
ALTER TYPE "TrackClass_new" RENAME TO "TrackClass";
DROP TYPE "public"."TrackClass_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TrackRegion_new" AS ENUM ('AMERICAS', 'EUROPE_MIDDLE_EAST', 'ASIA_OCEANIA');
ALTER TABLE "Track" ALTER COLUMN "region" TYPE "TrackRegion_new" USING ("region"::text::"TrackRegion_new");
ALTER TYPE "TrackRegion" RENAME TO "TrackRegion_old";
ALTER TYPE "TrackRegion_new" RENAME TO "TrackRegion";
DROP TYPE "public"."TrackRegion_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TrackSurface_new" AS ENUM ('TARMAC', 'DIRT', 'SNOW');
ALTER TABLE "Track" ALTER COLUMN "surface" TYPE "TrackSurface_new" USING ("surface"::text::"TrackSurface_new");
ALTER TYPE "TrackSurface" RENAME TO "TrackSurface_old";
ALTER TYPE "TrackSurface_new" RENAME TO "TrackSurface";
DROP TYPE "public"."TrackSurface_old";
COMMIT;

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "longestStraight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "elevationDiff" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "surface" SET NOT NULL,
ALTER COLUMN "surface" SET DATA TYPE "TrackSurface";
