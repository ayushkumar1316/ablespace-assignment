export type ProjectStatus = "active" | "completed";

export interface ProjectMember {
  name: string;
  initials: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  dueDate: string;
  members: ProjectMember[];
  taskIds: string[];
}

export type ProjectFieldKey = "status" | "members" | "dueDate" | "tags";

export interface ProjectVisibleFields {
  status: boolean;
  members: boolean;
  dueDate: boolean;
  tags: boolean;
}

export const PROJECT_STATUSES: { key: ProjectStatus; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export const PROJECT_STATUS_STYLES: Record<ProjectStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-gray-100 text-gray-600",
};

export const DEFAULT_PROJECT_VISIBLE_FIELDS: ProjectVisibleFields = {
  status: true,
  members: true,
  dueDate: true,
  tags: true,
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Design Homepage",
    description:
      "Design and build the new homepage layout following the Figma spec.",
    status: "active",
    tags: ["Design", "UI"],
    dueDate: "2026-08-18",
    members: [
      { name: "Mandira Datta", initials: "MD" },
      { name: "Abhishek Yadav", initials: "AY" },
    ],
    taskIds: ["t1", "t9", "t11"],
  },
  {
    id: "p2",
    name: "Kanban Experience",
    description: "Improve the Kanban board with drag and drop and reordering.",
    status: "active",
    tags: ["Kanban", "Feature"],
    dueDate: "2026-08-16",
    members: [
      { name: "Aayush Thapa", initials: "AT" },
      { name: "Vinita Gurnani", initials: "VG" },
    ],
    taskIds: ["t2", "t5"],
  },
  {
    id: "p3",
    name: "Onboarding & Auth",
    description: "Login flows and project foundation for new users.",
    status: "completed",
    tags: ["Auth", "Setup"],
    dueDate: "2026-08-12",
    members: [
      { name: "Abhishek Yadav", initials: "AY" },
      { name: "Mandira Datta", initials: "MD" },
    ],
    taskIds: ["t8", "t10"],
  },
  {
    id: "p4",
    name: "Mobile Improvements",
    description: "Fix navigation and layout issues on small screens.",
    status: "active",
    tags: ["Bug", "Mobile"],
    dueDate: "2026-08-14",
    members: [
      { name: "Nitin Kumar", initials: "NK" },
      { name: "Aayush Thapa", initials: "AT" },
    ],
    taskIds: ["t4"],
  },
  {
    id: "p5",
    name: "Team Operations",
    description: "Documentation and review coordination across the team.",
    status: "active",
    tags: ["Docs", "Review"],
    dueDate: "2026-08-25",
    members: [
      { name: "Dipanjan Halder", initials: "DH" },
      { name: "Vinita Gurnani", initials: "VG" },
      { name: "Nitin Kumar", initials: "NK" },
    ],
    taskIds: ["t3", "t6"],
  },
  {
    id: "p6",
    name: "Frontend Polish",
    description: "Theme system, styling tokens, and app shell refinements.",
    status: "completed",
    tags: ["Theme", "Layout"],
    dueDate: "2026-08-20",
    members: [
      { name: "Suyash Shivam", initials: "SS" },
      { name: "Abhay", initials: "AB" },
    ],
    taskIds: ["t7"],
  },
];
