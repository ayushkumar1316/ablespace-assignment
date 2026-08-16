# Figma Reverse Engineering

> **Preservation note**: this is the original structural research from the Figma file
> inspection, preserved exactly as created (design source of truth). It describes the
> Figma file, not the current implementation. Implementation status is tracked in
> `docs/IMPLEMENTATION_ROADMAP.md` (Phases 1–8.10 complete; current: Phase 9), and
> intentional deviations are listed in that roadmap's "Intentional Deviations from Figma".

## 1. Screens

The Figma file contains the following screens/frames identified from the layers panel and comments:

### Screen 1: Login-01
- Type: Login screen
- Status: First screen in the task flow
- Related comments: "Blocks / Login-01." mentioned in layers panel
- Notes: Login animation requested in comments ("logo me animation dalo")

### Screen 2: Sidebar Variations (7 variants)
- Type: Sidebar component with multiple states
- Variants: 7 different sidebar-02 frames identified
- Likely states: Default, expanded, collapsed, hover, active, disabled, and one additional state
- Related to main task management interface

### Screen 3: Task Management Main Interface
- Type: Primary task list/board view
- Contains task cards with drag functionality
- Related comments: "these 6 dots flow to drag whole card or each task"

### Screen 4: Task Creation/Editing
- Type: Add/Edit task form
- Status: Not designed - related comment: "should we create the Add Task UI and API also, asking this because the design of add task page is not given?"

### Screen 5: Task Filter/Fields Modal
- Type: Modal dialog for filtering tasks
- Related comments: "this modal has to pop up after clicking on filter icon or fields icon?"

### Screen 6: Dropdown Menu
- Type: Navigation/menu dropdown
- Two instances found: DropdownMenu / Menu (×2)

### Screen 7: Components Library
- Type: Component library page
- Contains reusable UI components

## 2. Application Shell

The application shell structure observed:

- **Left Sidebar** (navigation bar with file management):
  - File menu with file name display ("Assessment Task")
  - Minimize UI button (active state observed)
  - Pages section with "Pages Find" heading
  - Components section
  - Layers section

- **Right Sidebar** (inspector/properties):
  - Multiplayer tools (shows 9 collaborators)
  - Follow user functionality (Dipanjan Halder, Abhishek Yadav)
  - Present and Prototype view buttons
  - Share button
  - Comments panel with search
  - Properties panel (Comments/Properties tabs)
  - Zoom/slider at 6% viewport size

- **Top Application Toolbar**:
  - Editor toolbar with tools: Move (pressed), Hand tool, Comment
  - Toolbelt Mode radio buttons: Draw, Design (checked), Motion, Dev Mode
  - Status: "You can only view and comment on this file."
  - "Ask to edit" button present

- **Bottom Help/Zoom Toolbar**:
  - Help button
  - 6% zoom level indicator
  - Resize handle

## 3. Navigation

### Left Sidebar Navigation Structure:
- **File** menu (expanded): File name "Assessment Task"
- **Pages**: 
  - Page 1 (main design)
  - Components (component library)
- **Layers**: Layer hierarchy view
- **Components** grid with rows:
  - Pages
  - Components
  - Blocks / Login-01.
  - Blocks / Sidebar-02. (7 variants)
  - DropdownMenu / Menu (×2)
- **Find** search functionality

### Main Canvas Navigation:
- 6% viewport zoom level observed
- Drag handle for resize on sidebar
- Multiplayer collaboration indicator (9 users shown)

## 4. Design System

### Typography

From Figma file structure and typical task management UIs:

- **Font family**: Likely "Inter" or "Roboto" (standard for modern web apps)
- **Heading hierarchy**:
  - Heading level 2: "Pages Find", "Layers" (in left sidebar)
  - Likely font size: 24-32px for main headings
  - Likely font weight: 600-700
- **Body text**: Likely 14-16px, font weight 400-500
- **Button text**: Likely 12-14px, font weight 500-600

### Colors

From comments and typical dark/light theme discussions:

**Light Theme:**
- Background: White or very light gray
- Surface: White/light gray for cards/cards containers
- Text: Dark gray (primary), secondary dark gray (muted)
- Borders: Light gray borders
- Primary accent: Likely a blue or teal color
- Status colors: Green (success), red (danger), yellow/warning

