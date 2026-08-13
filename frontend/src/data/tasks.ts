export type TaskStatus = "todo" | "doing" | "completed";

export type TaskPriority = "urgent" | "high" | "medium" | "low";

export type FieldKey = "priority" | "tags" | "dueDate" | "assignee";

export interface VisibleFields {
  priority: boolean;
  tags: boolean;
  dueDate: boolean;
  assignee: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  dueDate: string;
  assignee: string;
  assigneeInitials: string;
}

export const STATUSES: { key: TaskStatus; label: string }[] = [
  { key: "todo", label: "To Do" },
  { key: "doing", label: "Doing" },
  { key: "completed", label: "Completed" },
];

export const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; badgeClass: string; dotClass: string }
> = {
  urgent: {
    label: "Urgent",
    badgeClass: "bg-red-100 text-red-700",
    dotClass: "bg-red-500",
  },
  high: {
    label: "High",
    badgeClass: "bg-orange-100 text-orange-700",
    dotClass: "bg-orange-500",
  },
  medium: {
    label: "Medium",
    badgeClass: "bg-yellow-100 text-yellow-800",
    dotClass: "bg-yellow-500",
  },
  low: {
    label: "Low",
    badgeClass: "bg-gray-100 text-gray-600",
    dotClass: "bg-gray-400",
  },
};

export const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-teal-500",
];

export const DEFAULT_VISIBLE_FIELDS: VisibleFields = {
  priority: true,
  tags: true,
  dueDate: true,
  assignee: true,
};

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const TASKS: Task[] = [
  {
    id: "t1",
    title: "Design Homepage",
    description: "Create the homepage layout following the Figma design.",
    status: "todo",
    priority: "high",
    tags: ["Design", "UI"],
    dueDate: "2026-08-18",
    assignee: "Mandira Datta",
    assigneeInitials: "MD",
  },
  {
    id: "t2",
    title: "Set up project board",
    description: "Configure the Kanban board columns and initial tasks.",
    status: "todo",
    priority: "medium",
    tags: ["Setup", "Kanban"],
    dueDate: "2026-08-15",
    assignee: "Abhishek Yadav",
    assigneeInitials: "AY",
  },
  {
    id: "t3",
    title: "Write API documentation",
    description: "Document all task and project endpoints for the backend.",
    status: "todo",
    priority: "low",
    tags: ["Docs", "Backend"],
    dueDate: "2026-08-25",
    assignee: "Dipanjan Halder",
    assigneeInitials: "DH",
  },
  {
    id: "t4",
    title: "Fix mobile navigation",
    description: "Sidebar does not collapse correctly on small screens.",
    status: "todo",
    priority: "urgent",
    tags: ["Bug", "Mobile"],
    dueDate: "2026-08-14",
    assignee: "Nitin Kumar",
    assigneeInitials: "NK",
  },
  {
    id: "t5",
    title: "Implement drag and drop",
    description: "Wire up the 6-dot handle for reordering tasks.",
    status: "doing",
    priority: "high",
    tags: ["Feature", "Kanban"],
    dueDate: "2026-08-16",
    assignee: "Aayush Thapa",
    assigneeInitials: "AT",
  },
  {
    id: "t6",
    title: "Review pull requests",
    description: "Review and merge the open PRs from the team.",
    status: "doing",
    priority: "medium",
    tags: ["Review"],
    dueDate: "2026-08-15",
    assignee: "Vinita Gurnani",
    assigneeInitials: "VG",
  },
  {
    id: "t7",
    title: "Theme color modes",
    description: "Add support for the sidebar color mode selector.",
    status: "doing",
    priority: "medium",
    tags: ["Theme", "UI"],
    dueDate: "2026-08-20",
    assignee: "Suyash Shivam",
    assigneeInitials: "SS",
  },
  {
    id: "t8",
    title: "Set up Next.js project",
    description: "Initialize the frontend project with App Router.",
    status: "completed",
    priority: "low",
    tags: ["Setup", "Frontend"],
    dueDate: "2026-08-10",
    assignee: "Mandira Datta",
    assigneeInitials: "MD",
  },
  {
    id: "t9",
    title: "Configure Tailwind CSS",
    description: "Install and configure Tailwind with the design tokens.",
    status: "completed",
    priority: "low",
    tags: ["Setup", "Styling"],
    dueDate: "2026-08-11",
    assignee: "Abhay",
    assigneeInitials: "AB",
  },
  {
    id: "t10",
    title: "Build login screen",
    description: "Implement the login screen with guest and Google options.",
    status: "completed",
    priority: "high",
    tags: ["Feature", "Auth"],
    dueDate: "2026-08-12",
    assignee: "Abhishek Yadav",
    assigneeInitials: "AY",
  },
  {
    id: "t11",
    title: "Create app shell",
    description: "Build the persistent sidebar and content layout.",
    status: "completed",
    priority: "high",
    tags: ["Feature", "Layout"],
    dueDate: "2026-08-12",
    assignee: "Dipanjan Halder",
    assigneeInitials: "DH",
  },
];
