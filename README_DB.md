# Nopeus GT — Database & Data Models

This document provides a detailed breakdown of the database architecture for the NopeusGT platform during Phase 0. The specification is structured to be completely open-source friendly and safe for public repositories.

## Tech Stack

- Database: PostgreSQL (the primary choice for both local development and production environments).

- ORM: Prisma (handles strict typing, automatic migration generation, and provides a type-safe client API for the TypeScript/Next.js ecosystem).

## Prisma Data Schema (schema.prisma)

To maximize filtering flexibility, simplify UI components, and maintain robust typing, the platform utilizes a flat structure for the ``Setup`` table combined with optional relational fields.

```prisma
  enum CarGroup {
    GR_1
    GR_2
    GR_3
    GR_4
    GR_B
    ROAD
  }
```

```prisma
  enum Difficulty {
    SAFE
    BALANCED
    ALIEN
  }
```

```prisma
  enum TyreType {
    RH // Racing: Hard
    RM // Racing: Medium
    RS // Racing: Soft
    SH // Sports: Hard
    SM // Sports: Medium
    SS // Sports: Soft
    CH // Comfort: Hard
    CM // Comfort: Medium
    CS // Comfort: Soft
    IM // Intermediate
    W  // Heavy Wet
    D  // Dirt
    S  // Snow
  }
```

```prisma
  model Car {
    id           String   @id @default(cuid())
    name         String   // Marketing name (ex, "911 RSR '17")
    manufacturer String   // Manufacturer (ex, "Porsche")
    group        CarGroup // Racing caegory (ex, "Gr.3", "Gr.4", "Road")
    setups       Setup[]  // Setup connection
    createdAt    DateTime @default(now())
    updatedAt    DateTime @updatedAt

    @@index([group])
  }
```

```prisma
  model Track {
    id        String    @id @default(cuid())
    name      String    // Track name (ex, "Spa-Francorchamps")
    layout    String?   // Track config (ex, "24h Layout", "No Chicane")
    country   String?   // Country
    lapTimes  LapTime[] // Connection to setups by lap time
    createdAt DateTime  @default(now())
    updatedAt DateTime  @updatedAt
  }
```

```prisma
  model Setup {
    id               String     @id @default(cuid())
    carId            String
    car              Car        @relation(fields: [carId], references: [id], onDelete: Cascade)
    
    authorName       String                      // User
    isBopLocked      Boolean    @default(false)  // GT7 BoP flag
    difficulty       Difficulty @default("SAFE") // Handling difficulty ("ALIEN" | "SAFE" | "BALANCED")
    notes            String?                     // Gears, braking points etc

    // --- TYRES ---
    tyresFront       TyreType?  // Front tyres type (ex, "RM", "RS", "RH")
    tyresRear        TyreType?  // Rear tyres type

    // --- SUSPENSION (Front / Rear) ---
    rideHeightFront  Int?       // Ride height (мм)
    rideHeightRear   Int?
    antiRollFront    Int?       // Anti-roll bar (1-10)
    antiRollRear     Int?
    dampingCompFront Int?       // Damping ratio: Compression (%)
    dampingCompRear  Int?
    dampingRebFront  Int?       // Damping ratio: Rebound (%)
    dampingRebRear   Int?
    naturalFreqFront Float?     // Natural frequency (Гц)
    naturalFreqRear  Float?
    camberFront      Float?     // Camber angle (deg)
    camberRear       Float?
    toeFront         Float?     // Toe angle
    toeRear          Float?

    // --- DIFFERENTIAL (LSD) ---
    lsdInitTorque    Int?       // Initial torque
    lsdAccelSens     Int?       // Acceleration sensivity
    lsdBrakingSens   Int?       // Braking sensivity

    // --- AERO ---
    aeroFront        Int?       // Downforce: Front
    aeroRear         Int?       // Downforce: Rear

    // --- BRAKES AND STABILITTY ---
    brakeBalance     Int?       // Brake balance (-5 to +5)
    tcs              Int?       // Traction control level (0 to 5)

    // --- ENGINE ---
    powerRestrictor  Int?
    ballastWeight    Int?
    ballastPos       Int?
    hasNitrous       Boolean    @default(false)

    lapTimes         LapTime[]  // Connection to tracks by lap time
    createdAt        DateTime   @default(now())
    updatedAt        DateTime   @updatedAt

    @@index([carId])
    @@index([isBopLocked])
  }
```

```prisma
  model LapTime {
    id        String   @id @default(cuid())

    setupId   String
    setup     Setup    @relation(fields: [setupId], references: [id], onDelete: Cascade)

    trackId   String
    track     Track    @relation(fields: [trackId], references: [id], onDelete: Cascade)

    time      Int      @default(0) // Lap time, ms (0 = placeholder)
    proofUrl  String?  // Youtube lap time proof

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    @@unique([setupId, trackId])
    @@index([trackId])
  }
```

## Relational Logic & Filtering Specs

Since each setup is directly tied to a specific physical car model, it remains completely autonomous. The relationship between ``Setup`` and ``Track`` is managed via a junction table called ``LapTime`` (a many-to-many relationship). This design solves two critical engineering challenges at once:

- Zero Geometry Duplication: A single, well-optimized car setup can be reused across multiple different tracks, creating new lap time records without duplicating complex suspension geometry data within the database.

- Seamless Leaderboard Scalability: In Phase 0, the ``time`` field is seeded with a zero value (0), serving strictly as a logical bridge to query and display available setups within a specific track's UI. In future phases, this setup will allow us to transition into fully ranked competitive leaderboards without any breaking schema changes.

## Indexing & Performance

To ensure low-latency database queries, the schema implements both single-column and composite indexes:

- ``@@index([carId])`` in the ``Setup`` table: Powers instant setup catalog rendering when a user navigates to a specific car's page.

- ``@@index([isBopLocked])``: Isolates custom car configurations from BoP-restricted event setups (such as Daily Races).

- ``@@unique([setupId, trackId])`` in the ``LapTime`` table: Acts as a database-level guard constraint, preventing duplicate relationships between the same setup and track.