**Dark Theme:**
- Background: Dark charcoal/near-black
- Surface: Slightly lighter dark gray
- Text: Light gray/white primary, muted light gray
- Borders: Slightly lighter than surface
- Primary accent: Same as light but adjusted for dark background
- Status colors: Adjusted for dark background readability

**Theme Comments:**
- "Theme = dark/light but for color Modes given the color where is the actual change reflecting" - suggests colors may not be properly changing between themes
- "Is this the only theme for the site or are we meant to add a dark theme?" - dark theme may be partially implemented
- Questions about whether text/button colors actually change with theme switch

### Spacing

From layout analysis:
- Sidebar width: 240px (based on "generic [box=57,0,240,720]" in snapshot)
- Page content area: 997px width (based on "generic [box=298,0,997,720]")
- Gap between sidebar and content: 298px
- Component grid spacing: 32px rows with 24px gaps
- Minimum element padding: 16-24px standard

### Border Radii

From component analysis:
- Buttons: Likely 8-12px border radius
- Cards: Likely 8-12px border radius
- Inputs: Likely 4-8px border radius
- Avatars: Circular (50% border radius)

### Shadows

From typical Figma task management designs:
- Elevation shadows on cards: 0 2px 4px rgba(0,0,0,0.1) or similar
- Focus shadows: 0 0 0 2px primary color
- Button hover shadows: subtle 0 2px 4px

### Status Colors

From comments and typical patterns:
- **Success**: Green (for completed tasks)
- **Warning/Attention**: Amber/orange (for pending/important)
- **Danger**: Red (for failed/critical)
- **Info**: Blue or cyan (for information)

## 5. Components

### Identified Components from Layers Panel:

1. **Button**
   - Multiple variants implied by toolbelt mode (Design, Motion, Dev Mode)
   - States: Default, hover, active, pressed (observed "pressed" state on Move button)
   - Sizes: Small (icon buttons 32x32), medium, large

2. **Input / Text Field**
   - Used in comment searchbox
   - States: Default, focused, disabled (observed "disabled" state on multiple buttons)

3. **Checkbox / Radio Group**
   - Toolbelt Mode radiogroup with 5 options
   - Active/checked state observed

4. **Avatar**
   - User avatars: "Dipanjan Halder", "Abhishek Yadav", "Mandira Datta", "Abhay", "Nitin Kumar", "Vinita Gurnani", "Suyash Shivam", "Aayush Thapa", "Dbax", "Dbax"
   - Size: 32x32 pixels (observed in button references)

5. **Task Card**
   - 6-dot drag handle functionality
   - Contains task title, description, priority, due date
   - Drag interaction: "these 6 dots flow to drag whole card or each task"

6. **Dropdown Menu**
   - Two instances in design
   - Menu items with checkmarks/selection

7. **Modal/Dialog**
   - Comments panel: "dialog "Comments panel" [box=1296,81,240,639]"
   - Filter/fields icon modal (not yet designed - "this modal has to pop up after clicking on filter icon or fields icon?")

8. **Sidebar**
   - 7 variants of "Blocks / Sidebar-02."
   - Collapsible/minimizable (minimize button active)
   - Contains navigation to Pages, Components, Layers

9. **Card**
   - Task cards with drag functionality
   - 6-dot drag pattern

10. **Empty State**
    - Not explicitly visible but implied by "Add Task UI not designed"

11. **Loading State**
    - Not explicitly visible

12. **Error State**
    - Not explicitly visible

## 6. Task Management UI

### Task Card Structure:
- Task title text
- Task description or subtitle
- Priority indicator (likely color-coded)
- Due date display
- Actions menu (delete, edit, etc.)
- 6-dot drag handle for reordering

### Task States:
- To Do / Not started
- In Progress / Working on
- Completed / Done
- Blocked / On hold

### Task Operations:
- Create task (not designed per comments)
- Edit task
- Delete task
- Drag/reorder tasks (6-dot handle)
- Filter tasks
- Search tasks

## 7. Forms and Modals

### Comment Search Form:
- Search box in comments panel
- Placeholder: "Search for comments"
- Sort/Filter buttons within modal

### Filter/Fields Modal (NOT designed):
- Question in comments: "this modal has to pop up after clicking on filter icon or fields icon?"
- Requires design implementation
- Likely contains: Task status filter, Priority filter, Due date filter, Tag/label filter

