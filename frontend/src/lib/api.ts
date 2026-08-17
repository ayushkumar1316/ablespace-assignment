import type { Task, TaskPriority, TaskStatus } from "../data/tasks";
import type { Project, ProjectStatus } from "../data/projects";
import type { ThemeMode, ColorMode } from "../data/preferences";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const GUEST_TOKEN_KEY = "ablespace:guest-token";

let guestToken: string | null = null;

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function requestJson<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, init);
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = (await res.json()) as { message?: string | string[] };
      if (typeof body.message === "string") {
        message = body.message;
      } else if (Array.isArray(body.message)) {
        message = body.message.join(", ");
      }
    } catch {
      // ignore JSON parse errors and keep the status-based message
    }
    throw new ApiError(message, res.status);
  }
  return res.json() as Promise<T>;
}

export function hasGuestToken(): boolean {
  if (guestToken) return true;
  if (typeof window !== "undefined") {
    return !!window.localStorage.getItem(GUEST_TOKEN_KEY);
  }
  return false;
}

export async function getGuestToken(): Promise<string> {
  if (guestToken) {
    return guestToken;
  }
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(GUEST_TOKEN_KEY);
    if (stored) {
      guestToken = stored;
      return guestToken;
    }
  }
  const data = await requestJson<{ accessToken: string }>("/auth/guest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  guestToken = data.accessToken;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(GUEST_TOKEN_KEY, guestToken);
  }
  return guestToken;
}

interface RawSubtask {
  id: string;
  title: string;
  done: boolean;
}

interface RawActivity {
  id: string;
  author: string;
  authorInitials: string;
  text: string;
  createdAt: string;
}

interface RawTask {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags?: string[];
  startDate?: string;
  dueDate?: string;
  assignee?: string;
  assigneeInitials?: string;
  order?: number;
  subtasks?: RawSubtask[];
  activity?: RawActivity[];
}

function toTask(raw: RawTask): Task {
  return {
    id: raw._id,
    title: raw.title,
    description: raw.description ?? "",
    status: raw.status,
    priority: raw.priority,
    tags: raw.tags ?? [],
    startDate: raw.startDate ?? "",
    dueDate: raw.dueDate ?? "",
    assignee: raw.assignee ?? "",
    assigneeInitials: raw.assigneeInitials ?? "",
    subtasks: raw.subtasks ?? [],
    activity: raw.activity ?? [],
    order: raw.order ?? 0,
  };
}

export async function fetchTasks(): Promise<Task[]> {
  const token = await getGuestToken();
  const data = await requestJson<RawTask[]>("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.map(toTask);
}

export async function createTask(
  input: Omit<Task, "id">,
): Promise<Task> {
  const token = await getGuestToken();
  const data = await requestJson<RawTask>("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return toTask(data);
}

export async function updateTask(
  id: string,
  input: Partial<Omit<Task, "id">>,
): Promise<Task> {
  const token = await getGuestToken();
  const data = await requestJson<RawTask>(`/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return toTask(data);
}

interface RawProject {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  dueDate: string;
  members: RawProjectMember[];
  taskIds: string[];
  order?: number;
}

interface RawProjectMember {
  name: string;
  initials: string;
}

function toProject(raw: RawProject): Project {
  return {
    id: raw._id,
    name: raw.name,
    description: raw.description ?? "",
    status: raw.status,
    tags: raw.tags ?? [],
    dueDate: raw.dueDate ?? "",
    members: (raw.members ?? []).map((m) => ({
      name: m.name,
      initials: m.initials ?? "",
    })),
    taskIds: raw.taskIds ?? [],
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const token = await getGuestToken();
  const data = await requestJson<RawProject[]>("/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.map(toProject);
}

export async function createProject(
  input: Omit<Project, "id">,
): Promise<Project> {
  const token = await getGuestToken();
  const data = await requestJson<RawProject>("/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return toProject(data);
}

export async function updateProject(
  id: string,
  input: Partial<Omit<Project, "id">>,
): Promise<Project> {
  const token = await getGuestToken();
  const data = await requestJson<RawProject>(`/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return toProject(data);
}

export async function deleteProject(id: string): Promise<void> {
  const token = await getGuestToken();
  await requestJson<{ deleted: boolean }>(`/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteTask(id: string): Promise<void> {
  const token = await getGuestToken();
  await requestJson<{ deleted: boolean }>(`/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

interface RawPreference {
  _id: string;
  userId: string;
  theme: ThemeMode;
  colorMode: ColorMode;
}

function toPreference(raw: RawPreference): { theme: ThemeMode; colorMode: ColorMode } {
  return {
    theme: raw.theme ?? "light",
    colorMode: raw.colorMode ?? "blue",
  };
}

export async function fetchPreferences(): Promise<{ theme: ThemeMode; colorMode: ColorMode }> {
  const token = await getGuestToken();
  const data = await requestJson<RawPreference>("/preferences/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return toPreference(data);
}

export async function updatePreferences(
  input: { theme?: ThemeMode; colorMode?: ColorMode },
): Promise<{ theme: ThemeMode; colorMode: ColorMode }> {
  const token = await getGuestToken();
  const data = await requestJson<RawPreference>("/preferences/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return toPreference(data);
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
}

interface RawUser {
  _id?: string;
  id?: string;
  name: string;
  email?: string;
  isGuest?: boolean;
}

function toUserProfile(raw: RawUser): UserProfile {
  return {
    id: raw.id ?? raw._id ?? "",
    name: raw.name,
    email: raw.email ?? "",
    isGuest: raw.isGuest ?? true,
  };
}

export async function fetchProfile(): Promise<UserProfile> {
  const token = await getGuestToken();
  const data = await requestJson<RawUser>("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return toUserProfile(data);
}

export async function updateProfile(
  input: { name?: string; email?: string },
): Promise<UserProfile> {
  const token = await getGuestToken();
  const data = await requestJson<RawUser>("/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return toUserProfile(data);
}
