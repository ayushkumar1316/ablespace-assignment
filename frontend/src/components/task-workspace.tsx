"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { STATUSES } from "../data/tasks";
import type { FieldKey, Task, TaskStatus } from "../data/tasks";
import { createTask, deleteTask, fetchTasks, updateTask } from "../lib/api";
import {
  DEFAULT_TASK_VIEW_PREFERENCES,
  loadTaskViewPreferences,
  saveTaskViewPreferences,
  subscribeToStorage,
} from "../lib/view-preferences";
import type { TaskView, TaskViewPreferences } from "../lib/view-preferences";
import { TopBar } from "./top-bar";
import { KanbanBoard } from "./kanban-board";
import { TaskList } from "./task-list";
import { TaskDetail } from "./task-detail";
import { AddTaskModal } from "./add-task-modal";
import { EmptyState } from "./empty-state";

function InboxIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 6h16v12H4z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 13h5l1.5 2.5h3L15 13h5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchXIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35M8.5 8.5l5 5M13.5 8.5l-5 5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3L2 21h20L12 3z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 10v4M12 17h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      className="w-5 h-5 animate-spin"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" strokeWidth="2" strokeLinecap="round" strokeDasharray="40 80" />
    </svg>
  );
}

function reorderTasks(
  tasks: Task[],
  taskId: string,
  status: TaskStatus,
  index: number
): Task[] {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) {
    return tasks;
  }
  const without = tasks.filter((item) => item.id !== taskId);
  const column = without.filter((item) => item.status === status);
  const clamped = Math.max(0, Math.min(index, column.length));
  const reordered = [
    ...column.slice(0, clamped),
    { ...task, status },
    ...column.slice(clamped),
  ];
  const others = without.filter((item) => item.status !== status);
  return [...others, ...reordered];
}

async function persistTaskOrder(
  previous: Task[],
  next: Task[]
): Promise<void> {
  const prevById = new Map(previous.map((task) => [task.id, task]));
  const ordered: Task[] = [];
  for (const { key } of STATUSES) {
    ordered.push(...next.filter((task) => task.status === key));
  }
  const patches: (Partial<Omit<Task, "id">> & { id: string })[] = [];
  ordered.forEach((task, index) => {
    const prev = prevById.get(task.id);
    const patch: Partial<Omit<Task, "id">> = {};
    if ((task.order ?? -1) !== index) {
      patch.order = index;
    }
    if (prev && prev.status !== task.status) {
      patch.status = task.status;
    }
    if (Object.keys(patch).length > 0) {
      patches.push({ id: task.id, ...patch });
    }
  });
  if (patches.length === 0) {
    return;
  }
  await Promise.all(
    patches.map((patch) => {
      const { id, ...input } = patch;
      return updateTask(id, input);
    })
  );
}

export function TaskWorkspace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "error" | "ready">(
    "loading"
  );
  const taskViewPrefs = useSyncExternalStore<TaskViewPreferences>(
    subscribeToStorage,
    loadTaskViewPreferences,
    () => DEFAULT_TASK_VIEW_PREFERENCES
  );
  const view = taskViewPrefs.view;
  const fields = taskViewPrefs.fields;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const setView = (next: TaskView) => {
    saveTaskViewPreferences({ ...loadTaskViewPreferences(), view: next });
    window.dispatchEvent(new Event("storage"));
  };

  const setField = (key: FieldKey, value: boolean) => {
    saveTaskViewPreferences({
      ...loadTaskViewPreferences(),
      fields: { ...loadTaskViewPreferences().fields, [key]: value },
    });
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    let cancelled = false;
    Promise.resolve()
      .then(() => loadTaskViewPreferences())
      .then((prefs) => {
        if (cancelled) return;
        setSearchQuery(prefs.search);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveTaskViewPreferences({
        ...loadTaskViewPreferences(),
        search: searchQuery,
      });
      window.dispatchEvent(new Event("storage"));
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadTasks = useCallback(async () => {
    try {
      const loaded = await fetchTasks();
      setTasks(loaded);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchTasks()
      .then((loaded) => {
        if (cancelled) return;
        setTasks(loaded);
        setLoadState("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return tasks;
    }
    return tasks.filter((task) =>
      [task.title, task.description, ...task.tags].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, tasks]);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  const handleCreateTask = async (input: Omit<Task, "id">) => {
    const created = await createTask(input);
    setTasks((prev) => [...prev, created]);
    setIsAddTaskOpen(false);
  };

  const handleSaveTask = async (changes: Partial<Omit<Task, "id">>) => {
    const updated = await updateTask(selectedTaskId!, changes);
    setTasks((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((item) => item.id !== taskId));
    setSelectedTaskId(null);
  };

  const handleReorderTask = async (
    taskId: string,
    status: TaskStatus,
    index: number
  ) => {
    const next = reorderTasks(tasks, taskId, status, index);
    setTasks(next);
    try {
      await persistTaskOrder(tasks, next);
    } catch {
      try {
        const serverTasks = await fetchTasks();
        setTasks(serverTasks);
      } catch {
        // keep the optimistic ordering if the server can't be reached
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {selectedTask ? (
        <div className="flex-1 overflow-hidden">
          <div className="h-full px-1">
            <TaskDetail
              task={selectedTask}
              onBack={() => setSelectedTaskId(null)}
              onSave={handleSaveTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      ) : (
        <>
          <TopBar
            selectedView={view}
            setSelectedView={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fields={fields}
            setField={setField}
            onAddTask={() => setIsAddTaskOpen(true)}
          />

          <div className="flex-1 overflow-hidden pt-4">
            {loadState === "loading" ? (
              <EmptyState
                icon={<LoadingIcon />}
                title="Loading tasks…"
                description="Fetching your tasks from the server."
              />
            ) : loadState === "error" ? (
              <EmptyState
                icon={<ErrorIcon />}
                title="Failed to load tasks"
                description="We couldn't reach the server. Check your connection and try again."
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setLoadState("loading");
                      void loadTasks();
                    }}
                    className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
                  >
                    Retry
                  </button>
                }
              />
            ) : filteredTasks.length === 0 ? (
              <EmptyState
                icon={searchQuery.trim() ? <SearchXIcon /> : <InboxIcon />}
                title={searchQuery.trim() ? "No results found" : "No tasks yet"}
                description={
                  searchQuery.trim()
                    ? "No tasks match your search. Try a different keyword or clear the search."
                    : "Create your first task to start organizing your work."
                }
                action={
                  searchQuery.trim() ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
                    >
                      Clear search
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddTaskOpen(true)}
                      className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors"
                    >
                      Add Task
                    </button>
                  )
                }
              />
            ) : view === "board" ? (
              <KanbanBoard
                tasks={filteredTasks}
                fields={fields}
                onSelect={setSelectedTaskId}
                onReorder={handleReorderTask}
              />
            ) : (
              <TaskList
                tasks={filteredTasks}
                fields={fields}
                onSelect={setSelectedTaskId}
              />
            )}
          </div>
        </>
      )}

      {isAddTaskOpen && (
        <AddTaskModal
          onClose={() => setIsAddTaskOpen(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
}
