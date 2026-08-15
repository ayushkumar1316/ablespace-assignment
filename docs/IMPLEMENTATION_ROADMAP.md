# AbleSpace Part 1 — Implementation Roadmap

## Phase 1 — Foundation
- [x] Application Shell + Light Mode Foundation
- [x] Runtime fix + verification

## Phase 2 — Authentication
- [x] Login Screen

## Phase 3 — Task Workspace
- [x] Kanban Board
- [x] List View
- [x] Search
- [x] Display Settings
- [x] Sidebar collapse/expand

## Phase 4 — Task Detail
- [x] Task Detail
- [x] Priority dropdown
- [x] Date picker
- [x] Subtasks / Activity / Comments states

## Phase 5 — Remaining Verified Figma Screens
- [x] Project views
- [x] Project Display Settings
- [x] Profile Settings
- [x] Theme menu
- [x] Color menu
- [x] Remaining verified UI states

## Phase 6 — Missing-Design Decisions
- [x] 6.1 — Add Task UI
- [x] 6.2 — Add Project UI
- [x] 6.3 — Accent Color System
- [x] 6.4 — Color Mode behavior
- [x] 6.5 — Responsive strategy
- [x] 6.6 — Drag visual states
- [x] 6.7 — Empty states
- [x] 6.8 — Profile detail level

### Phase 6 Decision Log

The eight "DECISIONS REQUIRED" listed in the Figma source-of-truth docs
(`docs/FIGMA_SOURCE_OF_TRUTH.md` §13, `docs/FIGMA_VISUAL_SPEC.md`) were resolved as
follows. These choices supersede the open questions in the Figma docs.

| # | Decision | Option chosen | Where implemented |
|---|----------|---------------|-------------------|
| 6.1 | Add Task UI | Option A — modal with title, description, status, priority, assignee, start/due dates, labels | `frontend/src/components/add-task-modal.tsx` |
| 6.2 | Add Project UI | Option A — modal mirroring Add Task (name, description, status, members, due date, tags) | `frontend/src/components/add-project-modal.tsx` |
| 6.3 | Accent Color System | Six semantic accents (Amber/Blue/Pink/Rose/Emerald/Black) via CSS vars `--accent` / `--accent-strong` / `--accent-soft` | `frontend/src/app/globals.css`, `frontend/src/data/preferences.ts` |
| 6.4 | Color Mode behavior | Accent applies to active navigation, active Board/List state, primary actions, selected/check states, focus rings, date-picker indicators | `globals.css` tokens + sidebar/workspace components |
| 6.5 | Responsive strategy | Option A — sidebar collapses to overlay drawer below `md`; content reflows; Kanban columns scroll horizontally | `frontend/src/components/app-shell.tsx`, `sidebar.tsx` |
| 6.6 | Drag & Drop visual states | Custom native HTML5 DnD with hover, dragging (opacity + ring), drop-zone indicator, and ghost preview (not dnd-kit) | `frontend/src/components/kanban-board.tsx`, `task-card.tsx` |
| 6.7 | Empty states | Icon + title + description + CTA for no-tasks / no-projects / search-no-results / error-retry | `frontend/src/components/empty-state.tsx` |
| 6.8 | Profile detail level | Option A — full settings page: profile (name, email, avatar) + workspace (leave workspace). Client-only for now; persistence is Phase 8.9 | `frontend/src/components/profile-settings.tsx` |

## Phase 7 — Backend
- [x] MongoDB/Mongoose setup
- [x] Auth/Guest session
- [x] Task module
- [x] Project module
- [x] Profile/preferences module
- [x] DTO validation
- [x] REST APIs

## Phase 8 — Frontend ↔ Backend Integration
- [ ] 8.1 — Replace mock task data
- [ ] 8.2 — Task CRUD
- [ ] 8.3 — Update task integration
- [ ] 8.4 — Delete task integration
- [ ] 8.5 — Task reorder persistence
- [ ] 8.6 — Project CRUD
- [ ] 8.7 — Theme/color preference persistence (localStorage + Preferences API)
- [ ] 8.8 — Search/filter persistence
- [ ] 8.9 — Profile/preferences persistence

> **8.7 note — Preferences API:** theme/accent persistence is planned to use the
> backend Preferences API (`GET/PATCH /preferences/me`) in addition to
> localStorage. localStorage is kept for fast, flash-free hydration; the API is
> the source of truth for the guest session. Not wired yet — pending 8.7.

## Phase 9 — Responsive + Interaction Polish
- [ ] Desktop QA
- [ ] Tablet QA
- [ ] Mobile QA
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Drag visual states
- [ ] Accessibility/focus states

## Phase 10 — Final QA & Release
- [ ] Full Playwright verification
- [ ] TypeScript check
- [ ] ESLint
- [ ] Production build
- [ ] Visual fidelity pass
- [ ] README
- [ ] Deployment
- [ ] Production verification
- [ ] Final Git cleanup

## Rules

1. Never reorder phases without explicit approval.
2. Mark a checkbox `[x]` only after the phase/milestone is actually verified.
3. Do not mark work complete from code inspection alone when runtime verification is required.
4. Keep this file updated after every completed milestone.
5. Do not add new phases just because an implementation detail appears.
6. If a milestone is blocked, leave it unchecked and record the blocker below it.
7. Git commits must remain small and meaningful.

## Current Position

**Current phase: Phase 8.1 — Replace mock task data**

Next milestone:
**Phase 8 — Completed**

Do not implement or mark future phases complete until their actual work is finished and verified.

## Intentional Deviations from Figma

Recorded so the design source-of-truth docs are not misread as the current state.
The Figma docs are preserved as historical research; these are the decisions we made.

- **Login gate**: Figma flow is "Login → Main App". In practice the app renders
  `AppShell` directly (`frontend/src/app/layout.tsx`) and the first API call
  auto-authenticates as guest. The `Login` component exists but is unreachable
  and its buttons are UI placeholders (no auth/navigation).
- **Font**: Figma docs infer "likely Inter". Implementation uses **Geist** /
  Geist Mono (`next/font/google`).
- **Login branding**: Figma shows a pyramid logo; implementation uses an "LM"
  tile. Secondary button copy is "Continue with Google" vs Figma "Login with Google".
- **Drag & Drop library**: Figma docs suggest dnd-kit or hello-pangea/dnd.
  Implementation uses **custom native HTML5 drag & drop** (see Phase 6.6 decision log).
- **Theme/accent persistence**: Figma docs describe localStorage-only persistence.
  The frontend currently persists theme/accent to localStorage only; backend
  Preferences API (`GET/PATCH /preferences/me`) wiring is pending Phase 8.7.
- **Profile persistence**: Figma Screen 13 implies editable profile. The UI is
  implemented client-only; persisting to the API is deferred to Phase 8.9.
- **Mock data residue**: `frontend/src/data/tasks.ts` still exports the original
  mock `TASKS` array and `data/projects.ts` exports `PROJECTS`. The task/project
  workspaces currently render these mock arrays directly; replacing them with
  API-loaded data is Phase 8.1 and 8.6. `frontend/src/lib/api.ts` (untracked)
  contains the complete API client used by the wiring phases.
