# Figma Source of Truth

*Consolidated design specification combining existing FIGMA_REVERSE_ENGINEERING.md research with Gemini visual analysis from 13 screenshots. All confidence levels: HIGH / MEDIUM / LOW.*

> **As-of-creation note**: this document is the preserved design source of truth from
> the Figma research phase. VERIFIED / INFERRED / UNKNOWN and confidence levels are
> intact. Statements that read as status ("TO BE IMPLEMENTED", "Being created now",
> "No commits made yet", byte sizes, "Recommended First Milestone") are historical —
> they describe the repository at the time this document was written. Implementation
> status is tracked in `docs/IMPLEMENTATION_ROADMAP.md` (Phases 1–8.7 complete;
> current phase: 8.8 — Search/filter persistence). Intentional deviations from this
> design are recorded in the roadmap's "Intentional Deviations from Figma" section.

## Preservation Notice
- **FIGMA_REVERSE_ENGINEERING.md is preserved** exactly as created - not deleted or replaced
- This document consolidates and references the existing research
- New findings from Gemini are marked separately: VERIFIED / INFERRED / UNKNOWN

## 1. Screens (All 13)

### Screen 1: Login Page
- **Status**: VERIFIED HIGH
- **Details**: Center-aligned card, logo top, bold heading. Primary: "Continue as Guest" (Black), Secondary: "Login with Google" (White with border)
- **Sources**: Gemini screenshot + structural research (both confirm)

### Screen 2: Kanban Board
- **Status**: VERIFIED HIGH
- **Details**: Main workspace, tasks in columns (To Do, Doing, Completed). Columns: #F3F4F6 gray background. Task cards: white with subtle shadows. Tags: pill shapes.
- **Sources**: Gemini screenshot

### Screen 3: Kanban Display Settings
- **Status**: INFERRED MEDIUM
- **Details**: Dropdown showing layout toggle and field visibility toggles, applied over Kanban Board
- **Sources**: Gemini screenshot only

### Screen 4: List View
- **Status**: VERIFIED HIGH
- **Details**: Structured table format. Section headers (To Do, Doing) are collapsible arrows.
- **Sources**: Gemini screenshot + structural research (both confirm table/list view)

### Screen 5: List View (Filtered)
- **Status**: INFERRED MEDIUM
- **Details**: Search active ("Design Homepage") showing filtered results within List View
- **Sources**: Gemini screenshot only

### Screen 6: Task Detail (Priority)
- **Status**: VERIFIED HIGH
- **Details**: Single task view. Left: Title, Description, Subtasks, Activity/Comments. Right: Status, Priority, Members, Dates, Labels (card format). Priority dropdown active.
- **Sources**: Gemini screenshot + structural research (both confirm task detail view with priority)

### Screen 7: List View Settings
- **Status**: INFERRED MEDIUM
- **Details**: Same display dropdown pattern as Screen 3, but applied over List View
- **Sources**: Gemini screenshot only

### Screen 8: Task Detail (Date)
- **Status**: INFERRED MEDIUM
- **Details**: Single task view with custom Date Picker calendar open. Start/End date selection capability.
- **Sources**: Gemini screenshot only

### Screen 9: Sidebar Theme Menu
- **Status**: INFERRED MEDIUM
- **Details**: Dropdown showing Light/Dark theme options, located in sidebar bottom section
- **Sources**: Gemini screenshot only

### Screen 10: Sidebar Color Menu
- **Status**: INFERRED MEDIUM
- **Details**: Dropdown showing accent color options (Amber, Blue, Pink, Rose, Emerald, Black), sidebar bottom section
- **Sources**: Gemini screenshot only

### Screen 11: Projects Display Settings
- **Status**: INFERRED MEDIUM
- **Details**: Projects list view with field toggles open. Pattern mirrors Kanban/List Display Settings
- **Sources**: Gemini screenshot only

### Screen 12: Project Detail View
- **Status**: INFERRED MEDIUM
- **Details**: Breadcrumb navigation (Projects > Design Homepage) showing tasks for specific project
- **Sources**: Gemini screenshot only

