# Task 2 — AbleSpace Take Data: Product Understanding

**Candidate:** Ayush Kumar  
**Date:** August 2026  
**Source:** AbleSpace Assignment.docx (embedded Caseload screenshot)

---

## 1. Overview

This document analyzes the **AbleSpace Caseload screen** and the entry point to the **Take Data** workflow, based on the single screenshot provided in the assignment document.

Based on visible terminology (Caseload, IEP, Eval, OT, Service Time, Collaborators), AbleSpace appears to be a platform for managing student caseloads in an educational or therapeutic setting. The Caseload screen is the primary interface for viewing assigned students, checking due dates, and initiating data-collection sessions via the "Take Data" action.

**Source constraint:** The provided assignment contains one screenshot — the Caseload list view. The actual Take Data screen (form, fields, save flow, confirmation) is **not visible** in the source. This analysis covers only what is directly observed and reasonably inferred from the available material.

---

## 2. User Workflow

### Observed Workflow (Source-Supported)

| Step | Action | Evidence |
|------|--------|----------|
| 1 | User logs into AbleSpace | OBSERVED — sidebar shows logged-in state with user avatar |
| 2 | User clicks "Caseload" in sidebar | OBSERVED — Caseload is active/selected in navigation |
| 3 | Caseload screen loads with student table | OBSERVED — table with 8 visible rows, 15 total students |
| 4 | User identifies target student | OBSERVED — scan table by name, dates, school |
| 5 | User clicks "Take Data" button on student row | OBSERVED — blue outline button in Actions column |

### Inferred Workflow (Not Directly Observed)

| Step | Action | Basis |
|------|--------|-------|
| 6 | Take Data screen opens for selected student | INFERRED — button label implies navigation to data entry |
| 7 | User enters session data | INFERRED — "Take Data" = collect/record |
| 8 | User saves/submits | INFERRED — standard form pattern |
| 9 | User returns to Caseload | INFERRED — sidebar always visible |

> **Note:** Steps 6–9 are inferred from the product context and button label. The actual Take Data screen is not shown in the provided source.

---

## 3. Step-by-Step Walkthrough

### Step 1: Entry Point — Caseload Screen

The user lands on the Caseload screen, which is the second item under the **CAPTURE** section in the left sidebar.

**What the user sees:**

- **Page title:** "Caseload" with a verified/checkmark icon
- **Sub-tabs:** Students (15) | Groups (12) | Unassigned (39)
- **Search bar:** "Search students..." with ⌘+K keyboard shortcut
- **Add Student button:** Blue CTA, top-right
- **View toggle:** Grid/List icons (active state unclear)
- **Data table:** 9 columns with student records

> Source: `docs/task2-caseload-screenshot.png` — OBSERVED

---

### Step 2: Student Identification

The user scans the table to find the target student. The table displays:

| Column | Content | Format |
|--------|---------|--------|
| Checkbox | Bulk selection | ☐ |
| Full Name | Student first name (blue link) | Clickable |
| Last Name | Student last name | Plain text |
| IEP Due | IEP due date | MM/DD/YYYY or "—" |
| Eval Due | Evaluation due date | MM/DD/YYYY or "—" |
| Collaborators | Avatar stack with count | Colored circles + "+N" |
| Service Time | Therapy duration | Varies (see below) |
| School | School name | Plain text |
| Actions | Take Data button + overflow menu | Blue button + ⋮ |

> Source: `docs/task2-caseload-screenshot.png` — OBSERVED

---

### Step 3: Take Data Entry Point

The user clicks the **"Take Data"** button in the Actions column for the desired student.

**What is observed:**

- Button style: Blue outline, text-only (no icon)
- Position: Rightmost column, consistent across all rows
- Adjacent to: 3-dot overflow menu (⋮)
- First row ("Demo Student1") is highlighted with a red box in the source — indicating this is the primary interaction point

**What is NOT observed:**

- What happens after clicking
- The Take Data screen layout
- Form fields, save mechanism, or confirmation state

> Source: `docs/task2-caseload-screenshot.png` — OBSERVED

---

## 4. UI/UX Observations

### 4.1 Information Hierarchy

| Finding | Type | Evidence |
|---------|------|----------|
| "Caseload" title is largest text, bold, with verified icon | OBSERVED | Top of main area |
| Student name is blue link-style, visually primary | OBSERVED | Full Name column |
| Secondary info (dates, school) is plain black | OBSERVED | Consistent styling |
| Tab counts (15, 12, 39) provide quick overview | OBSERVED | Sub-tabs below title |

**Assessment:** Hierarchy is clear. Student name draws attention first, supporting the primary workflow of finding and selecting a student.

---

### 4.2 Navigation and Discoverability