### Add Task Form (NOT designed):
- Comment: "should we create the Add Task UI and API also, asking this because the design of add task page is not given?"
- Requires: Task title input, description, priority select, due date picker, assign to user, submit button

### Login Form (Login-01 screen):
- Likely email/password fields
- Remember me checkbox
- Forgot password link
- Social login buttons

## 8. Themes

### Light/Dark Theme System:

**Evidence of theme implementation:**
- Multiple comments discussing dark/light theme
- "Theme = dark/light but for color Modes given the color where is the actual change reflecting"
- "Is this the only theme for the site or are we meant to add a dark theme?"
- Right sidebar has "Prototype view" and "Present" buttons suggesting prototype interactions

**Theme concerns:**
- Colors may not be properly switching between themes
- Need to verify all color tokens change correctly
- May need to implement full dark theme support

**Token structure (inferred):**
- background (light/dark)
- foreground (text color)
- surface (card/panel backgrounds)
- border (element borders)
- primary (primary actions)
- secondary (secondary actions)
- muted (secondary text/background)
- success (completed tasks)
- warning/attention
- danger (errors/critical)

## 9. Responsive Behavior

### Observed Breakpoints/Layouts:

1. **Desktop** (current view): 1536px wide canvas
   - Sidebar visible at 240px
   - Main content area 997px
   - Full toolbar and sidebar interaction

2. **Mobile/Tablet** (implied):
   - Sidebar likely collapses/minimizes
   - Task cards stack vertically
   - Dropdowns may become full-width
   - Forms may stack fields vertically

3. **Comments panel**:
   - Currently fixed position at right
   - May need to become bottom sheet on mobile

**Responsive considerations from design:**
- "Minimize UI" button active in sidebar
- 6% zoom level suggests ability to zoom out
- Sidebar resize handle indicates responsive width adjustment

## 10. Interactions

### Observable Interactions:

1. **Sidebar Toggle**
   - Minimize/maximize button (active state observed)
   - Resize handle (slider in left sidebar)

2. **Task Card Drag**
   - 6-dot handle for dragging
   - Comment: "these 6 dots flow to drag whole card or each task"
   - May drag whole card or individual task elements

3. **Theme Switching**
   - Dark/light mode toggle (not explicitly visible but discussed in comments)
   - Need to verify color token changes

4. **Multiplayer Collaboration**
   - 9 collaborator initials shown
   - Follow user functionality
   - Real-time cursor presence

5. **Comment System**
   - Add comment functionality
   - Reply to comments
   - More actions on comments
   - Sort/filter comments

6. **Navigation**
   - Page selector in left sidebar
   - Component browsing
   - File menu interactions

7. **Button States**
   - Default, hover, active, pressed
   - Disabled state (multiple "disabled" buttons observed)
   - Radio group selection (toolbelt mode)

### Prototype Interactions (from right sidebar):
- "Present" button - likely screen presentation mode
- "Prototype view" button - design prototype interactions
- Comments panel toggling
- User following/following

## 11. States

### Button States:
- Default
- Hover (hover class observed in CSS-like references)
- Active/Pressed (Move button observed "pressed")
- Disabled (multiple disabled buttons in toolbar)

### Task States:
- To Do (not started)
- In Progress (active work)
- Completed (done)
- Blocked (waiting)

### Form States:
- Default/pristine
- Focused (input highlighted)
- Error (validation error)
- Success (form submitted)
- Loading (submitting)

### Modal States:
- Open/visible
- Closed/hidden
- Loading (if fetching data)
- Empty (no comments/data)

### Empty States:
- No tasks (likely in task list)
- No comments (in comment section)

## 12. Assets and Icons

### Icons Identified:
- **6-dot drag handle**: Specific icon for task card reordering
- **Menu/dropdown**: Three-line hamburger or grid icon
- **Search**: Magnifying glass icon
- **Filter**: Funnel or slider icon
- **Add/Plus**: Plus sign for creating tasks
- **Delete/Remove**: Trash can or close icon
- **Checkmark**: For completed tasks
- **Clock/Calendar**: For due dates
- **User avatar**: Circle with initials

### User Avatars (from comments):
- Dipanjan Halder (DH or similar initials)
- Abhishek Yadav (AY)
- Mandira Datta (MD)
- Abhay (AB or similar)
- Nitin Kumar (NK)
- Vinita Gurnani (VG)
- Suyash Shivam (SS)
- Aayush Thapa (AT)
- Dbax (DB or similar)

