# Nopeus GT - Infrastructure & API Specification

This document describes the hybrid infrastructure of the NopeusGT platform during Phase 0. The architecture combines a strict relational database for storing engineering telemetry (car setups) with a highly minimalist, GitOps/CMS-driven workflow for dynamic content management.

## Hybrid Rendering & Data Strategy

To deliver maximum performance, optimized SEO, and UI flexibility, the codebase splits core responsibilities across three distinct approaches: Server Components, Server Actions, and standard REST API Route Handlers.

| Approach | Use Cases | Architectural Advantages |
|----------|-----------|--------------------------|
| Server Components | Initial page rendering (Landing page, Newsfeed, Track/Car catalog). Direct database and file system querying via Prisma on the server side. | Instant SSR/SSG, flawless out-of-the-box SEO, and zero JavaScript impact on the client bundle for static content blocks. |
| Server Actions | User-driven data mutations (Setup submission forms, comments, likes, and other engagement actions). | End-to-end TypeScript safety between client and server; seamless Optimistic Updates without drafting dedicated API endpoints. |
| Route Handlers (REST API) | Interactive catalog filters, dynamic search, infinite scroll pagination, and external software integrations (e.g., the Phase 3 Tauri desktop agent). | Leverage full HTTP caching for GET requests via TanStack Query, completely decoupled from the Next.js context for third-party consumers. |

## REST API Specification (Route Handlers)

To ensure high responsiveness and reactivity across catalog interfaces during Phase 0, the following lightweight GET endpoints are implemented:

- `GET /api/v1/setups` - Dynamic Setup Filtering: Accepts query parameters: `carId`, `trackId`, `group`, and `isBopLocked`. Returns a highly cacheable JSON array optimized for consumption via TanStack Query.

- `GET /api/v1/comments` - Paginated Discussion Feeds: Accepts a `contentId` (derived from Markdown/MDX Frontmatter) and a `page` parameter for infinite scroll or classic pagination.

## GitOps-CMS: Structured Content Management via GitHub

All weekly events (Daily Races), Online Time Trials, and news updates are managed manually through Markdown/MDX files stored in dedicated directories within the GitHub repository:

```plaintext
content/
├── hero/        # Promo banners and high-priority landing page highlights
├── weekly/      # Weekly event calendar (Daily Races & Time Trials)
└── newsfeed/    # Articles, meta analytics, and physics patch breakdowns
```

### Linking Static Content to the Relational DB via `contentId`

To enable dynamic features (such as comments, likes, and view counters) for files stored natively in Git, every Markdown/MDX document must include a unique string identifier - `contentId` (formatted as a CUID2) - within its Frontmatter metadata.

The PostgreSQL database (via Prisma) stores engagement records like comments and likes by referencing this `contentId`. This architecture completely isolates heavy text content inside Git, ensuring the relational database only manages lightweight transactional and engagement metrics.

### Content File Structure Examples

#### Newsfeed Article Example (`content/newsfeed/patch-physics.md`):

```markdown
contentId: "clwp1234567890abcdefghij" # Relational key for comments/likes in the DB
title: "Physics Patch & Tyre Model Breakdown"
date: "2026-05-18"
author: "Nopeus Team"
category: "Physics"
summary: "Analyzing how the new tire grip update impacts Gr.3 class setups."

#LateralLoadMechanicsAdjustments
Article body in standard Markdown format...
```

#### Daily Race Example (`content/weekly/2026-w21.md`):

```markdown
contentId: "clwp9876543210zyxwvutsrqpo" # Enables dedicated weekly race discussion threads
currentWeek: "2026-W21"
startDate: "2026-05-18"

dailyRaceB:
  trackId: "spa-francorchamps"  # Strict foreign-key match with the Track table ID in the DB
  carGroup: "Gr.3"
  headline: "Raw Pace in the Ardennes"
  notes: "BoP Enabled. Tuning Locked. Shift brake balance to the front (-2)."

dailyRaceC:
  trackId: "monza-no-chicane" # Strict foreign-key match with the Track table ID in the DB
  carGroup: "Gr.4"
  headline: "Slipstream Madness at Monza"
  notes: "BoP Enabled. Tyre wear: x5."
```

## End-to-End Data Flow Architecture

When a user requests a dynamic content page, the Next.js engine orchestrates the data flow across the server, database, and client using the following lifecycle:

- Content Fetching: The Next.js server reads the target Markdown/MDX file (e.g., from the content/newsfeed/ directory) directly from the file system or content repository during the request lifecycle.

- Frontmatter Parsing: The server-side parser extracts the metadata and the unique contentId from the file's Frontmatter block.

- Static Rendering (SSR/SSG): The static body of the article is compiled into HTML instantly on the server via a Server Component, ensuring optimal core web vitals and SEO.

- Dynamic Client Hydration: An interactive client-side component situated below the article takes the extracted contentId and triggers a lightweight GET request to the Route Handler (/api/v1/comments?contentId=...). The fetched payload is seamlessly managed and cached on the client via TanStack Query.

- Real-time Mutation & Invalidation: When a user submits a new comment, the UI triggers a Server Action mutation. This directly updates the PostgreSQL database on the server while simultaneously invalidating the TanStack Query cache on the client to instantly render the fresh comment.
