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
- [ ] 6.5 — Responsive strategy
- [ ] 6.6 — Drag visual states
- [ ] 6.7 — Empty states
- [ ] 6.8 — Profile detail level

## Phase 7 — Backend
- [ ] MongoDB/Mongoose setup
- [ ] Auth/Guest session
- [ ] Task module
- [ ] Project module
- [ ] Profile/preferences module
- [ ] DTO validation
- [ ] REST APIs

## Phase 8 — Frontend ↔ Backend Integration
- [ ] Replace mock task data
- [ ] Task CRUD
- [ ] Project CRUD
- [ ] Search/filter persistence
- [ ] Task reorder persistence
- [ ] Theme/color preference persistence

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

**Current phase: Phase 6.4 — Color Mode behavior**

Next milestone:
**Phase 6.5 — Responsive strategy**

Do not implement or mark future phases complete until their actual work is finished and verified.