| Finding | Type | Evidence |
|---------|------|----------|
| Sidebar has 3 sections: CAPTURE, TRACK, MISC | OBSERVED | Left navigation |
| Caseload is 2nd item in CAPTURE — prominent | OBSERVED | Active state highlighted |
| "Switch to Admin" toggle at top of sidebar | OBSERVED | Role-based view |
| 9+ sidebar items visible without scroll | OBSERVED | Dense navigation |

**Assessment:** Navigation is logically grouped by section (CAPTURE, TRACK, MISC). Sidebar density may overwhelm new users.

---

### 4.3 Take Data CTA Clarity

| Finding | Type | Evidence |
|---------|------|----------|
| "Take Data" is plain text, no icon | OBSERVED | Actions column |
| No tooltip or hover hint visible | OBSERVED | Static screenshot |
| Consistent placement across all rows | OBSERVED | Every row has it |
| 3-dot menu adjacent — hidden actions | OBSERVED | ⋮ icon next to button |

**Assessment:** The CTA is consistently placed but ambiguous. "Take Data" is domain-specific jargon. A tooltip or icon would clarify the action for users unfamiliar with the terminology.

---

### 4.4 Table Density and Readability

| Finding | Type | Evidence |
|---------|------|----------|
| 9 columns visible | OBSERVED | Full table width |
| Alternating row shading aids scanning | OBSERVED | Subtle background variation |
| Good vertical spacing between rows | OBSERVED | Consistent row height |
| 8 students visible without scrolling | OBSERVED | With 15 total, ~2 scrolls needed |

**Assessment:** Table is scannable but dense. The Last Name column is partially redundant with Full Name.

---

### 4.5 Search and Filtering

| Finding | Type | Evidence |
|---------|------|----------|
| Search by name only | OBSERVED | "Search students..." placeholder |
| ⌘+K keyboard shortcut | OBSERVED | Displayed in search bar |
| No filter controls visible | OBSERVED | No dropdowns, chips, or filters |
| No sort indicators on columns | OBSERVED | Column headers are plain text |

**Assessment:** Search is functional but limited. No filtering by School, Service Type, IEP status, or Collaborator. Clinicians managing multi-school caseloads cannot narrow their view.

---

### 4.6 Date and Service Time Presentation

| Finding | Type | Evidence |
|---------|------|----------|
| IEP Due format: MM/DD/YYYY | OBSERVED | "11/06/2024" |
| Eval Due format: MM/DD/YYYY or "—" | OBSERVED | "03/25/2020" or "—" |
| Service Time varies: "OT - 30mins/Wk" | OBSERVED | Row 1 |
| Service Time varies: "30 Mins/Week" | OBSERVED | Row 3 |
| Service Time shows "0" | OBSERVED | Rows 5-8 |
| All dates same color (black) | OBSERVED | No urgency distinction |

**Assessment:** Date formatting is inconsistent. "0" in Service Time is ambiguous — could mean no service, not recorded, or zero minutes. No visual urgency for overdue dates.

---

### 4.7 Collaborator Visibility

| Finding | Type | Evidence |
|---------|------|----------|
| Avatar stack with colored initials | OBSERVED | J, E, C, M, etc. |
| Count shown as "+N" | OBSERVED | +1, +3, +4 |
| No names visible on hover | OBSERVED (no hover state) | Static image |

**Assessment:** Avatar stack is efficient for showing team involvement at a glance. Collaborator names are not visible in the static screenshot — hover or click behavior is unknown.

---

### 4.8 Actions and Overflow Menu

| Finding | Type | Evidence |
|---------|------|----------|
| Take Data button on every row | OBSERVED | Consistent placement |
| 3-dot menu (⋮) adjacent to Take Data | OBSERVED | Small icon, no label |
| No label or tooltip on overflow menu | OBSERVED | Static image |

**Assessment:** The overflow menu is unlabeled. Only the Take Data action is explicitly visible; other actions are concealed behind the ⋮ icon.

---

### 4.9 Bulk Selection

| Finding | Type | Evidence |
|---------|------|----------|
| Checkbox column on every row | OBSERVED | Leftmost column |
| No "Select All" in header | OBSERVED | Header row has no checkbox |
| No bulk action bar visible | OBSERVED | No conditional UI |

**Assessment:** Checkboxes suggest bulk capability, but no bulk actions are visible. The UI implies functionality that is not surface-level accessible.

---

### 4.10 Empty / Loading / Error States

| Finding | Type | Evidence |
|---------|------|----------|
| No empty state visible | NOT OBSERVED | Data is populated |
| No loading spinner visible | NOT OBSERVED | Static image |
| No error message visible | NOT OBSERVED | Static image |

**Assessment:** Edge-case handling cannot be evaluated from the provided source.

