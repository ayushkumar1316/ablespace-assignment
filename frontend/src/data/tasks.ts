export type TaskStatus = "todo" | "doing" | "completed";

export type TaskPriority = "urgent" | "high" | "medium" | "low";

export type FieldKey = "priority" | "tags" | "dueDate" | "assignee";

export interface VisibleFields {
  priority: boolean;
  tags: boolean;
  dueDate: boolean;
  assignee: boolean;
}

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Activity {
  id: string;
  author: string;
  authorInitials: string;
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  startDate: string;
  dueDate: string;
  assignee: string;
  assigneeInitials: string;
  subtasks: Subtask[];
  activity: Activity[];
  order?: number;
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

export function formatFullDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatActivityTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export const TASKS: Task[] = [
  {
    id: "t1",
    title: "Design Homepage",
    description: "Create the homepage layout following the Figma design.",
    status: "todo",
    priority: "high",
    tags: ["Design", "UI"],
    startDate: "2026-08-14",
    dueDate: "2026-08-18",
    assignee: "Mandira Datta",
    assigneeInitials: "MD",
    subtasks: [
      { id: "t1s1", title: "Define hero section layout", done: true },
      { id: "t1s2", title: "Draft component grid", done: true },
      { id: "t1s3", title: "Add responsive breakpoints", done: false },
    ],
    activity: [
      {
        id: "t1a1",
        author: "Mandira Datta",
        authorInitials: "MD",
        text: "created this task",
        createdAt: "2026-08-12T09:24:00",
      },
      {
        id: "t1a2",
        author: "Abhishek Yadav",
        authorInitials: "AY",
        text: "added 3 subtasks",
        createdAt: "2026-08-13T11:02:00",
      },
      {
        id: "t1a3",
        author: "Mandira Datta",
        authorInitials: "MD",
        text: "set priority to High",
        createdAt: "2026-08-13T14:40:00",
      },
    ],
  },
  {
    id: "t2",
    title: "Set up project board",
    description: "Configure the Kanban board columns and initial tasks.",
    status: "todo",
    priority: "medium",
    tags: ["Setup", "Kanban"],
    startDate: "2026-08-13",
    dueDate: "2026-08-15",
    assignee: "Abhishek Yadav",
    assigneeInitials: "AY",
    subtasks: [
      { id: "t2s1", title: "Create the three default columns", done: true },
      { id: "t2s2", title: "Import initial task list", done: false },
    ],
    activity: [
      {
        id: "t2a1",
        author: "Abhishek Yadav",
        authorInitials: "AY",
        text: "created this task",
        createdAt: "2026-08-13T08:10:00",
      },
    ],
  },
  {
    id: "t3",
    title: "Write API documentation",
    description: "Document all task and project endpoints for the backend.",
    status: "todo",
    priority: "low",
    tags: ["Docs", "Backend"],
    startDate: "2026-08-18",
    dueDate: "2026-08-25",
    assignee: "Dipanjan Halder",
    assigneeInitials: "DH",
    subtasks: [
      { id: "t3s1", title: "Outline endpoint schemas", done: false },
      { id: "t3s2", title: "Write authentication section", done: false },
    ],
    activity: [
      {
        id: "t3a1",
        author: "Dipanjan Halder",
        authorInitials: "DH",
        text: "created this task",
        createdAt: "2026-08-11T16:30:00",
      },
      {
        id: "t3a2",
        author: "Nitin Kumar",
        authorInitials: "NK",
        text: "commented: please include rate limiting details",
        createdAt: "2026-08-12T10:45:00",
      },
    ],
  },
  {
    id: "t4",
    title: "Fix mobile navigation",
    description: "Sidebar does not collapse correctly on small screens.",
    status: "todo",
    priority: "urgent",
    tags: ["Bug", "Mobile"],
    startDate: "2026-08-13",
    dueDate: "2026-08-14",
    assignee: "Nitin Kumar",
    assigneeInitials: "NK",
    subtasks: [
      { id: "t4s1", title: "Reproduce on 375px viewport", done: true },
      { id: "t4s2", title: "Fix collapse animation", done: false },
      { id: "t4s3", title: "Test on Android", done: false },
    ],
    activity: [
      {
        id: "t4a1",
        author: "Nitin Kumar",
        authorInitials: "NK",
        text: "created this task",
        createdAt: "2026-08-13T09:15:00",
      },
      {
        id: "t4a2",
        author: "Aayush Thapa",
        authorInitials: "AT",
        text: "commented: reproducible on iOS as well",
        createdAt: "2026-08-13T12:05:00",
      },
    ],
  },
  {
    id: "t5",
    title: "Implement drag and drop",
    description: "Wire up the 6-dot handle for reordering tasks.",
    status: "doing",
    priority: "high",
    tags: ["Feature", "Kanban"],
    startDate: "2026-08-14",
    dueDate: "2026-08-16",
    assignee: "Aayush Thapa",
    assigneeInitials: "AT",
    subtasks: [
      { id: "t5s1", title: "Add drag handle library", done: true },
      { id: "t5s2", title: "Wire handle to drag events", done: true },
      { id: "t5s3", title: "Persist new ordering", done: false },
    ],
    activity: [
      {
        id: "t5a1",
        author: "Aayush Thapa",
        authorInitials: "AT",
        text: "created this task",
        createdAt: "2026-08-10T11:00:00",
      },
      {
        id: "t5a2",
        author: "Aayush Thapa",
        authorInitials: "AT",
        text: "moved status from To Do to Doing",
        createdAt: "2026-08-14T09:50:00",
      },
    ],
  },
  {
    id: "t6",
    title: "Review pull requests",
    description: "Review and merge the open PRs from the team.",
    status: "doing",
    priority: "medium",
    tags: ["Review"],
    startDate: "2026-08-13",
    dueDate: "2026-08-15",
    assignee: "Vinita Gurnani",
    assigneeInitials: "VG",
    subtasks: [
      { id: "t6s1", title: "Review PR #12", done: true },
      { id: "t6s2", title: "Review PR #14", done: false },
    ],
    activity: [
      {
        id: "t6a1",
        author: "Vinita Gurnani",
        authorInitials: "VG",
        text: "created this task",
        createdAt: "2026-08-12T14:20:00",
      },
    ],
  },
  {
    id: "t7",
    title: "Theme color modes",
    description: "Add support for the sidebar color mode selector.",
    status: "doing",
    priority: "medium",
    tags: ["Theme", "UI"],
    startDate: "2026-08-14",
    dueDate: "2026-08-20",
    assignee: "Suyash Shivam",
    assigneeInitials: "SS",
    subtasks: [
      { id: "t7s1", title: "Add light mode tokens", done: true },
      { id: "t7s2", title: "Wire selector state", done: false },
    ],
    activity: [
      {
        id: "t7a1",
        author: "Suyash Shivam",
        authorInitials: "SS",
        text: "created this task",
        createdAt: "2026-08-12T15:10:00",
      },
    ],
  },
  {
    id: "t8",
    title: "Set up Next.js project",
    description: "Initialize the frontend project with App Router.",
    status: "completed",
    priority: "low",
    tags: ["Setup", "Frontend"],
    startDate: "2026-08-05",
    dueDate: "2026-08-10",
    assignee: "Mandira Datta",
    assigneeInitials: "MD",
    subtasks: [
      { id: "t8s1", title: "Scaffold project", done: true },
      { id: "t8s2", title: "Configure App Router", done: true },
    ],
    activity: [
      {
        id: "t8a1",
        author: "Mandira Datta",
        authorInitials: "MD",
        text: "created this task",
        createdAt: "2026-08-05T10:00:00",
      },
      {
        id: "t8a2",
        author: "Mandira Datta",
        authorInitials: "MD",
        text: "moved status from Doing to Completed",
        createdAt: "2026-08-10T17:30:00",
      },
    ],
  },
  {
    id: "t9",
    title: "Configure Tailwind CSS",
    description: "Install and configure Tailwind with the design tokens.",
    status: "completed",
    priority: "low",
    tags: ["Setup", "Styling"],
    startDate: "2026-08-06",
    dueDate: "2026-08-11",
    assignee: "Abhay",
    assigneeInitials: "AB",
    subtasks: [
      { id: "t9s1", title: "Install Tailwind", done: true },
      { id: "t9s2", title: "Define design tokens", done: true },
    ],
    activity: [
      {
        id: "t9a1",
        author: "Abhay",
        authorInitials: "AB",
        text: "created this task",
        createdAt: "2026-08-06T09:40:00",
      },
    ],
  },
  {
    id: "t10",
    title: "Build login screen",
    description: "Implement the login screen with guest and Google options.",
    status: "completed",
    priority: "high",
    tags: ["Feature", "Auth"],
    startDate: "2026-08-07",
    dueDate: "2026-08-12",
    assignee: "Abhishek Yadav",
    assigneeInitials: "AY",
    subtasks: [
      { id: "t10s1", title: "Build guest login card", done: true },
      { id: "t10s2", title: "Wire Google button", done: true },
    ],
    activity: [
      {
        id: "t10a1",
        author: "Abhishek Yadav",
        authorInitials: "AY",
        text: "created this task",
        createdAt: "2026-08-07T13:15:00",
      },
      {
        id: "t10a2",
        author: "Mandira Datta",
        authorInitials: "MD",
        text: "commented: verified both login flows",
        createdAt: "2026-08-12T11:20:00",
      },
    ],
  },
  {
    id: "t11",
    title: "Create app shell",
    description: "Build the persistent sidebar and content layout.",
    status: "completed",
    priority: "high",
    tags: ["Feature", "Layout"],
    startDate: "2026-08-06",
    dueDate: "2026-08-12",
    assignee: "Dipanjan Halder",
    assigneeInitials: "DH",
    subtasks: [
      { id: "t11s1", title: "Build sidebar navigation", done: true },
      { id: "t11s2", title: "Build content header", done: true },
    ],
    activity: [
      {
        id: "t11a1",
        author: "Dipanjan Halder",
        authorInitials: "DH",
        text: "created this task",
        createdAt: "2026-08-06T08:30:00",
      },
    ],
  },
];

export const MEMBERS: { name: string; initials: string }[] = Array.from(
  new Map(
    TASKS.map((task) => [
      task.assignee,
      { name: task.assignee, initials: task.assigneeInitials },
    ])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name));