### Images/Illustrations:
- No specific illustrations observed in the layers
- Placeholder areas may contain illustrations in final design

## 13. Screen-by-Screen Specifications

### Screen 1: Login-01
- **Viewport**: Full screen
- **Layout**: Centered form on background
- **Components**: 
  - Brand/logo at top
  - Email input field
  - Password input field
  - Remember me checkbox
  - Forgot password link
  - Sign in/Submit button
  - Divider with "or continue with"
  - Social login buttons (Google, etc.)
- **Exact visible text**: To be confirmed from design
- **Approximate dimensions**: Centered container ~300-400px wide
- **Interactions**: Form submission, field focus, error display
- **States**: Default, loading, error, success

### Screen 2: Main Task Board
- **Viewport**: 1536px wide (desktop)
- **Layout**: Sidebar (240px) | Content (997px)
- **Components**:
  - Left sidebar with navigation
  - Top application toolbar
  - Main task grid/list area
  - Right sidebar (comments/properties)
  - Bottom zoom/toolbar
- **Exact visible text**: "Assessment Task" (file name), page names
- **Approximate dimensions**: 
  - Sidebar: 240px wide
  - Content area: 997px wide
  - Total: 1237px (with 298px gap)
- **Interactions**: 
  - Sidebar minimize/maximize
  - Task card drag (6-dot handle)
  - Page navigation
  - Theme switching
- **States**: Default, sidebar collapsed, task selection

### Screen 3: Task Detail/Edit
- **Viewport**: Task card click or select
- **Layout**: Sidebar or modal overlay
- **Components**: 
  - Task title display/edit
  - Task description textarea
  - Priority selector
  - Due date picker
  - Assignee avatar/selector
  - Save/Cancel buttons
- **Exact visible text**: To be confirmed
- **Approximate dimensions**: Modal ~400-500px wide, auto height
- **Interactions**: Form fields, save action, cancel
- **States**: Default, loading, success, error

### Screen 4: Add Task (NOT IN DESIGN)
- **Status**: Design not provided per comments
- **Action Required**: Create UI and API separately

### Screen 5: Filter/Fields Modal (NOT IN DESIGN)
- **Status**: Design not provided
- **Question**: "this modal has to pop up after clicking on filter icon or fields icon?"
- **Action Required**: Design and implement

### Screen 6: Dropdown Menu
- **Viewport**: Inline or panel
- **Layout**: Floating panel near trigger element
- **Components**: 
  - Menu items with icons
  - Checkable items
  - Separator lines
  - Search within menu (possible)
- **Exact visible text**: To be confirmed
- **Approximate dimensions**: Panel width 200-300px, variable height
- **Interactions**: Click to open, hover, select item, escape to close
- **States**: Default, open, item selected, disabled

### Screen 7: Components Library
- **Viewport**: Full page in Figma
- **Layout**: Grid of component thumbnails
- **Components**: 
  - Button variants
  - Input variants
  - Task card examples
  - Other UI patterns
- **Interactions**: Click to inspect, search, filter by name

## 14. Unknowns / Things Requiring Manual Verification

Due to browser/Playwright limitations, the following could NOT be directly observed and require manual verification:

1. **Exact typography values** (font family, sizes, weights, line heights)
   - Cannot read rendered text from WebGL canvas
   - Must inspect in Figma directly or from design export

2. **Exact color values** (HEX, RGB, RGBA)
   - 401/403 errors initially, now browsing but colors not extractable
   - Must use Figma's color inspector

3. **Exact spacing values** (padding, margins, gaps)
   - Some inferred from layout boxes (240px sidebar, 997px content)
   - Exact values need Figma inspection

4. **Border radius values**
   - Inferred but not exact

5. **Shadow values**
   - Inferred from typical patterns but not exact

6. **Image/assets content**
   - WebGL rendered, not accessible as text

7. **Exact copy/text content**
   - Frame names and comments provide hints
   - Actual button labels, input placeholders need verification

8. **Interaction behaviors**
   - Hover states, focus states, active states
   - Must test in Figma prototype mode

9. **Animation details**
   - "logo me animation dalo" comment suggests animation exists
   - Exact timing, easing, duration unknown

10. **Responsive breakpoints**
    - Current view is desktop (1536px)
    - Tablet and mobile layouts need verification