---

### 4.11 Accessibility

| Finding | Type | Evidence |
|---------|------|----------|
| ⌘+K shortcut on search | OBSERVED | Keyboard accessible |
| Buttons appear focusable | OBSERVED | Standard HTML elements |
| No visible focus indicators | NOT OBSERVED | Static image |
| Tab order, ARIA labels unknown | NOT OBSERVED | Cannot verify from screenshot |

**Assessment:** Basic keyboard support is present. Full accessibility compliance cannot be verified from a static screenshot.

---

### 4.12 Responsive / Mobile

| Finding | Type | Evidence |
|---------|------|----------|
| Screenshot is desktop-width | OBSERVED | ~1200px+ |
| Sidebar is full-width | OBSERVED | Not collapsed |
| 9-column table won't fit on mobile | OBSERVED | Too many columns |
| Mobile layout not shown | NOT OBSERVED | No responsive view |

**Assessment:** Mobile behavior cannot be evaluated. The 9-column table is desktop-optimized and would require an alternative layout for smaller screens.

---

## 5. What Works Well

| # | Strength | Evidence |
|---|----------|----------|
| 1 | **Clear page identity** — "Caseload" title with verified icon | OBSERVED |
| 2 | **Logical sidebar grouping** — CAPTURE / TRACK sections | OBSERVED |
| 3 | **Consistent action pattern** — Take Data on every row | OBSERVED |
| 4 | **Tab-based overview** — Students/Groups/Unassigned with counts | OBSERVED |
| 5 | **Keyboard shortcut** — ⌘+K for search | OBSERVED |
| 6 | **Good row spacing** — table is scannable | OBSERVED |
| 7 | **Collaborator visibility** — avatar stack shows team at a glance | OBSERVED |
| 8 | **Add Student prominent** — blue CTA stands out | OBSERVED |
| 9 | **Student name as link** — clear click affordance | OBSERVED |
| 10 | **Alternating row shading** — aids scanning | OBSERVED |

---

## 6. Improvement Opportunities

### 6.1 IEP/Eval Due-Date Urgency (HIGH IMPACT)

**Problem:** All dates display in uniform black text. No visual distinction between overdue, upcoming, and far-future dates.

**Evidence:** IEP Due "11/06/2024" and Eval Due "03/25/2020" appear identical in styling. No color, badge, or icon indicates urgency.

**User Impact:** Clinician must manually read and compare every date. Risk of missing critical IEP/Eval deadlines, which may have compliance or scheduling consequences.

**Recommended Improvement:** Color-code dates: red for overdue, amber for due within 7 days, default black for future. Add "Overdue" or "Due soon" badges.

**Priority:** HIGH

---

### 6.2 Caseload Filtering Controls (HIGH IMPACT)

**Problem:** Users can only search by student name. No filtering by School, Service Type, IEP status, or Collaborator.

**Evidence:** Only a search input visible. No dropdowns, chips, or filter UI. Table shows students across multiple schools with no way to isolate one.

**User Impact:** Clinician with students in 3 schools must manually scan entire list. Cannot quickly see "all students needing OT."

**Recommended Improvement:** Add filter bar with dropdowns: School, Service Type, IEP Status, Collaborator. Show active filters as removable chips.

**Priority:** HIGH

---

### 6.3 Service Time Format Normalization (MEDIUM IMPACT)

**Problem:** Service Time displays three different formats: "OT - 30mins/Wk", "30 Mins/Week", and "0". The value "0" is ambiguous.

**Evidence:** Row 1: "OT - 30mins/Wk". Row 3: "30 Mins/Week". Rows 5-8: "0". No legend explains what "0" means.

**User Impact:** "0" creates confusion — is this an error or legitimate? Inconsistent formatting makes scanning difficult.

**Recommended Improvement:** Standardize format to "[Type] - [Duration]/[Frequency]". Replace "0" with "—" or "No service scheduled".

**Priority:** MEDIUM

---

### 6.4 Bulk Selection and Actions (MEDIUM IMPACT)

**Problem:** Checkboxes exist but no "Select All" or bulk action bar is visible.

**Evidence:** Checkbox column on every row. Header has no checkbox. No conditional action bar appears when items are checked.

**User Impact:** Bulk selection is indicated but bulk actions are not surface-level accessible.

**Recommended Improvement:** Add "Select All" in header. Show conditional bulk action bar: Assign Collaborator, Export, Delete.

**Priority:** MEDIUM

---

### 6.5 Take Data CTA Clarity (MEDIUM IMPACT)

**Problem:** "Take Data" is ambiguous. No icon, tooltip, or hint explains what happens after clicking.

**Evidence:** Plain text button, no supporting visual. Domain-specific jargon.

