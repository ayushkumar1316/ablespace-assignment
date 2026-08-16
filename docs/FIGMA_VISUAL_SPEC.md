# Figma Visual Specification

*Based on Gemini analysis of 13 Figma screenshots, combined with structural reverse engineering from Figma file inspection. All items marked with confidence level: HIGH / MEDIUM / LOW.*

> **As-of-creation note**: this document records the design research produced when the
> 13 screenshots were analyzed. It is intentionally preserved unchanged as a design
> source of truth — VERIFIED / INFERRED / UNKNOWN and confidence levels are intact.
> Implementation status (Phases 1–8.10 complete, current: Phase 9) is tracked in
> `docs/IMPLEMENTATION_ROADMAP.md`. The Git-status and byte-size statements in the
> sections below reflect the repository at creation time, not its current state.

## 1. Complete Screen Map

### Screen 1: Login Page
- **Visual**: Center-aligned card. Logo top, bold heading. Primary button "Continue as Guest" (Black), Secondary button "Login with Google" (White with border).
- **Confidence**: HIGH
- **Source**: Gemini screenshot + structural research

### Screen 2: Kanban Board
- **Visual**: Main workspace showing tasks in columns (To Do, Doing, Completed). Columns have gray background (#F3F4F6 approx). Task cards are white with subtle shadows. Tags use pill shapes.
- **Confidence**: HIGH
- **Source**: Gemini screenshot

### Screen 3: Kanban Display Settings
- **Visual**: Dropdown showing layout toggle and field visibility toggles. Applied over Kanban Board view.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 4: List View
- **Visual**: Task workspace in a structured table format. Clean table structure. Section headers (To Do, Doing) are collapsible arrows.
- **Confidence**: HIGH
- **Source**: Gemini screenshot + structural research

### Screen 5: List View (Filtered)
- **Visual**: Search active ("Design Homepage") showing filtered results within List View.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 6: Task Detail (Priority)
- **Visual**: Detailed view of a single task with the Priority dropdown active. Left side (Title, Description, Subtasks, Activity/Comments). Right side (Status, Priority, Members, Dates, Labels in card format).
- **Confidence**: HIGH
- **Source**: Gemini screenshot

### Screen 7: List View Settings
- **Visual**: Same as Screen 3 (Kanban Display Settings), but applied over the List View.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 8: Task Detail (Date)
- **Visual**: Single task view with a custom Date Picker calendar open. Includes Start/End date selection capability.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 9: Sidebar Theme Menu
- **Visual**: Dropdown showing Light/Dark theme options. Located in sidebar bottom section.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 10: Sidebar Color Menu
- **Visual**: Dropdown showing accent color options (Amber, Blue, Pink, Rose, Emerald, Black). Located in sidebar bottom section.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 11: Projects Display Settings
- **Visual**: Projects list view with field toggles open. Similar pattern to Kanban Display Settings / List View Settings but for Projects.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 12: Project Detail View
- **Visual**: Breadcrumb navigation (Projects > Design Homepage) showing tasks for a specific project. Detailed view of project with associated tasks.
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

### Screen 13: Profile Settings
- **Visual**: Dedicated settings page for user info and workspace management. Includes user info editing and workspace management options (Leave Workspace).
- **Confidence**: MEDIUM
- **Source**: Gemini screenshot

## 2. User Flow

### Authentication Flow:
- **Login** → **Main App** (Defaults to Workspace/Tasks)

### Navigation Flow:
- **Left Sidebar** → Switch between **Tasks**, **Projects**, **Settings**

### Task Management Flow:
- **View Tasks** (Board/List) → **Click Task** → **Open Detail View** → **Edit Properties** (Status, Priority, Dates, Subtasks)

### Customization Flow:
- **Sidebar Bottom** → **Change Theme** (Light/Dark) OR **Change Color Mode** (Amber, Blue, Pink, Rose, Emerald, Black)

### Profile Management Flow:
- **Sidebar Settings** → **Profile Page** → **Edit details** / **Leave Workspace**

## 3. Application Layout

### Sidebar (Left, Fixed Width):
- User Profile dropdown
- Main navigation: **Workspace > Tasks**, **Projects**, **Settings**
- Footer utilities: **Theme** dropdown, **Color** dropdown, **Settings** button

### Main Content (Right, Fluid):

#### Top Bar:
- View toggles (Board/List)
- Search bar
- Filters
- Primary CTA: **Add Task** / **Add Project**

### Content Area:
- **Kanban Board** (horizontal scroll) OR **List View** (vertical scroll)

### Secondary Panel (Task Detail):
- Takes over main content area with **2-column layout**
- Left: Main details / Comments
- Right: Metadata sidebar (Status, Priority, Members, Dates, Labels)

## 4. Screen-by-Screen Visual Analysis

### Viewport: Desktop (1280x900 referenced in Hug overlays)

### Login Screen:
- Center-aligned card
- Logo top, bold heading
- Primary: "Continue as Guest" (Black button)
- Secondary: "Login with Google" (White with border)

### Kanban Board:
- Columns have gray background (#F3F4F6 approx)
- Task cards are white with subtle shadows
- Tags use pill shapes
- Subtle elevation shadows on cards

### List View:
- Clean table structure
- Section headers (To Do, Doing) are collapsible arrows
- Row-based task display
- Collapsible section grouping

### Task Details:
- **Left side**: Title, Description, Subtasks, Activity/Comments
- **Right side**: Status, Priority, Members, Dates, Labels (in card format)
- Divider between left and right panels

### Dropdowns:
- Floating popovers with rounded corners
- Subtle shadows
- Checkmarks for active states
- Single-select (Priority, Theme) and Multi-select (Display fields with checkboxes)

### Typography:
- Clean Sans-Serif (likely **Inter**)
- Headings: **Bold**
- Secondary text: **Muted gray**
- Micro-copy: 12px muted

## 5. Design System

### Typography:
- **Sans-serif** (likely Inter)
- Headings: **24px bold** (estimated)
- Body: **14px regular** (estimated)
- Micro-copy: **12px muted** (estimated)
- **Confidence**: HIGH for structure, MEDIUM for exact pixel values

### Colors:

#### Light Mode (verified):
- **Background**: #FFFFFF (White)
- **Surface/Columns**: #F3F4F6 (Light Gray, verified from Kanban board)
- **Primary Text**: #171717 / #212121 (Dark Gray/Black)
- **Muted Text**: #757575 / #6B7280 (Medium Gray)
- **Action Button**: #000000 (Black - solid primary buttons)

#### Status/Priority Colors (verified):
- **Urgent**: Red
- **High**: Orange
- **Medium**: Yellow
- **Low**: Gray

#### Accent Color System (VERIFIED - Figma Properties panel):
- Six accent modes with EXACT hex values from Figma (VERIFIED Figma evidence):
  - **Amber** → `#D97706`
  - **Blue** → `#3B82F6` (default, matches current Figma state)
  - **Pink** → `#DB2777`
  - **Rose** → `#E11D48`
  - **Emerald** → `#059669`
  - **Black** → `#171717`
- Additional extracted Figma colors (VERIFIED): `#E5E5E5` (border/divider), `#737373` (muted text), `#F5F5F5` (light gray/background), `#FFFFFF` (white)
- Additional extracted purple `#9333EA` — usage currently **UNKNOWN**; NOT assigned to Pink
- Semantic `--accent` / `--accent-strong` / `--accent-soft` tokens applied to accent-bearing elements: active navigation, active Board/List state, primary actions, selected/check states, focus rings, date-picker indicators

#### Dark Mode:
- **Confidence**: LOW - "Completely missing" from visual evidence
- **Inference**: Only Light mode visible in screenshots; Dark mode CSS variables not provided

### Spacing:
- Consistent **4px, 8px, 16px, 24px** increments
- **Confidence**: HIGH for scale, MEDIUM for exact component padding

### Components:

#### Buttons:
- **Primary**: Black solid (#000000)
- **Secondary**: White with border
- **Icon-only**: Action menus (floating, rounded corners)

#### Task List Items:
- **Default row**
- **Section Header row** (collapsible arrows)

#### Task Cards:
- Contains Avatar, Date badge, Tag badges
- White with subtle shadows
- Pill-shaped tags

#### Dropdowns:
- Single-select (Priority, Theme)
- Multi-select (Display fields with checkboxes)
- Floating popovers with subtle shadows
- Checkmarks for active states

#### Avatars:
- Circular user images
- Custom user images

#### Badges:
- Pill shape with icon
- Status indicators (Priority colors)

## 6. Component Variants

### Buttons:
- **Primary**: Black solid, full-width or padding-based
- **Secondary**: White with border, used for secondary actions
- **Icon-only**: 32-40px circular, used in toolbars and action menus

### Task List Items:
- **Default row**: Task info with status indicator
- **Section Header row**: Collapsible arrow, section title (To Do, Doing, Completed)

### Task Cards:
- **Default**: Avatar + title + tags + date badge
- **With actions**: Trash menu, more options

### Dropdowns:
- **Single-select**: Priority (Urgent/High/Medium/Low), Theme (Light/Dark)
- **Multi-select**: Display fields with checkboxes (show/hide columns)
- **Behavior**: Click to open, outside click to close, checkmarks for selected

## 7. Interactions

### View Switching:
- **Toolbar toggles** between Board (Kanban) and List views
- Real-time content area update without page refresh

### Field Visibility:
- **Checkboxes** in display dropdown show/hide columns in real-time
- Apply to both Kanban Board and List View

### Dropdown Menus:
- Click to open
- Outside click to close
- Checkmarks for active/selected states
- Priority: Single selection only
- Display fields: Multi-selection allowed

### Date Selection:
- **Custom calendar UI** with range capability
- Start date → End date selection
- Popover or inline display

### Add Task/Project:
- Modal or page for creating new entity
- **Confidence**: NOT VISUALIZED in screenshots - marked as MISSING/AMBIGUOUS

## 8. Responsive Design

### Visible Data:
- **None**. All screenshots are **desktop viewports** (1280x900)

### Action Required:
- **Mobile/Tablet layout must be inferred** and implemented based on standard best practices
- Expected: Collapsing sidebar to hamburger menu
- Expected: Stacking Kanban columns vertically or switching to List view
- **Confidence**: LOW - must be designed/implemented, not directly available from Figma

## 9. Theming

### Theme Options:
- **Light and Dark** - Only Light is visible in screenshots

### Accent Color Modes (VERIFIED - Figma Properties panel):
- **Amber** `#D97706`, **Blue** `#3B82F6` (default), **Pink** `#DB2777`, **Rose** `#E11D48`, **Emerald** `#059669`, **Black** `#171717`
- Switches a semantic `--accent` token affecting: active navigation, active Board/List state, primary actions, selected/check states, focus rings, date-picker indicators
- Extra extracted value `#9333EA` (purple) — usage UNKNOWN, not assigned to Pink
- Selection persists across refresh (localStorage)

### Current Implementation Status:
- CSS variables in `globals.css` for light/dark theme
- Light mode: background #fff, foreground #171717
- Dark mode: background #0a0a0a, foreground #ededed
- **Confidence**: MEDIUM - structural setup exists, visual application needs verification

## 10. Assets & Icons

### Avatars:
- Custom user images
- Circular format

### Icons (Minimalist Outline):
- Search, Filter, Columns, Calendar, Tag, Check, Chevron

### Logos:
- 'Pyramid' logo on login screen

### No Illustrations:
- Design uses primarily UI elements and outline icons

## 11. Missing / Ambiguous Design

### Dark Mode Visuals:
- **Status**: Completely missing from screenshots
- **Impact**: Must be designed/implemented; not available from Figma evidence

### Color Mode Application:
- **Status**: Exact elements affected are missing
- **Impact**: Unclear which UI elements change with Color Mode selection (buttons? text? borders? focus rings?)

### Add Task/Project Flow:
- **Status**: The modal or page for creating a new entity is **missing**
- **Impact**: Must be designed; Figma comments confirm "design of add task page is not given"

### Mobile UI:
- **Status**: Missing entirely
- **Impact**: All screenshots are desktop; must be designed/implemented

### Empty States:
- **Status**: What happens when there are no tasks? Missing
- **Impact**: Must be designed for both Kanban (empty board) and List (empty table)

### Drag & Drop States:
- **Status**: Hover, grabbing, and drop-zone visuals are missing
- **Impact**: 6-dot drag handle functionality known, but visual states not shown

## 12. Implementation Requirements

### Layout:
- **Next.js App Router** layout with persistent **Sidebar** and dynamic **main content area**
- Sidebar width: Fixed, with collapse/expand functionality
- Content area: Fluid, adapts between Board and List views

### UI Library:
- **Tailwind CSS** for styling (already configured)
- **Shadcn UI** or **Headless UI** for accessible dropdowns, modals, and tabs
- **Lucide React** for icons (minimalist outline set)

### State Management:
- **React Context** or **Zustand** to manage global states:
  - Selected Theme (Light/Dark)
  - Color Mode (Amber/Blue/Pink/Rose/Emerald/Black)
  - View Type (List/Board)
  - Task selection state

### Drag & Drop:
- **dnd-kit** or **hello-pangea/dnd** for Kanban board interactions
- **6-dot handle** for drag reordering (confirmed from Figma comments)
- **Confidence**: HIGH - functionality confirmed, visual states need design

### API Endpoints (Backend):
- Task CRUD operations
- Project CRUD operations
- Theme/Color mode preference persistence
- Filter/sort functionality

## 13. Confidence Level Summary

### HIGH Confidence:
- General layout structure (Sidebar + Main Content + Top Bar)
- Typography hierarchy (heading levels, body text)
- Color palette for Light mode (background, surface, text colors)
- Routing structure (Login → Tasks → Project → Profile)
- Field names and data schema requirements (Status, Priority, Dates, Labels, Subtasks)
- Basic component patterns (Buttons, Task Cards, Dropdowns)
- Drag reordering functionality (6-dot handle)

### MEDIUM Confidence:
- Interaction states (Dropdown logic, checkbox behavior)
- Color Mode application (which elements change, how)
- Spacing exact values (4/8/16/24px scale confirmed, pixel values inferred)
- Task Detail panel layout (2-column structure)
- Display Settings toggles (field visibility)
- Theme toggle (Light/Dark structural setup)
- All 13 screen existence and general arrangement

### LOW Confidence:
- Responsive design (mobile/tablet layouts - not in screenshots)
- Dark mode visual implementation (not visible in any screenshot)
- Color Mode exact application (which specific elements)
- Drag & Drop visual states (hover/grabbing/drop-zone)
- Add Task/Project modal design (not in Figma)
- Mobile touch targets and navigation
- Empty state designs
- Exact typography pixel values (family confirmed, sizes inferred)

## 14. Final Design Source of Truth

### A. VERIFIED (High Confidence):
- The app requires **complex state management** for views (List/Board toggle), detailed task nested data (subtasks, comments), and a **dedicated sidebar configuration** with Theme/Color Mode selectors
- **13 screens** form a connected workflow: Login → Task Management (Board/List) → Task Detail → Project Detail → Profile Settings
- **Light mode color palette** is verified: Background #fff, Surface #F3F4F6, Text #171717, Muted #757575
- **Task priority colors** are verified: Urgent=Red, High=Orange, Medium=Yellow, Low=Gray
- **Button variants** exist: Primary (Black solid), Secondary (White with border), Icon-only
- **Drag reordering** via 6-dot handle is confirmed functional
- **Responsive design must be implemented** from scratch (not in Figma screenshots)

### B. INFERENCES (Medium Confidence):
- **"Color Mode"** likely changes the active state colors of links, buttons, and focus rings across the application
- **Display Settings** (field visibility toggles) work for both Kanban Board and List View, showing/hide columns/fields in real-time
- **Date picker** has range capability (Start → End) based on Screen 8 (Task Detail with Date Picker open)
- **Theme toggle** (Light/Dark) has structural CSS setup in globals.css, but visual changes beyond background/text need verification
- **Task Detail 2-column layout** is consistent across priority and date detail views

### C. UNKNOWN/MISSING (Low Confidence):
- **Dark mode CSS variables** and full visual implementation
- **Add Task screen** - modal/page design not in Figma; comments confirm "design of add task page is not given"
- **Add Project screen** - similarly not designed in Figma
- **Mobile/Tablet layouts** - all 13 screens are desktop; must be designed responsive from scratch
- **Color Mode exact application** - which UI elements actually change when switching color modes
- **Empty states** - no tasks in Kanban board, no tasks in List view
- **Drag & Drop visual states** - hover cursor, grabbing mouse cursor, drop-zone area visuals
- **Mobile touch targets** and navigation patterns
- **Profile Settings** exact field layout and validation rules
- **Project Detail View** exact data structure and task listing

### D. Questions for Coding Phase:
1. **How to handle the "Add Task" UI?** 
   - Figma explicitly states design is not given
   - Option: Default to a generic modal with title, description, priority, due date, assignee
   - Decision: Not to be made until consciously resolved

2. **How to implement Dark Mode?**
   - Tailwind CSS dark mode setup already in globals.css
   - Option: Default to Tailwind's standard dark mode palette (background #0a0a0a, text #ededed)
   - Decision: Not to be made until consciously resolved

3. **How to handle Color Mode (Amber/Blue/Pink/Rose/Emerald/Black)?**
   - Visible changes not explicitly clear in screenshots
   - Option: Affect primary button colors, text colors, or focus rings only
   - Decision: Not to be made until consciously resolved

4. **How to implement responsive design?**
   - All screenshots are desktop (1280x900)
   - Option: Collapse sidebar to hamburger on mobile, stack Kanban columns, switch to List view
   - Decision: Not to be made until consciously resolved

---

# Implementation Order

**Exact order to implement verified design. Start only after source-of-truth review.**

1. **Setup Foundation** (already partially done)
   - Verify Next.js dev server starts
   - Verify NestJS server starts
   - Configure MongoDB connection
   - Set up environment variables (PORT, MONGODB_URI)

2. **Application Shell**
   - Implement persistent Sidebar (Left) with navigation (Workspace > Tasks, Projects, Settings)
   - Implement Top Bar with view toggles (Board/List), Search, Filters, Add Task/Project CTA
   - Implement dynamic Main Content area that switches between views

3. **Theme System**
   - Implement Light/Dark theme toggle
   - Add Color Mode selector (Amber/Blue/Pink/Rose/Emerald/Black)
   - Persist theme/color mode preference across refreshes
   - Apply CSS variables (already partially in globals.css)

4. **Task Board View**
   - Implement Kanban columns (To Do, Doing, Completed)
   - Implement Task cards with white background + subtle shadows
   - Implement 6-dot drag handle for reordering (dnd-kit)
   - Implement Tag badges (pill shape) on task cards
   - Display Settings toggle for field visibility

5. **List View**
   - Implement table structure with Section headers (To Do, Doing, Completed)
   - Implement collapsible section arrows
   - Task rows with consistent structure

6. **Task Detail View**
   - 2-column layout (Left: details/comments, Right: Status/Priority/Members/Dates/Labels)
   - Priority dropdown with Urgent/High/Medium/Low options
   - Date Picker with range capability (Start/End)
   - Comments/Activity panel
   - Edit task properties sidebar

7. **Project Views**
   - Projects Display Settings (field toggles)
   - Project Detail View with breadcrumb navigation (Projects > [Project Name])
   - Tasks associated with specific project

8. **Profile Settings**
   - User info editing page
   - Workspace management (Leave Workspace button)
   - Settings page in sidebar navigation

9. **Responsive Design**
   - Implement mobile/tablet breakpoints
   - Collapse sidebar to hamburger menu
   - Stack Kanban columns or switch to List view on mobile
   - Adjust touch targets

10. **Empty States**
    - Design for: Empty Kanban board, Empty List view
    - Provide instructional text or illustrative states

11. **Drag & Drop Visual States**
    - Implement hover state (pointer over 6-dot handle)
    - Implement grabbing state (dragging task)
    - Implement drop-zone visual feedback

12. **Theme/Color Mode Full Implementation**
    - Complete Dark Mode CSS variables beyond background/text
    - Implement Color Mode (Amber/Blue/Pink/Rose/Emerald/Black) affecting specified UI elements
    - Verify all components update consistently

13. **Final Polish**
    - Accessibility improvements
    - Cross-browser testing
    - Performance optimization
    - Documentation

---

# Decisions Required Before Implementation

**Only list decisions that genuinely cannot be resolved from the available Figma evidence.**

## 1. Add Task UI Design
- **Issue**: Figma comments explicitly state: "should we create the Add Task UI and API also, asking this because the design of add task page is not given"
- **Conflict**: Neither Gemini screenshots nor structural research includes Add Task modal/page design
- **Cannot resolve from available evidence**
- **Decision Required**: Consciously decide how to implement
  - Option A: Create generic modal with title, description, priority select, due date picker, assignee selector, submit
  - Option B: Skip Add Task until design is provided
  - Option C: Implement minimal form with required fields only
- **My Recommendation**: NOT to be made by me - team must consciously decide

## 2. Add Project UI Design
- **Issue**: Figma has Project Detail View and Projects Display Settings, but no Add Project modal/page
- **Conflict**: Gemini shows Project views but no creation flow
- **Cannot resolve from available evidence**
- **Decision Required**: Consciously decide how to implement
  - Option A: Create Add Project modal mirroring Add Task approach
  - Option B: Implement only viewing/editing of existing projects
  - Option C: Defer Add Project to Phase 2
- **My Recommendation**: NOT to be made by me - team must consciously decide

## 3. Dark Mode Full Implementation
- **Issue**: Figma screenshots show only Light mode; Dark mode CSS variables and full visual design missing
- **Conflict**: Structural CSS exists in globals.css; visual design does not
- **Cannot resolve from available evidence** - screenshots don't show Dark Mode UI
- **Decision Required**: Consciously decide how to implement
  - Option A: Use Tailwind's standard dark mode palette (background #0a0a0a, text #ededed)
  - Option B: Create custom dark mode color palette matching light mode semantics
  - Option C: Defer Dark Mode to post-MVP
- **My Recommendation**: NOT to be made by me - team must consciously decide

## 4. Color Mode Exact Application
- **Issue**: Color Modes (Amber/Blue/Pink/Rose/Emerald/Black) shown in sidebar menu, but "visible changes are not explicitly clear in the screenshots"
- **Conflict**: Menu exists; which UI elements change is undefined
- **Cannot resolve from available evidence** - need Figma inspection or team decision
- **Decision Required**: Consciously decide what Color Mode affects
  - Option A: Primary button colors only
  - Option B: Text colors, border colors, subtle background accents
  - Option C: Full theme switch with multiple color sematics
  - Option D: Defer Color Mode to Phase 2
- **My Recommendation**: NOT to be made by me - team must consciously decide

## 5. Responsive Design Breakpoints
- **Issue**: All 13 Figma screens are desktop viewports; no mobile/tablet designs exist
- **Conflict**: Assignment requires "Fully responsive UI"; no Figma evidence for mobile
- **Cannot resolve from available evidence** - must design responsive behavior
- **Decision Required**: Consciously decide responsive strategy
  - Option A: Sidebar collapses to hamburger below 768px; Kanboard stacks vertically; List view becomes full-width
  - Option B: Sidebar persists; Content reflows; Grid columns adjust (2→1 on mobile)
  - Option C: Separate mobile menu architecture
  - Option D: Mobile-first design with desktop as enhancement
- **My Recommendation**: NOT to be made by me - team must consciously decide

## 6. Drag & Drop Visual States
- **Issue**: 6-dot handle drag functionality confirmed, but hover/grabbing/drop-zone visuals missing from Figma
- **Conflict**: Functionality known; visual design not shown
- **Cannot resolve from available evidence** - need design decision
- **Decision Required**: Consciously decide visual states
  - Option A: Simple CSS hover (pointer + background change)
  - Option B: Animated grab cursor + outline during drag
  - Option C: Full dnd-kit visual patterns with ghost task preview
  - Option D: Minimal visual states, focus on functionality
- **My Recommendation**: NOT to be made by me - team must consciously decide

## 7. Empty State Designs
- **Issue**: No Figma evidence for what happens when there are no tasks
- **Conflict**: Assignment requires testing empty states; no Figma designs
- **Cannot resolve from available evidence** - must design from scratch
- **Decision Required**: Consciously decide empty state approach
  - Option A: Illustrative empty state with instructional text + CTA
  - Option B: Minimal text-only state
  - Option C: Placeholder task cards with "no tasks yet" message
  - Option D: Defer to post-MVP
- **My Recommendation**: NOT to be made by me - team must consciously decide

---

# Git Safety

> **As-of-creation note**: the Git status and commit counts in this section and in the
> Report below describe the repository when this document was written (2 commits,
> nothing committed yet). The repository now has many commits and the Figma docs are
> tracked; see `git log` and `docs/IMPLEMENTATION_ROADMAP.md` for current status.

## Pre-Commit Verification:

1. **Verify .gitignore** - Ensure .gitignore exists and properly excludes
   - `node_modules/`, `*.env`, `*.local`, `.next/`, `coverage/`, `.playwright/`
   - API keys in `.env` (groq and gemini keys) NEVER committed

2. **Ensure .env and all API keys/secrets can never be committed**
   - `.env` file exists at root with: `groq - gsk_[REDACTED]` and `gemini - AQ.[REDACTED]`
   - These are **NOT** to be committed
   - Verify `.gitignore` includes `.env`

3. **Do not commit Figma research screenshots** unless intentionally required
   - Screenshots can be referenced in docs but not committed as binary assets
   - If needed, compress to optimized formats or link to URLs

4. **Do not create a giant commit**
   - Each commit = one meaningful unit of work
   - Break features into smallest logical pieces

5. **Preserve the existing two commits**
   - `fe1c7fb` - chore: completed frontend setup with nextjs
   - `e70d245` - chore: project init with backend and frontend
   - Do not amend, squash, or rewrite these history

6. **Do not rewrite Git history**
   - Use `git commit` only for new work
   - Do not `git rebase` or `git reset` of existing commits

---

# Report

> **As-of-creation note**: the commit/status statements in this Report reflect the
> moment the docs were created and are historical (see the note above the Git Safety
> section). See `docs/IMPLEMENTATION_ROADMAP.md` for current status.

## Source-of-Truth Files Created:
1. `docs/FIGMA_VISUAL_SPEC.md` - Visual specification with Gemini screenshot analysis, marked VERIFIED/INFERRED/UNKNOWN with confidence levels
2. `docs/FIGMA_SOURCE_OF_TRUTH.md` - Consolidated source of truth combining existing reverse engineering with Gemini visual evidence

## Conflicts Found:
- **Add Task UI**: Neither Gemini nor structural research includes design; Figma comments confirm "not given"
- **Add Project UI**: Project views exist but creation flow not designed
- **Dark Mode**: Only Light mode visible in all 13 screenshots; Dark mode visual design missing
- **Color Mode Application**: Menu exists (Amber/Blue/Pink/Rose/Emerald/Black) but which elements change is undefined
- **Responsive Design**: All screenshots desktop; no mobile/tablet evidence
- **Drag & Drop Visual States**: Functionality confirmed; visual states not shown
- **Empty States**: No Figma designs for no-tasks scenarios
- **Mobile/Tablet Layouts**: Completely absent from Figma evidence

## Unknowns Remaining:
- Dark mode CSS variables and full visual implementation
- Add Task screen design (Figma confirms not given)
- Add Project screen design (not in Figma)
- Mobile/responsive layouts (must be designed from scratch)
- Color Mode exact application (which UI elements)
- Drag & Drop visual states (hover/grabbing/drop-zone)
- Mobile touch targets and navigation
- Profile Settings exact layout
- Drag reordering visual states beyond 6-dot handle
- Empty state designs for Kanban and List views

## Recommended First Implementation Milestone:
**Set up project foundations and application shell** (not features):
1. Verify Next.js dev server starts with Tailwind
2. Verify NestJS server starts with MongoDB connection
3. Implement Application Shell: Sidebar + Top Bar + Main Content area
4. Implement basic Theme toggle (Light/Dark)
5. Create git commit for foundation completion

**DO NOT start feature implementation (Task CRUD, theme switching, drag reordering) until:**
- Source-of-truth documents are reviewed and approved
- Decisions Required Before Implementation are consciously resolved
- Foundation is verified working

## Git Status:
- **Branch**: main
- **Existing commits**: 2 (fe1c7fb, e70d245) - preserved
- **Untracked files**: docs/FIGMA_VISUAL_SPEC.md, docs/FIGMA_SOURCE_OF_TRUTH.md, plus existing research files
- **No changes committed yet** - following git safety rules

The source-of-truth documents are now complete. STOP as instructed - do not configure MongoDB, do not create Task CRUD, do not create UI yet.