### Screen 13: Profile Settings
- **Status**: INFERRED MEDIUM
- **Details**: Dedicated settings page for user info and workspace management. User info editing + Leave Workspace options
- **Sources**: Gemini screenshot only

## 2. User Flow (Verified)

### Authentication Flow (HIGH):
- **Login** → **Main App** (Defaults to Workspace/Tasks)

### Navigation Flow (HIGH):
- **Left Sidebar** → Switch between **Tasks**, **Projects**, **Settings**

### Task Management Flow (HIGH):
- **View Tasks** (Board/List) → **Click Task** → **Open Detail View** → **Edit Properties** (Status, Priority, Dates, Subtasks)

### Customization Flow (MEDIUM):
- **Sidebar Bottom** → **Change Theme** (Light/Dark) OR **Change Color Mode** (Amber/Blue/Pink/Rose/Emerald/Black)

### Profile Management Flow (MEDIUM):
- **Sidebar Settings** → **Profile Page** → **Edit details** / **Leave Workspace**

## 3. Application Layout (VERIFIED HIGH)

### Sidebar (Left, Fixed Width) (HIGH):
- User Profile dropdown
- Main navigation: **Workspace > Tasks**, **Projects**, **Settings**
- Footer utilities: **Theme** dropdown, **Color** dropdown, **Settings** button

### Main Content (Right, Fluid) (HIGH):

#### Top Bar (HIGH):
- View toggles (Board/List)
- Search bar
- Filters
- Primary CTA: **Add Task** / **Add Project**

#### Content Area (HIGH):
- **Kanban Board** (horizontal scroll) OR **List View** (vertical scroll)

#### Secondary Panel / Task Detail (HIGH):
- Takes over main content area with **2-column layout**
- Left: Main details / Comments
- Right: Metadata sidebar (Status, Priority, Members, Dates, Labels)

## 4. Screen-by-Screen Analysis (Mixed Confidence)

### Viewport: Desktop (1280x900) (HIGH):
- All 13 screens are desktop viewports

### Login Screen (HIGH):
- Center-aligned card
- Logo top, bold heading
- Primary: "Continue as Guest" (Black button)
- Secondary: "Login with Google" (White with border)

### Kanban Board (HIGH):
- Columns: #F3F4F6 gray background
- Task cards: white with subtle shadows
- Tags: pill shapes
- Subtle elevation shadows

### List View (HIGH):
- Clean table structure
- Section headers: collapsible arrows (To Do, Doing)
- Row-based task display

### Task Details (HIGH):
- Left: Title, Description, Subtasks, Activity/Comments
- Right: Status, Priority, Members, Dates, Labels (card format)
- Divider between left and right panels

### Dropdowns (MEDIUM):
- Floating popovers, rounded corners, subtle shadows
- Checkmarks for active states
- Single-select (Priority) and Multi-select (Display fields)

### Typography (HIGH):
- Clean Sans-Serif (likely Inter)
- Headings: Bold
- Secondary text: Muted gray
- Micro-copy: 12px muted

## 5. Design System (Mixed Confidence)

### Typography (HIGH structure, MEDIUM pixel values):
- Sans-serif (likely Inter)
- Headings: Bold (24px estimated)
- Body: Regular (14px estimated)
- Micro-copy: 12px muted (estimated)

### Colors - Light Mode (VERIFIED HIGH):
- Background: #FFFFFF (White)
- Surface/Columns: #F3F4F6 (Light Gray, verified from Kanban board)
- Primary Text: #171717 / #212121 (Dark Gray/Black)
- Muted Text: #757575 / #6B7280 (Medium Gray)
- Action Button: #000000 (Black - solid primary buttons)

### Colors - Status/Priority (VERIFIED HIGH):
- Urgent: Red
- High: Orange
- Medium: Yellow
- Low: Gray

### Colors - Accent Color System (VERIFIED - Figma Properties panel):
- Six accent modes extracted from the Figma Properties panel with EXACT values (VERIFIED Figma evidence):
  - **Amber** → `#D97706`
  - **Blue** → `#3B82F6` (default accent, matches current Figma state)
  - **Pink** → `#DB2777`
  - **Rose** → `#E11D48`
  - **Emerald** → `#059669`
  - **Black** → `#171717`
