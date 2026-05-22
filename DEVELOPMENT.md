# Git Flow & Branching Strategy

This project utilizes a modified Epic-Driven Git Flow, tailored for seamless integration with Vercel automation.

## Branch Types and Their Purpose

- `main` (Production):

  - Always stable and production-ready.

  - Any merge into this branch automatically triggers a production release.

  - Direct commits to `main` are strictly prohibited.

- `epic/*` (Staging / Milestone Level):

  - Created for each major Epic / Milestone (e.g., `epic/mvp-core`, `epic/tauri-logger`).

  - Serves as the base branch for all sub-tasks within the current development phase.

  - Mapped to a persistent staging environment.

- `task/*` or `fix/*` (Feature Level):

  - Short-lived branches created for specific GitHub Issues (e.g., `task/prisma-models`, `task/catalog-filters`).

  - Must branch off strictly from the currently active epic (`epic/*`).

## Task Lifecycle (Workflow)

1. Sprint Initialization: Create a long-lived epic branch stemming from `main`:

```Bash
git checkout main
git pull origin main
git checkout -b epic/mvp-core
git push origin epic/mvp-core
```

2. Feature Development: Branch off from the active epic for each individual sub-task:

```Bash
git checkout epic/mvp-core
git pull origin epic/mvp-core
git checkout -b task/prisma-models
```

3. Local Development & Push: Commit your changes and push the feature branch to the remote repository. Vercel will automatically generate a unique, isolated Preview URL for this specific feature branch.

4. Merging into Epic: Once the task is fully functional, open a Pull Request targetting the `epic/mvp-core` branch (not `main`!). Delete the feature branch locally and remotely post-merge.

5. Staging Updates: Every merge into the epic branch automatically updates the persistent staging environment.

6. Sprint Release: At the end of the sprint, once all tasks are completed and verified on the staging environment, open a final Pull Request from `epic/mvp-core` into `main` to trigger the production deployment.

## 🛠 CI/CD & Environment Strategy

The project relies on automated Git-triggered deployments with environment branching. Any hosting platform used for this project must support the following infrastructure requirements:

- Production Environment (`main`):
  - Automatically triggered by any merge into the `main` branch.
  - Serves the live, stable application to end-users.

- Staging Environment (`epic/*`):
  - Mapped to a persistent preview domain (e.g., `staging.nopeus.me`).
  - The hosting provider must allow dynamic remapping of this domain to the currently active `epic/*` branch.
  - Serves as the final integration testing ground before a production release.

- Ephemeral Preview Environments (`task/*`, `fix/*`):
  - Every Pull Request or push to a feature branch should ideally spin up an isolated, temporary deployment with a unique URL for rapid feature isolation and testing.