**User Impact:** The action's purpose may not be immediately clear without additional context or labeling.

**Recommended Improvement:** Add tooltip: "Record session data for [Student Name]". Consider clipboard icon + label.

**Priority:** MEDIUM

---

### 6.6 Last Name Column Redundancy (LOW IMPACT)

**Problem:** "Full Name" and "Last Name" columns show overlapping information.

**Evidence:** "Demo Student1" / "Student1" — last name is second word of full name. Pattern holds for all rows.

**User Impact:** Extra column wastes horizontal space. No unique information.

**Recommended Improvement:** Merge into single "Name" column or make Last Name collapsible.

**Priority:** LOW

---

### 6.7 Overflow Menu Discoverability (LOW IMPACT)

**Problem:** 3-dot menu has no label or tooltip. Users may not know more actions exist.

**Evidence:** Small ⋮ icon, no text label, no hover state visible.

**User Impact:** Only the primary action (Take Data) is visible; secondary actions are concealed.

**Recommended Improvement:** Label as "More actions" or add tooltip on hover.

**Priority:** LOW

---

### 6.8 Grid/List Toggle Active State (LOW IMPACT)

**Problem:** Two view-toggle icons have no active indicator.

**Evidence:** Grid and list icons visible, no styling shows which is selected.

**User Impact:** User cannot confirm current view mode.

**Recommended Improvement:** Add filled background or border on active toggle.

**Priority:** LOW

---

## 7. Recommended Improvements

| Priority | # | Recommendation | Impact | Effort |
|----------|---|---------------|--------|--------|
| P0 | 1 | IEP/Eval due-date urgency color-coding | HIGH | LOW |
| P0 | 2 | Caseload filtering controls | HIGH | MEDIUM |
| P1 | 3 | Service Time format normalization | MEDIUM | LOW |
| P1 | 4 | Bulk selection + actions bar | MEDIUM | MEDIUM |
| P1 | 5 | Take Data CTA tooltip/clarity | MEDIUM | LOW |
| P2 | 6 | Last Name column redundancy | LOW | LOW |
| P2 | 7 | Overflow menu label/discoverability | LOW | LOW |
| P2 | 8 | Grid/List toggle active state | LOW | LOW |

---

## 8. What Remains Unknown

| # | Unknown | Impact |
|---|---------|--------|
| 1 | **Take Data screen layout and fields** | Cannot analyze core workflow |
| 2 | **Take Data form fields** | Don't know what data is collected |
| 3 | **Save/submit mechanism** | Don't know if auto-save, button, or multi-step |
| 4 | **Confirmation/success state** | Don't know what happens after save |
| 5 | **Error handling** | Don't know validation behavior |
| 6 | **3-dot menu contents** | Don't know what other actions exist |
| 7 | **Groups/Unassigned tab views** | Don't know how they differ |
| 8 | **Mobile/responsive behavior** | Don't know current implementation |
| 9 | **Role differences** (Admin vs default) | Don't know what Switch to Admin changes |
| 10 | **Loading/empty/error states** | Cannot evaluate edge-case handling |

> **Note:** The actual Take Data screen, its form fields, save mechanism, and confirmation state were **not present in the provided source** and therefore were **not fabricated or evaluated** in this analysis.

---

## 9. Limitations

This analysis is constrained by the available source material:

- **One screenshot** — the Caseload list view from the assignment docx
- **No Take Data screen** — the core workflow screen is missing
- **No interactive product** — cannot test clicks, hovers, or navigation
- **No mobile view** — responsive behavior is unknown
- **No error/empty states** — edge cases are unobservable

All recommendations are based on the visible Caseload screen only. Recommendations for the Take Data workflow would require additional source material.

---

## 10. Conclusion

The AbleSpace Caseload screen demonstrates solid foundational design:

- **Clear information hierarchy** — student name is primary, secondary data is properly weighted
- **Consistent action pattern** — Take Data is predictable across all rows
- **Logical navigation** — CAPTURE / TRACK sidebar grouping is intuitive
- **Efficient data display** — avatar stacks, tab counts, keyboard shortcuts

The primary opportunities are in **data-awareness** (urgency signals for dates, consistent formatting) and **efficiency multipliers** (filtering, bulk actions). These are not structural problems — they are enhancements to an already-functional interface.

The core limitation of this analysis is the absence of the Take Data screen. Without it, recommendations are confined to the Caseload list. A complete product understanding would require the actual data-entry workflow, save mechanism, and confirmation flow.

---

**Source files:**
- `docs/task2-caseload-screenshot.png` — Original screenshot from assignment docx
- `AbleSpace Assignment.docx` — Primary requirement source

**Document version:** 1.0  
**Last updated:** August 2026