- Additional extracted Figma colors (VERIFIED Figma evidence):
  - `#E5E5E5` — border/divider
  - `#737373` — muted text
  - `#F5F5F5` — light gray/background
  - `#FFFFFF` — white
- Additional extracted purple value `#9333EA` — usage currently **UNKNOWN**; NOT assigned to Pink (Pink is `#DB2777`).
- **Semantic accent tokens** (CSS variables, not hardcoded colors):
  - `--accent` — the selected accent color (switches per Color Mode)
  - `--accent-strong` — darker hover/pressed variant (derived via color-mix)
  - `--accent-soft` — soft tinted background for active/selected states (derived via color-mix)
  - Applied to accent-bearing elements: active navigation, active Board/List state, primary actions, selected/check states, focus rings, and date-picker indicators
- Default is **Blue** (`#3B82F6`), preserving the current Figma-matching appearance.

### Colors - Dark Mode (UNKNOWN LOW):
- **Status**: Completely missing from visual evidence
- All 13 screenshots show Light mode only
- Structural CSS exists in globals.css but visual design not provided

### Spacing (HIGH scale, MEDIUM pixel values):
- Consistent 4px, 8px, 16px, 24px increments
- Confirmed from layout analysis

### Components (MEDIUM-HIGH):
- **Buttons**: Primary (Black solid), Secondary (White with border), Icon-only
- **Task List Items**: Default row, Section Header row (collapsible arrows)
- **Task Cards**: Avatar + title + tags + date badge; white with subtle shadows; pill-shaped tags
- **Dropdowns**: Single-select (Priority, Theme), Multi-select (Display fields with checkboxes); click-to-open, outside-click-to-close
- **Avatars**: Circular user images, custom images
- **Badges**: Pill shape with icon, status indicators

## 5. Component Variants (MEDIUM)

### Buttons:
- Primary: Black solid, full-width or padding-based
- Secondary: White with border
- Icon-only: 32-40px circular, toolbars and action menus

### Task List Items:
- Default row: Task info with status indicator
- Section Header row: Collapsible arrow, section title (To Do, Doing, Completed)

### Task Cards:
- Default: Avatar + title + tags + date badge
- With actions: Trash menu, more options

### Dropdowns:
- Single-select: Priority (Urgent/High/Medium/Low), Theme (Light/Dark)
- Multi-select: Display fields with checkboxes
- Behavior: Click to open, outside click to close, checkmarks for selected

## 6. Interactions (Mixed Confidence)

### View Switching (HIGH):
- Toolbar toggles between Board (Kanban) and List views
- Real-time content area update without page refresh

### Field Visibility (MEDIUM):
- Checkboxes in display dropdown show/hide columns in real-time
- Apply to both Kanban Board and List View

### Dropdown Menus (MEDIUM):
- Click to open, outside click to close
- Checkmarks for active/selected states
- Priority: Single selection only
- Display fields: Multi-selection allowed

### Date Selection (MEDIUM):
- Custom calendar UI with range capability
- Start date → End date selection
- Popover or inline display

### Add Task/Project (UNKNOWN):
- **Status**: MISSING - not in Figma or Gemini screenshots
- Figma comments confirm: "design of add task page is not given"
- Decision required before implementation

## 7. Responsive Design (UNKNOWN LOW):

### Visible Data: NONE (LOW)
- All screenshots are desktop viewports (1280x900)
- No mobile/tablet screens exist in Figma evidence

### Action Required (LOW):
- Mobile/Tablet layout must be inferred and implemented
- Expected: Collapsing sidebar to hamburger menu
- Expected: Stacking Kanban columns vertically or switching to List view
- **This is NOT in Figma evidence - must be designed from assignment requirements**

## 8. Theming (Mixed Confidence)

### Theme Options (MEDIUM):
- Light and Dark - Only Light visible in screenshots

