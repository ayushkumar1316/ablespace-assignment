import type { FieldKey, VisibleFields } from "../data/tasks";
import { DEFAULT_VISIBLE_FIELDS } from "../data/tasks";
import type {
  ProjectFieldKey,
  ProjectVisibleFields,
} from "../data/projects";
import { DEFAULT_PROJECT_VISIBLE_FIELDS } from "../data/projects";

export type TaskView = "board" | "list";

export interface TaskViewPreferences {
  view: TaskView;
  search: string;
  fields: VisibleFields;
}

export interface ProjectViewPreferences {
  search: string;
  fields: ProjectVisibleFields;
}

export const DEFAULT_TASK_VIEW_PREFERENCES: TaskViewPreferences = {
  view: "board",
  search: "",
  fields: { ...DEFAULT_VISIBLE_FIELDS },
};

export const DEFAULT_PROJECT_VIEW_PREFERENCES: ProjectViewPreferences = {
  search: "",
  fields: { ...DEFAULT_PROJECT_VISIBLE_FIELDS },
};

const TASK_VIEW_STORAGE_KEY = "ablespace:task-view";
const PROJECT_VIEW_STORAGE_KEY = "ablespace:project-view";
const MAX_SEARCH_LENGTH = 200;

const TASK_FIELD_KEYS: FieldKey[] = ["priority", "tags", "dueDate", "assignee"];
const PROJECT_FIELD_KEYS: ProjectFieldKey[] = [
  "status",
  "members",
  "dueDate",
  "tags",
];

export function subscribeToStorage(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function isTaskView(value: unknown): value is TaskView {
  return value === "board" || value === "list";
}

function sanitizeSearch(value: unknown): string {
  return typeof value === "string" ? value.slice(0, MAX_SEARCH_LENGTH) : "";
}

function sanitizeFields<T extends object>(
  raw: unknown,
  defaults: T,
  keys: readonly (keyof T)[]
): T {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { ...defaults } as T;
  }
  const result = { ...defaults } as T;
  const record = raw as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key as string];
    if (typeof value === "boolean") {
      (result as unknown as Record<string, boolean>)[key as string] = value;
    }
  }
  return result;
}

function parseTaskView(raw: string): TaskViewPreferences {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ...DEFAULT_TASK_VIEW_PREFERENCES };
  }
  if (typeof parsed !== "object" || parsed === null) {
    return { ...DEFAULT_TASK_VIEW_PREFERENCES };
  }
  const record = parsed as Record<string, unknown>;
  return {
    view: isTaskView(record.view)
      ? record.view
      : DEFAULT_TASK_VIEW_PREFERENCES.view,
    search: sanitizeSearch(record.search),
    fields: sanitizeFields(record.fields, DEFAULT_VISIBLE_FIELDS, TASK_FIELD_KEYS),
  };
}

function parseProjectView(raw: string): ProjectViewPreferences {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ...DEFAULT_PROJECT_VIEW_PREFERENCES };
  }
  if (typeof parsed !== "object" || parsed === null) {
    return { ...DEFAULT_PROJECT_VIEW_PREFERENCES };
  }
  const record = parsed as Record<string, unknown>;
  return {
    search: sanitizeSearch(record.search),
    fields: sanitizeFields(
      record.fields,
      DEFAULT_PROJECT_VISIBLE_FIELDS,
      PROJECT_FIELD_KEYS
    ),
  };
}

let taskViewCacheKey: string | null = null;
let taskViewCache: TaskViewPreferences | null = null;

let projectViewCacheKey: string | null = null;
let projectViewCache: ProjectViewPreferences | null = null;

export function loadTaskViewPreferences(): TaskViewPreferences {
  if (typeof window === "undefined") {
    return { ...DEFAULT_TASK_VIEW_PREFERENCES };
  }
  const raw = window.localStorage.getItem(TASK_VIEW_STORAGE_KEY);
  if (raw === taskViewCacheKey && taskViewCache) {
    return taskViewCache;
  }
  taskViewCacheKey = raw;
  taskViewCache = raw
    ? parseTaskView(raw)
    : { ...DEFAULT_TASK_VIEW_PREFERENCES };
  return taskViewCache;
}

export function loadProjectViewPreferences(): ProjectViewPreferences {
  if (typeof window === "undefined") {
    return { ...DEFAULT_PROJECT_VIEW_PREFERENCES };
  }
  const raw = window.localStorage.getItem(PROJECT_VIEW_STORAGE_KEY);
  if (raw === projectViewCacheKey && projectViewCache) {
    return projectViewCache;
  }
  projectViewCacheKey = raw;
  projectViewCache = raw
    ? parseProjectView(raw)
    : { ...DEFAULT_PROJECT_VIEW_PREFERENCES };
  return projectViewCache;
}

export function saveTaskViewPreferences(prefs: TaskViewPreferences): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(TASK_VIEW_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // best-effort persistence; storage may be unavailable
  }
}

export function saveProjectViewPreferences(prefs: ProjectViewPreferences): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(PROJECT_VIEW_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // best-effort persistence; storage may be unavailable
  }
}
