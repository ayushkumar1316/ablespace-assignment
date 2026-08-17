# AbleSpace — Task Management System

A full-stack task management system built as the Part 1 assessment, following a
Figma design as the visual source of truth.

## Overview

- Kanban board + list view for tasks, with search and field-visibility toggles.
- Task detail with status/priority/dates, subtasks, and activity.
- Projects list + project detail with associated tasks.
- Profile/settings page (profile + workspace).
- Light/dark themes and six accent color modes (Amber, Blue, Pink, Rose, Emerald, Black).
- Guest login with an auto-issued JWT session.

## Live Deployment

| Layer | URL |
|-------|-----|
| Frontend | https://ablespace-assignment-ochre.vercel.app |
| Backend | https://ablespace-api-65gc.onrender.com |
| Database | MongoDB Atlas (M0 free tier) |

## Production Architecture

```
┌──────────────┐      ┌──────────────────┐      ┌────────────────┐
│   Frontend   │ ───► │     Backend      │ ───► │    Database    │
│   Vercel     │      │  Render/NestJS   │      │  MongoDB Atlas │
│  Next.js 16  │      │  NestJS 11       │      │   Mongoose 9   │
└──────────────┘      └──────────────────┘      └────────────────┘
```

- **Vercel** hosts the Next.js frontend (static + client-side rendering).
- **Render** hosts the NestJS REST API (free tier, auto-deploys from GitHub).
- **MongoDB Atlas** provides the cloud database (M0 free tier, 512 MB).
- CORS is configured to allow requests only from the deployed frontend origin.

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | Next.js 16 (App Router), React 19, Tailwind CSS 4 |
| Backend    | NestJS 11, TypeScript, REST API               |
| Database   | MongoDB via Mongoose 9                        |
| Auth       | Guest session, JWT (passport-jwt)             |
| Validation | class-validator / class-transformer (global `ValidationPipe`) |

## Project Structure

```
ablespace-assignment/
├── backend/
│   └── src/
│       ├── auth/          # POST /auth/guest + JWT strategy
│       ├── users/         # GET/PATCH /users/me
│       ├── tasks/         # task CRUD
│       ├── projects/      # project CRUD
│       ├── preferences/   # GET/PATCH /preferences/me
│       ├── database/      # mongoose module + seed service
│       └── common/        # jwt guard, current-user decorator
├── frontend/
│   └── src/
│       ├── app/           # Next.js app router (layout + globals.css)
│       ├── components/    # app shell, workspaces, modals, primitives
│       ├── data/          # types + constants (and residual mock arrays)
│       └── lib/           # API client (api.ts)
├── docs/
│   ├── IMPLEMENTATION_ROADMAP.md     # phase status + decision log + deviations
│   ├── DEPLOYMENT_READINESS.md       # deployment report
│   ├── FIGMA_SOURCE_OF_TRUTH.md      # design source of truth (historical)
│   ├── FIGMA_VISUAL_SPEC.md          # design source of truth (historical)
│   └── FIGMA_REVERSE_ENGINEERING.md  # original Figma research (preserved)
└── .gitignore
```

## Local Setup

Prerequisites: Node.js 20+, MongoDB (local or Atlas).

### 1. Environment variables

Copy the example and fill in values:

```bash
cp backend/.env.example backend/.env
```

