# Nopeus GT - Core Vision & Index

This document serves as the starting point for the entire technical ecosystem of the Nopeus GT platform. It combines the core product vision, a phased development roadmap, and acts as a high-level index for the detailed specifications of the system modules.

## Product Vision & Mission

The Nopeus GT platform solves a critical challenge within the sim racing community (initially focusing on Gran Turismo 7) - the widening technical and performance gap between elite drivers ('aliens') and mainstream players. Currently, top-tier car setups, telemetry configurations, and track guides remain deeply buried within low-view YouTube videos or scattered across private, fragmented Discord servers. The project aggregates, structures, and automates access to this tribal knowledge, transforming chaotic data into a streamlined, intuitive UI/UX reference directory that will subsequently scale into a full-fledged analytical SaaS product.

In the modern sim racing landscape, fractional gains in lap times are heavily dictated by engineering and data-driven car optimization. However, the lack of centralized infrastructure forces enthusiastic drivers to spend more time reverse-engineering setups through trial and error rather than refining their racing lines. NopeusGT bridges this gap by establishing a single source of truth, democratizing elite racing knowledge and fostering a transparent, performance-oriented ecosystem.

By lowering the barrier to entry for advanced car tuning, the platform not only elevates individual driver performance but also drives engagement across the broader competitive community. The ultimate milestone of Phase 0 is to validate this structural framework, laying a robust foundation for future telemetry automation and real-time data ingestion pipelines.

## Development Roadmap

To mitigate risks and validate core hypotheses early on, development is split into 5 sequential phases. Each phase acts as a stepping stone, building the necessary infrastructure for the next.

| Stage | Name | Key functional |
|:-----:|------|----------------|
| 0 | Content hub | Core CRUD operations for tracks, cars, and fixed flat setups. Manual data curation and validation of the baseline UI/UX value proposition. |
| 1 | GT7 calendar integration | Synchronization with the Daily Races and Online Time Trials calendar. Featured weekly highlights on the landing page, newsfeed integration, and comprehensive SEO optimization. |
| 2 | User-generated content | User authentication, manual setup submissions, validation via video proof links, likes, comments, and the integration of a social engagement layer. |
| 3 | Automation and telemetry | A desktop agent (Tauri/TS) designed to listen to PlayStation UDP telemetry ports. Automatic setup export without manual data entry, interactive lap telemetry overlay charts, and the implementation of a premium subscription model. |
| 4 | Nopeus GT Academy | A virtual racing academy, coaching marketplace, and paid telemetry review sessions conducted by top-tier drivers utilizing our proprietary infrastructure. |

## Documentation Structure & Index

The project architecture is split into four interconnected specs:

- Document 1: Core Vision & Roadmap (Current) - High-level concept, milestones, and IP security.

- Document 2: Frontend Specification (FSD) - UI/UX layers, state management, and responsive design guidelines.

- [Document 3](https://github.com/nopeus-montenegro/nopeus-gt-fe/blob/c58254c9ac0c5843087f77ccbcc6910e4b7449e8/README_DB.md): Database & Data Models (Prisma/Postgres) - Flat table schemas, indexes, and strict typing.

- [Document 4:](https://github.com/nopeus-montenegro/nopeus-gt-fe/blob/c58254c9ac0c5843087f77ccbcc6910e4b7449e8/README_CONTENT.md) Infrastructure & API Specification - Server Actions, REST API constraints, GitOps workflow, and future telemetry ingestion.

- [Document 5:](https://github.com/nopeus-montenegro/nopeus-gt-fe/blob/c58254c9ac0c5843087f77ccbcc6910e4b7449e8/DEVELOPMENT.md) Git Flow & Branching Strategy - Epic-driven workflow, CI/CD environment routing (Production/Staging), and task lifecycle constraints.

Architecture Note: We don't need a standalone folder structure doc. NopeusGT strictly adheres to Feature-Sliced Design (FSD). By separating concerns into predictable layers (app, pages, widgets, features, entities, shared), the codebase remains completely self-documenting.

## System Security & Architecture Guidelines

To ensure codebase scalability, data integrity, and strict separation of concerns, the project follows these structural guidelines:

- Functional Isolation: The core application profile is cleanly separated. In Phase 0 and 1, the platform operates as a lightweight, public-facing reference hub. This keeps the initial footprint minimal, low-maintenance, and secure before introducing complex data processing pipelines.

- Codebase Abstraction: Heavy telemetry modules (such as the Phase 3 UDP parser) are decoupled from the main repository. They are developed as isolated, specialized packages and integrated into the primary Next.js application as compiled dependencies, ensuring a clean monolithic architecture.

- Access Control & Lifecycle Management: Technical documentation is split into logical modules strictly based on the technical stack. While the foundational data schema and repo structure are open-source friendly, production deployment environments, environment variables, and specific database seeds are strictly isolated using standard dev/prod workflows.

## Trademark & Non-Affiliation Disclaimer

Nopeus GT is an independent community project developed by Nopeus DOO and is not affiliated with, authorized, maintained, sponsored or endorsed by Sony Interactive Entertainment Inc, Polyphony Digital Inc or Gran Turismo.

All game content, images, car names, track names, logos and registered trademarks belong to their respective owners (Sony Interactive Entertainment Inc, Polyphony Digital Inc and respective automotive manufacturers).