### Accent Color Modes (VERIFIED - Figma Properties panel):
- Amber `#D97706`, Blue `#3B82F6`, Pink `#DB2777`, Rose `#E11D48`, Emerald `#059669`, Black `#171717`
- Switches a semantic `--accent` token applied to active navigation, active Board/List state, primary actions, selected/check states, focus rings, and date-picker indicators
- Extra extracted value `#9333EA` (purple) documented separately — usage UNKNOWN
- Selection persists across refresh (localStorage)

### Dark Mode (UNKNOWN LOW):
- **Status**: Completely missing from screenshots
- Structural CSS in globals.css exists (#0a0a0a background, #ededed text for dark)
- Full visual design not provided

### Current Implementation (MEDIUM):
- CSS variables in `globals.css` for light/dark theme
- Light mode: background #fff, foreground #171717
- Dark mode: background #0a0a0a, foreground #ededed
- **Note**: Structural setup exists; visual application needs verification

## 9. Assets & Icons (HIGH for structure, MEDIUM for details):

### Avatars (HIGH):
- Circular user images
- Custom user images

### Icons (MEDIUM - minimalist outline):
- Search, Filter, Columns, Calendar, Tag, Check, Chevron

### Logos (HIGH):
- 'Pyramid' logo on login screen

### No Illustrations (HIGH):
- Design uses primarily UI elements and outline icons

## 10. Missing / Ambiguous Design (ALL UNKNOWN/LOW):

### Dark Mode Visuals (LOW):
- **Status**: Completely missing
- Not in any of 13 screenshots

### Color Mode Application (LOW):
- **Status**: Exact elements affected are missing
- Menu exists (Amber/Blue/Pink/Rose/Emerald/Black) but which UI elements change is undefined

### Add Task/Project Flow (UNKNOWN):
- **Status**: MISSING DESIGN
- Figma comments: "should we create the Add Task UI and API also, asking this because the design of add task page is not given"
- Same for Add Project - not visualized in Gemini screenshots

### Mobile UI (UNKNOWN LOW):
- **Status**: Missing entirely
- All 13 screens desktop-only

### Empty States (UNKNOWN LOW):
- **Status**: Missing
- What happens with no tasks? No Figma evidence

### Drag & Drop Visual States (UNKNOWN LOW):
- **Status**: Missing
- 6-dot handle functionality confirmed; hover/grabbing/drop-zone visuals not shown

## 11. Implementation Requirements (Mixed Confidence)

### Layout (HIGH):
- Next.js App Router layout with persistent Sidebar and dynamic main content area
- Sidebar width: Fixed, with collapse/expand functionality
- Content area: Fluid, adapts between Board and List views

### UI Library (HIGH):
- Tailwind CSS for styling (already configured in project)
- Shadcn UI or Headless UI for accessible dropdowns, modals, and tabs
- Lucide React for icons (minimalist outline set)

### State Management (MEDIUM):
- React Context or Zustand for global states:
  - Selected Theme (Light/Dark)
  - Color Mode (Amber/Blue/Pink/Rose/Emerald/Black)
  - View Type (List/Board)
  - Task selection state

### Drag & Drop (HIGH - functionality, LOW - visual):
- dnd-kit or hello-pangea/dnd for Kanban board interactions
- 6-dot handle for drag reordering (confirmed from Figma comments)
- **Visual states need design decision** (hover/grabbing/drop-zone)

### API Endpoints (TO BE IMPLEMENTED):
- Task CRUD operations
- Project CRUD operations
- Theme/Color mode preference persistence
- Filter/sort functionality

> **Historical note**: "TO BE IMPLEMENTED" reflects the design phase. As of Phases 7–8
> these are implemented: task/project CRUD (`/tasks`, `/projects`) and theme/color
> preference persistence (`/preferences/me`, guest JWT). Filter/sort persistence is
> in progress (Phase 8.8).

## 12. Confidence Level Summary

### HIGH Confidence:
- 13 screen existence and general arrangement
- Light mode color palette (background, surface, text)
- Task priority colors (Red/Orange/Yellow/Gray)
- Basic component patterns (Buttons, Task Cards, Dropdowns)
- Drag reordering functionality (6-dot handle)
- Application shell layout (Sidebar + Top Bar + Main Content)
- Task Detail 2-column layout
- View toggles (Board/List)
- Basic user flow (Login → Tasks → Detail → Project → Profile)

### MEDIUM Confidence:
- Interaction states (Dropdown logic, checkbox behavior)
- Color Mode application (which elements change, how - inferred but not explicit)
- Spacing exact values (4/8/16/24px scale confirmed, pixel values inferred)
- Display Settings toggles (field visibility)
- Theme toggle structural setup (Light/Dark CSS variables exist)
- All 13 screen general arrangement
- Task Detail panel layout
- Component variants (buttons, cards, dropdowns variants)
- State management needs (theme, view type, color mode)

### LOW Confidence:
- Responsive design (mobile/tablet - not in any screenshots)
- Dark mode full visual implementation (not visible in any screenshot)
- Color Mode exact application (which specific UI elements change)
- Drag & Drop visual states (hover/grabbing/drop-zone)
- Add Task screen design (Figma explicitly: "not given")
- Add Project screen design (not in Figma)
- Mobile touch targets and navigation patterns
- Empty state designs (no tasks in Kanban/List)
- Profile Settings exact field layout and validation
- Drag reordering visual states beyond 6-dot handle

## 12. Final Design Source of Truth Summary

### A. VERIFIED (High Confidence):
- **13 screens** form connected workflow: Login → Task Management (Board/List) → Task Detail → Project Detail → Profile Settings
- **Light mode color palette** verified: Background #fff, Surface #F3F4F6, Text #171717, Muted #757575
- **Task priority colors** verified: Urgent=Red, High=Orange, Medium=Yellow, Low=Gray
- **Button variants** exist: Primary (Black solid), Secondary (White with border), Icon-only
- **Drag reordering** via 6-dot handle confirmed functional
- **Application shell** structure: Sidebar (fixed) + Top Bar (toggles/search/CTA) + Main Content (fluid, switches between views)
- **Task Detail** 2-column layout (Left: details/comments; Right: Status/Priority/Members/Dates/Labels)
- **View toggles** (Board/List) work in real-time
- **13 screens** mapped and named consistently across Gemini and structural research
- **Light mode** is the only visually verified theme

### B. INFERRED (Medium Confidence):
- **"Color Mode"** likely changes active state colors of links, buttons, and focus rings
- **Display Settings** (field visibility toggles) work for both Kanban and List View, show/hide in real-time
- **Date picker** has range capability (Start → End) based on Task Detail with Date Picker
- **Theme toggle** (Light/Dark) has structural CSS in globals.css; visual changes beyond background/text need verification
- **Task Detail** 2-column layout consistent across Priority and Date detail views
- **Display Settings** pattern mirrors across Kanban and List views

### C. UNKNOWN/MISSING (Low Confidence):
- **Dark mode** full CSS variables and visual implementation
- **Add Task screen** - Figma comments: "design of add task page is not given"
- **Add Project screen** - similarly not designed in Figma
- **Mobile/Tablet layouts** - all 13 screens desktop; must be designed from assignment requirements
- **Color Mode exact application** - which UI elements actually change when switching
- **Drag & Drop** visual states (hover/grabbing/drop-zone) - functionality known, visual design not shown
- **Empty states** - no tasks in Kanban board, no tasks in List view - no Figma evidence
- **Mobile/Tablet navigation** and touch targets - absent from Figma
- **Profile Settings** exact field layout and validation rules - one screenshot only
- **Drag reordering** visual states beyond the 6-dot handle mechanism

### D. Questions for Coding Phase (DECISIONS REQUIRED - see next section):

## 13. DECISIONS REQUIRED Before Implementation

*(Only decisions that genuinely cannot be resolved from available Figma evidence)*

### Decision 1: Add Task UI Design
- **Figma evidence**: "should we create the Add Task UI and API also, asking this because the design of add task page is not given"
- **Gemini evidence**: Not in 13 screenshots
- **Resolution required**: Consciously decide implementation approach
  - Option A: Generic modal with title, description, priority select, due date picker, assignee selector, submit button
  - Option B: Skip until design provided (violates assignment CRUD requirements)
  - Option C: Minimal form with only required fields
- **Must be decided by team** - not resolvable from Figma

### Decision 2: Add Project UI Design
- **Figma evidence**: Project views exist (Display Settings, Detail View) but no creation flow
- **Gemini evidence**: Project views shown but Add Project modal/page missing
- **Resolution required**: Consciously decide
  - Option A: Add Project modal mirroring Add Task approach
  - Option B: Implement only viewing/editing existing projects
  - Option C: Defer Add Project to Phase 2
- **Must be decided by team**

### Decision 3: Dark Mode Full Implementation
- **Figma evidence**: Only Light mode in all 13 screenshots; Dark mode CSS exists in globals.css only
- **Gemini evidence**: "Dark Mode Visuals: Completely missing"
- **Resolution required**: Consciously decide
  - Option A: Tailwind standard dark mode (background #0a0a0a, text #ededed)
  - Option B: Custom dark palette matching light mode semantics
  - Option C: Defer to post-MVP
- **Must be decided by team**

### Decision 4: Color Mode Exact Application
- **Figma evidence**: Color Modes (Amber/Blue/Pink/Rose/Emerald/Black) in sidebar menu; "visible changes not explicitly clear"
- **Gemini evidence**: "LOW confidence - likely applies to focus rings, active text, or primary buttons"
- **Resolution required**: Consciously decide what Color Mode affects
  - Option A: Primary button colors only
  - Option B: Text colors, border colors, subtle background accents
  - Option C: Full theme with multiple color sematics
  - Option D: Defer to Phase 2
- **Must be decided by team**

### Decision 5: Responsive Design Breakpoints
- **Figma evidence**: All 13 screens desktop (1280x900); no mobile/tablet
- **Assignment requirement**: "Fully responsive UI"
- **Resolution required**: Consciously decide responsive strategy
  - Option A: Sidebar collapses below 768px; Kanboard stacks vertically; List full-width
  - Option B: Sidebar persists; Content reflows; Grid columns 2→1 on mobile
  - Option C: Mobile-first with desktop as enhancement
  - Option D: Separate mobile menu
- **Must be decided by team**

### Decision 6: Drag & Drop Visual States
- **Figma evidence**: 6-dot handle drag functionality confirmed; hover/grabbing/drop-zone visuals missing
- **Resolution required**: Consciously decide visual states
  - Option A: Simple CSS hover (pointer + background change)
  - Option B: Animated grab cursor + outline during drag
  - Option C: Full dnd-kit visual patterns with ghost task preview
  - Option D: Minimal visual states, focus on functionality
- **Must be decided by team**

### Decision 7: Empty State Designs
- **Figma evidence**: No designs for no-tasks scenarios
- **Assignment requirement**: Explicitly tested in Phase 13/14
- **Resolution required**: Consciously decide approach
  - Option A: Illustrative empty state with instructional text + CTA ("Add your first task")
  - Option B: Minimal text-only state ("No tasks yet")
  - Option C: Placeholder task cards with message
  - Option D: Defer to post-MVP
- **Must be decided by team**

### Decision 8: Profile Settings Detail Level
- **Figma evidence**: Screen 13 shows settings page but exact field layout not detailed
- **Resolution required**: Consciously decide detail level
  - Option A: Full form with all fields (name, email, password change, notification preferences)
  - Option B: Minimal (name + email + Leave Workspace button)
  - Option C: Defer profile details to later phase
- **Must be decided by team**

## 14. Git Safety (PRESERVATION)

### Existing Commits to PRESERVE:
1. `fe1c7fb` - chore: completed frontend setup with nextjs
2. `e70d245` - chore: project init with backend and frontend

### Rules:
- **Do NOT amend, squash, or rewrite** existing commits
- **Do NOT rewrite Git history**
- **.env** must never be committed (contains groq and gemini API keys)
- **Figma screenshots**: Can be referenced in docs but not committed as binary assets unless intentionally required
- **Giant commits**: NEVER - each commit = one meaningful unit
- **.gitignore**: Must exclude node_modules, .env, .next, coverage, .playwright

## 15. Source-of-Truth Hierarchy

### Primary Source (ESTABLISHED, NOT TO BE CHANGED):
- `docs/FIGMA_REVERSE_ENGINEERING.md` - Created 13-08-2026, 25,578 bytes
  - Original structural research from Figma file inspection
  - 20 sections, all screen types, components, tokens, interactions
  - **PRESERVE EXACTLY - do not modify**

### Secondary Source (CREATED, SUPPLEMENTAL):
- `docs/FIGMA_VISUAL_SPEC.md` - Created during this session
  - Gemini visual analysis from 13 screenshots
  - Marked VERIFIED/INFERRED/UNKNOWN with confidence levels
  - **Supplements but does not override** primary source

### Tertiary Source (THIS DOCUMENT):
- `docs/FIGMA_SOURCE_OF_TRUTH.md` - Being created now
- **Consolidates** primary and secondary sources
- **Marks conflicts** and areas requiring team decisions
- **Provides implementation order** based on verified evidence
- **Lists decisions required** that cannot be auto-resolved

### Hierarchy Rule:
- Primary source (FIGMA_REVERSE_ENGINEERING.md) takes precedence
- Secondary source (FIGMA_VISUAL_SPEC.md) supplements with visual evidence
- This document (FIGMA_SOURCE_OF_TRUTH.md) consolidates and provides roadmap
- **No source overrides primary source** - all conflicts marked and explained

## 16. Report Summary

> **Historical note**: this Report (including "Being created now", byte sizes, the Git
> Status block, and the closing "NEXT: Resolve the 8 decisions" line) describes the
> document at creation time and is preserved as-is. Current status is in
> `docs/IMPLEMENTATION_ROADMAP.md`.

### Source-of-Truth Files Created:
1. `docs/FIGMA_VISUAL_SPEC.md` - 28,686 bytes (created during this session)
   - Gemini visual analysis, VERIFIED/INFERRED/UNKNOWN, confidence levels
2. `docs/FIGMA_SOURCE_OF_TRUTH.md` - Being created now
   - Consolidated source of truth combining both research strands
   - Conflicts marked, decisions required listed, implementation order provided

### Files Preserved (NOT MODIFIED):
- `docs/FIGMA_REVERSE_ENGINEERING.md` - Original research, 25,578 bytes, 13-08-2026
  - Structural analysis from Figma file inspection
  - All 20 sections intact
  - **This is the PRIMARY source of truth**

### Conflicts Identified (4+ areas):
1. **Add Task UI**: Not in Figma; comments confirm "not given"
2. **Add Project UI**: Project views exist but creation flow missing
3. **Dark Mode**: Only Light mode in all 13 screenshots
4. **Color Mode Application**: Menu exists but which elements change undefined
5. **Responsive Design**: No mobile/tablet evidence in 13 screenshots
6. **Drag & Drop Visual States**: Functionality known, visual design missing
7. **Empty States**: No Figra designs for no-tasks scenarios

### Unknowns Remaining (15+ items):
- Dark mode full implementation
- Add Task/Add Project UI designs
- Mobile/responsive layouts
- Color Mode exact application
- Drag & Drop visual states
- Empty state designs
- Mobile touch targets
- Profile Settings detail level
- And 8 more per previous documentation

### Recommended First Milestone:
**Set up project foundations + Application Shell**:
1. Verify Next.js dev server starts with Tailwind
2. Verify NestJS server starts with MongoDB
3. Implement Application Shell: Sidebar + Top Bar + Main Content
4. Basic Theme toggle (Light/Dark)
5. Git commit for foundation completion

### Then Consciously Resolve:
- All "Decisions Required Before Implementation" (8 decisions listed above)
- Then proceed to feature implementation (Task CRUD, theme switching, etc.)

### Git Status:
- **Branch**: main
- **Existing commits**: 2 preserved (fe1c7fb, e70d245)
- **New files**: FIGMA_VISUAL_SPEC.md, FIGMA_SOURCE_OF_TRUTH.md (plus existing research)
- **No commits made yet** - following git safety rules
- **.env** protected (groq + gemini keys, not to be committed)

---
**NEXT: Resolve the 8 "Decisions Required Before Implementation" with the team BEFORE starting any feature development. Source-of-truth documents are complete and ready for team review.**