See [Environment Variables](#environment-variables) for each key.

### 2. Backend

```bash
cd backend
npm install
npm run start:dev
```

The API runs at `http://localhost:4000`. On first boot it seeds sample tasks and
projects if the collection is empty (see [Seed behavior](#seed-behavior)).

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`. The frontend calls the backend at
`http://localhost:4000` (`API_BASE_URL` in `frontend/src/lib/api.ts`).

## Local MongoDB

Point `MONGODB_URI` at a local instance:

```env
MONGODB_URI=mongodb://localhost:27017/ablespace
```

Start MongoDB locally (e.g. installed via the MongoDB Community installer, or
`brew services start mongodb-community` on macOS) before launching the backend.

## MongoDB Atlas (alternative)

For a hosted database, use an Atlas cluster URI:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/ablespace
```

**Atlas limitation / deployment consideration:**

- The `+srv` connection string must be reachable from wherever the backend runs.
  For local development, ensure your IP is added to the cluster's network access
  allow-list.
- For a deployed backend, prefer a non-interactive approach (no `@localhost`
  fallbacks) — the URI must be supplied via environment variables at runtime.
- The backend connects to MongoDB at startup via `MongooseModule.forRootAsync` in
  `backend/src/app.module.ts`; if MongoDB is unreachable the backend will fail to
  start.

## Environment Variables

Defined in `backend/.env.example`:

| Variable          | Example                       | Purpose                              |
|-------------------|-------------------------------|--------------------------------------|
| `PORT`            | `4000`                        | Backend listen port                  |
| `MONGODB_URI`     | `mongodb://localhost:27017/ablespace` | MongoDB connection string    |
| `JWT_SECRET`      | long random string            | JWT signing secret (**required**)    |
| `JWT_EXPIRES_IN`  | `7d`                          | Guest token lifetime                 |
| `CORS_ORIGIN`     | `http://localhost:3000`       | Comma-separated allowed origins      |

Never commit `.env` (`.gitignore` excludes `.env*`).

## API Overview

All routes except `POST /auth/guest`, `GET /`, and `GET /health` require
`Authorization: Bearer <token>`.

| Method | Endpoint            | Description                          | Auth |
|--------|---------------------|--------------------------------------|------|
| POST   | `/auth/guest`       | Create a guest user, return `accessToken` + user | No |
| GET    | `/`                 | Service info                         | No   |
| GET    | `/health`           | Health check                         | No   |
| GET    | `/tasks`            | List tasks (sorted by `order`)       | Yes  |
| GET    | `/tasks/:id`        | Get one task                         | Yes  |
| POST   | `/tasks`            | Create a task                        | Yes  |
| PATCH  | `/tasks/:id`        | Update a task (status, order, etc.)  | Yes  |
| DELETE | `/tasks/:id`        | Delete a task                        | Yes  |
| GET    | `/projects`         | List projects                        | Yes  |
| GET    | `/projects/:id`     | Get one project                      | Yes  |
| POST   | `/projects`         | Create a project                     | Yes  |
| PATCH  | `/projects/:id`     | Update a project                     | Yes  |
| DELETE | `/projects/:id`     | Delete a project                     | Yes  |
| GET    | `/users/me`         | Current user                         | Yes  |
| PATCH  | `/users/me`         | Update current user's profile        | Yes  |
| GET    | `/preferences/me`   | Get theme + color mode for the user  | Yes  |
| PATCH  | `/preferences/me`   | Update theme / color mode            | Yes  |

Request/response bodies are validated at the API boundary (whitelist + transform).

## Guest JWT Behavior

- The first authenticated API call triggers `POST /auth/guest`
  (`frontend/src/lib/api.ts` → `getGuestToken()`).
- The returned `accessToken` is cached in memory and persisted to
  `localStorage` under `ablespace:guest-token`.
- On later loads the stored token is reused, so the same guest user (and their
  saved preferences/tasks) is used across page refreshes instead of creating a
  new guest every time.
- Tokens expire after `JWT_EXPIRES_IN` (default `7d`). If the token expires,
  API calls fail with `401` — there is no automatic re-authentication.
- A new session can be obtained by clearing `ablespace:guest-token` from
  `localStorage` and reloading.

## Theme/Accent Persistence

- Theme (`ablespace:theme`, `light|dark`) and accent (`ablespace:color-mode`,
  one of the six modes) are written to `localStorage` for fast, flash-free
  hydration (`frontend/src/app/layout.tsx` pre-paint script).
- They are **also** persisted to the backend Preferences API:
  - On app mount, `GET /preferences/me` loads the saved values and syncs them to
    `localStorage` (`frontend/src/components/app-shell.tsx`).
  - Changing theme/accent calls `PATCH /preferences/me` (best-effort; failures
    are logged and the UI still updates from localStorage).
- Backend defaults are `theme: light`, `colorMode: blue` (`preference.schema.ts`).
- Note: Figma docs describe localStorage-only persistence; the API layer is an
  implementation addition. See the roadmap's "Intentional Deviations from Figma".

## Seed Behavior

`backend/src/database/seed.service.ts` runs on application bootstrap:

- If the `tasks` collection already has documents, seeding is skipped.
- Otherwise it inserts the sample tasks (with `order` values) and sample projects
  (linking `taskIds` to the seeded tasks).
- Seeding is idempotent by design.

## Known Limitations

- **No add-subtask UI**: subtasks can be toggled (checked/unchecked) in the task
  detail view, but there is no UI to create new subtasks.
- **No project update/delete from UI**: `updateProject` and `deleteProject` exist
  in the API client (`frontend/src/lib/api.ts`) but are not wired to any UI
  component.
- **Guest-only authentication**: there is no real login gate — the app
  auto-authenticates as a guest user on first visit. Google OAuth was omitted
  per assignment scope.
- **No automatic token refresh**: JWT tokens expire after 7 days with no
  automatic re-authentication. Users must clear localStorage to obtain a new
  session.
- **Seed data on first boot**: a fresh database is seeded with sample tasks and
  projects on the first successful startup. This is intended for demo/assignment
  purposes.
- **Render cold starts**: the free-tier Render service sleeps after inactivity,
  causing a 30–60 second delay on the first request.

## Intentional Deviations from Figma

These are conscious decisions made during implementation. The Figma docs are
preserved as historical research; these are the decisions we made.

| Area | Figma Design | Our Implementation | Rationale |
|------|-------------|-------------------|-----------|
| **Login** | "Continue as Guest" (black button) + "Login with Google" | Guest-only login; Google OAuth omitted | Assignment scope — no OAuth provider configured |
| **Font** | "likely Inter" (inferred) | Geist / Geist Mono (`next/font/google`) | Better developer experience, modern typeface |
| **Login branding** | Pyramid logo | "AS" tile (blue rounded square) | Custom branding for AbleSpace identity |
| **Drag & Drop** | dnd-kit or hello-pangea/dnd suggested | Custom Pointer Events-based drag (no library) | Zero dependencies, full control over behavior |
| **Theme/accent persistence** | localStorage only | localStorage + backend Preferences API | Persistence across devices/sessions via server |
| **Profile persistence** | Implied editable profile | Full `GET/PATCH /users/me` with localStorage cache | Server as source of truth, flash-free hydration |
| **Primary CTA color** | Black (#000000) solid buttons | Accent color (blue by default) | Consistent with accent color system |
| **Add Task/Project UI** | Not designed in Figma | Modal with full field set | Required for CRUD functionality |
| **Responsive design** | Not in Figma (desktop only) | Sidebar collapses to overlay drawer below `md` | Required for mobile support |
| **Empty states** | Not designed in Figma | Icon + title + description + CTA | Better UX than blank screens |

## Documentation

- `docs/IMPLEMENTATION_ROADMAP.md` — phase status (Phase 10 — COMPLETE),
  Phase 6 decision log, and intentional deviations from Figma.
- `docs/DEPLOYMENT_READINESS.md` — deployment report with architecture,
  environment variables, and production checklist.
- `docs/FIGMA_SOURCE_OF_TRUTH.md`, `docs/FIGMA_VISUAL_SPEC.md`,
  `docs/FIGMA_REVERSE_ENGINEERING.md` — preserved design source-of-truth research
  (historical as-of-creation notes added; design findings unchanged).
