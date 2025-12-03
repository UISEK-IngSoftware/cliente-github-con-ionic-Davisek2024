## Quick context (what this project is)

- Ionic + React (TypeScript) mobile/web app scaffolded with Vite and Capacitor.
- Key folders: `src/pages` (tab pages), `src/components` (reusable UI), `src/theme` (CSS variables).
- Uses React Router v5 via `react-router`/`react-router-dom` (see `src/App.tsx`).

## How to run (developer workflows)

- Local web dev (fast): `npm run dev` (runs `vite`). The README also documents `ionic serve` if you prefer Ionic CLI features.
- Build for production: `npm run build` (runs `tsc && vite build`).
- Preview production build: `npm run preview`.
- Unit tests: `npm run test.unit` (Vitest, configured in `vite.config.ts`).
- E2E tests: `npm run test.e2e` (Cypress). See `cypress/` for fixtures and tests.

Environment

- The app expects a GitHub token in env: create `.env` with `VITE_GITHUB_TOKEN=your_token` (see `readme.md`).
- API calls should include headers:

  Authorization: `token ${VITE_GITHUB_TOKEN}`

## Architecture & patterns an AI should respect

- UI is split into Ionic "pages" (tabs) under `src/pages`.
  - `src/pages/Tab1.tsx` — repo list UI
  - `src/pages/Tab2.tsx` — create repo UI
  - `src/pages/Tab3.tsx` — user info UI
- Reusable UI components live in `src/components` (example: `RepoItem.tsx` uses `IonItem`, `IonThumbnail`, `IonLabel`). Follow existing style: components are React.FC + TypeScript.
- Services for API calls are expected under `src/services` (currently described in README). When adding services, prefer centralized axios instance and read token from `import.meta.env.VITE_GITHUB_TOKEN`.

Concrete examples to follow

- When adding an API call, mirror this pattern (pseudo):

  - create `src/services/github.ts`
  - export functions like `getUser()`, `getRepos()` that use axios configured with headers:

    headers: { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }

- UI components should use Ionic primitives. Example component to match:

  `src/components/RepoItem.tsx` — uses `<IonItem>`, `<IonThumbnail slot="start">`, `<IonLabel>`.

## Project-specific conventions and gotchas

- Router: project uses React Router v5 semantics (see `Route exact path=...` in `src/App.tsx`) not v6. Use `Route` + `exact` and `Redirect` where appropriate.
- TypeScript: project uses `type: module` and modern TS; keep exports default where existing files do so.
- Env: Vite exposes env vars prefixed with `VITE_` — use `import.meta.env.VITE_GITHUB_TOKEN` in runtime code.
- Tests: Vitest is configured with `jsdom` and setup file `src/setupTests.ts`. Keep DOM-related tests in that environment.

## Files to inspect before making changes

- `package.json` — scripts and deps (vite, ionic, cypress, vitest)
- `readme.md` — lab goals and API endpoints
- `src/App.tsx` — routing and tab structure
- `src/pages/*` and `src/components/*` — UI patterns
- `vite.config.ts` — test setup and build plugins

## Pull request / coding style guidance

- Keep changes small and focused (this is a teaching lab repository).
- Preserve existing Ionic markup and classNames. Prefer adding new components under `src/components` and pages under `src/pages`.

If any of these assumptions are wrong (for example if you want React Router v6 style routes or a different env pattern), mention it and I will adapt the instructions.

---
_Generated: tailored Copilot instructions for this Ionic + React + Vite project._