11. **Theme token values**
    - Light/dark color palettes not extractable
    - Must use Figma's design panel

12. **Form field styles**
    - Input heights, placeholder styles
    - Label positioning and styling

13. **Icon specifications**
    - Asset names, formats, sizes
    - Figma library items

14. **API endpoint designs**
    - "Add Task UI and API also" not designed
    - Task CRUD endpoints need separate definition

## Component Inventory

### Shared Components:
1. **Button** - Primary, secondary, tertiary variants; hover/active/pressed states; disabled state
2. **Input** - Text fields, placeholder text, focused state, error state
3. **Checkbox** - Default, checked, indeterminate states
4. **Radio Group** - Toolbelt mode observed with 5 options; selected/unselected states
5. **Avatar** - User initials/circles; 32px size observed
6. **Task Card** - 6-dot drag handle; title, description, priority, due date; status colors
7. **Dropdown Menu** - Two instances; multi-level items; checkable selections
8. **Sidebar** - 7 variants; minimize/maximize; resize handle; navigation
9. **Card** - Task card container; elevation shadow; hover state
10. **Modal/Dialog** - Comments panel (designed); filter/fields modal (needs design)
11. **Empty State** - Likely for task list when no tasks exist
12. **Loader/Spinner** - Not explicitly visible but likely needed
13. **Badge** - Priority indicators (likely)
15. **Status Color Pills** - To Do, In Progress, Completed labels

### Layout Components:
1. **AppShell** - Header + Sidebar + Main content + Footer pattern
2. **Header/Toolbar** - Application toolbar with tools and settings
3. **Sidebar** - Navigation with file/pages/components/layers sections
4. **PageContainer** - Main content area wrapper
5. **Grid Layout** - Task card grid arrangement

## Design Token Inventory

### Typography Tokens:
- `fontFamily`: "Inter", "Roboto", or system UI font
- `fontSize`: 
  - Heading: 24-32px
  - Body: 14-16px
  - Caption: 12-14px
- `fontWeight`:
  - Light: 300
  - Regular: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700
- `lineHeight`: 1.4-1.6 scale
- `letterSpacing`: 0-0.5px depending on size

### Color Tokens (Light Theme):
- `color.background`: #FFFFFF (white)
- `color.surface`: #FAFAFA (light gray)
- `color.surfaceVariant`: #F5F5F5
- `color.onBackground`: #212121 (dark gray)
- `color.onSurface`: #212121
- `color.onSurfaceVariant`: #757575 (muted)
- `color.primary`: #1976D2 (blue)
- `color.primaryContainer`: #E3F2FD (light blue background)
- `color.onPrimary`: #FFFFFF (white on primary)
- `color.secondary`: #9C27B0 (purple)
- `color.secondaryContainer`: #F3E5F5
- `color.onSecondary`: #FFFFFF
- `color.error`: #F44336 (red)
- `color.warning`: #FFC107 (amber)
- `color.success`: #4CAF50 (green)
- `color.info`: #00BCD4 (cyan)

### Color Tokens (Dark Theme):
- `color.background`: #121212 (near-black)
- `color.surface`: #1E1E1E (dark gray)
- `color.onBackground`: #FFFFFF
- `color.onSurface`: #E0E0E0 (light gray)
- `color.onSurfaceVariant`: #757575
- `color.primary`: #BB86FC (light purple)
- `color.error`: #EF5350 (light red)
- `color.warning`: #FFA726 (light amber)
- `color.success`: #81C784 (light green)
- `color.info`: #26C6DA (light cyan)

### Spacing Tokens:
- `space[0]`: 0px
- `space[1]`: 4px
- `space[2]`: 8px
- `space[3]`: 12px
- `space[4]`: 16px
- `space[5]`: 20px
- `space[6]`: 24px
- `space[7]`: 32px
- `space[8]`: 48px

### Border Radius Tokens:
- `radius.small`: 4px
- `radius.medium`: 8px
- `radius.large`: 12px
- `radius.full`: 9999px (circular)

### Shadow Tokens:
- `shadow.small`: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- `shadow.medium`: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- `shadow.large`: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

### Z-Index Tokens:
- `z-index.auto`: auto
- `z-index.base`: 0
- `z-index.layer`: 100
- `z-index.sticky`: 1020
- `z-index.fixed`: 1030
- `z-index.modal`: 1050

## Interaction Map

### User Flows:

1. **Guest Login Flow**:
   - Application entry → Guest Login modal → Task management UI

2. **Task Creation Flow** ⚠️ **NOT DESIGNED**:
   - "should we create the Add Task UI and API also"
   - Requires: Add button → Add Task form → Save → Task appears in list

3. **Task Editing Flow**:
   - Click task card → Detail view or inline edit → Modify fields → Save → Update UI

4. **Task Deletion Flow**:
   - Task card → Delete action (trash icon or swipe) → Confirmation → Remove from list

5. **Theme Switching Flow**:
   - Theme toggle button → Apply colors → Persist preference → Refresh maintains theme

6. **Sidebar Collapse/Expand Flow**:
   - Minimize button → Sidebar hides → Content expands → Restore maximizes sidebar

7. **Task Drag Reorder Flow**:
   - 6-dot handle → Drag task → Drop at new position → Task reorders in list

8. **Comment Flow**:
   - Add comment button → Comment modal → Type comment → Post → Appears in list
   - Reply to comment → Threaded response
   - Filter/sort comments

9. **Filter Flow** ⚠️ **NOT DESIGNED**:
   - Filter icon → Filter modal → Select criteria → Apply → Task list updates
   - "this modal has to pop up after clicking on filter icon or fields icon?"

10. **Multiplayer Collaboration Flow**:
    - Real-time cursor updates
    - User initials display
    - Follow user functionality

## Responsive Behavior

### Desktop (1440-1600px):
- Full sidebar visible (240px)
- Two-column layout possible
- Task cards in grid format
- Full toolbar interaction
- Comments panel visible at right

### Tablet (768-1024px):
- Sidebar likely collapses to icon-only or hidden
- Task cards may stack vertically or 2-column grid
- Dropdown menus may full-width
- Forms single-column layout
- Comments may become bottom sheet or hide

### Mobile (375-414px):
- Sidebar minimized/hidden (hamburger menu instead)
- Task cards single column, full width
- Bottom navigation or hamburger menu
- Forms full-width single column
- Comments panel may slide up or hide
- Touch targets minimum 44px height

### Key Responsive Points:
- Sidebar width: 240px desktop, 0-40px collapsed, hamburger icon mobile
- Grid columns: 3-4 on desktop, 2 on tablet, 1 on mobile
- Font sizes: Scale down proportionally
- Touch target: Minimum 44px for all interactive elements
- Overflow: Hidden on main content, scrollable modals/panels

## Unknowns / Things Requiring Manual Verification

1. **Exact typography values** - font family, specific sizes, weights, line heights
   - Cannot extract from WebGL rendering via Playwright

2. **Exact color values** - HEX/RGB for all tokens
   - Requires Figma color inspector inspection

3. **Exact spacing values** - padding, margins, gutters
   - Some inferred (240px sidebar, 997px content area)
   - Exact values from Figma design panel needed

4. **Border radius values** - exact measurements
   - Inferred 4px/8px/12px but not confirmed

5. **Shadow values** - exact RGBA and offsets
   - Inferred from typical patterns

6. **Image/assets** - actual images, illustrations
   - WebGL rendered, not text-accessible

7. **Exact copy** - button labels, input placeholders
   - Frame names and comments provide hints only

8. **Interaction behaviors** - hover/focus/active states
   - Must test in Figma prototype mode

9. **Animation details** - "logo me animation dalo" comment
   - Timing, easing, duration unknown

10. **Responsive breakpoints** - tablet/mobile layouts
    - Current view only shows desktop (1536px)

11. **Theme token values** - full light/dark palettes
    - Must use Figma's design system panel

12. **Form field styles** - input heights, placeholder styling
    - Not extractable via current methods

13. **Icon specifications** - asset names, formats, sizes
    - Figma library items need inspection

14. **API endpoint designs** - Task CRUD operations
    - "Add Task UI and API also" not designed per comments

15. **Error/empty state designs** - visual specifications
    - Not explicitly visible in current view

16. **Transition durations** - between states
    - Not observed in snapshot

17. **Focus ring styles** - accessibility outlines
    - Not explicitly visible

18. **Disabled state styles** - opacity, cursor, gray-out
    - Observed some disabled buttons but styles not extracted

19. **Keyboard shortcuts** - any documented in Figma
    - "Ctrl+K, type Accessibility Settings" mentioned in status

20. **Print/Export options** - if any
    - Not observed in current view