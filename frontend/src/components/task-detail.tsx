"use client";

import { useState } from "react";
import { STATUSES, formatActivityTime } from "../data/tasks";
import type {
  Activity,
  Task,
  TaskPriority,
  TaskStatus,
} from "../data/tasks";
import { Avatar } from "./avatar";
import { ConfirmDialog } from "./confirm-dialog";
import { DatePicker } from "./date-picker";
import { PriorityBadge } from "./priority-badge";
import { SelectMenu } from "./select-menu";
import type { SelectOption } from "./select-menu";
import { getCurrentUser } from "../lib/user-profile";

const PRIORITY_OPTIONS: SelectOption[] = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const STATUS_OPTIONS: SelectOption[] = STATUSES.map((status) => ({
  value: status.key,
  label: status.label,
}));

function BackIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M15 6l-6 6 6 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageSquareIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M3 6h18M8 6V4h8v2m1 0l-1 14H8L7 6M10 11v6M14 11v6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetaCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <h3 className="mb-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function TaskDetail({
  task,
  onBack,
  onSave,
  onDelete,
  backLabel = "All tasks",
}: {
  task: Task;
  onBack: () => void;
  onSave?: (changes: Partial<Omit<Task, "id">>) => Promise<void>;
  onDelete?: (taskId: string) => Promise<void>;
  backLabel?: string;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.dueDate);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [activity, setActivity] = useState<Activity[]>(task.activity);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const currentUser = getCurrentUser();

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, done: !subtask.done }
          : subtask
      )
    );
  };

  const addComment = (event: React.FormEvent) => {
    event.preventDefault();
    const text = comment.trim();
    if (!text) {
      return;
    }
    const newActivity: Activity = {
      id: `local-${Date.now()}`,
      author: currentUser.name,
      authorInitials: currentUser.initials,
      text,
      createdAt: new Date().toISOString().slice(0, 16),
    };
    setActivity((prev) => [...prev, newActivity]);
    setComment("");
  };

  const doneCount = subtasks.filter((subtask) => subtask.done).length;

  const buildChanges = (): Partial<Omit<Task, "id">> => {
    const changes: Partial<Omit<Task, "id">> = {};
    if (title !== task.title) {
      changes.title = title;
    }
    if (description !== task.description) {
      changes.description = description;
    }
    if (status !== task.status) {
      changes.status = status;
    }
    if (priority !== task.priority) {
      changes.priority = priority;
    }
    if (startDate !== task.startDate) {
      changes.startDate = startDate;
    }
    if (endDate !== task.dueDate) {
      changes.dueDate = endDate;
    }
    if (JSON.stringify(subtasks) !== JSON.stringify(task.subtasks)) {
      changes.subtasks = subtasks;
    }
    if (JSON.stringify(activity) !== JSON.stringify(task.activity)) {
      changes.activity = activity;
    }
    return changes;
  };

  const isDirty = Object.keys(buildChanges()).length > 0;

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    try {
      await onSave?.(buildChanges());
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to save task."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setShowDeleteConfirm(false);
    setDeleting(true);
    setSaveError("");
    try {
      await onDelete(task.id);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to delete task."
      );
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-foreground-subtle hover:text-foreground transition-colors"
      >
        <BackIcon />
        {backLabel}
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 space-y-8">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Task title"
            className="w-full bg-transparent text-2xl font-bold text-foreground outline-none"
          />

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Description
            </h3>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              aria-label="Description"
              className="w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground-secondary focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Subtasks{" "}
              <span className="font-normal text-foreground-faint">
                {doneCount}/{subtasks.length}
              </span>
            </h3>
            {subtasks.length === 0 ? (
              <p className="text-sm text-foreground-faint">No subtasks yet.</p>
            ) : (
              <ul className="space-y-1">
                {subtasks.map((subtask) => (
                  <li key={subtask.id}>
                    <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-1.5 hover:bg-surface-muted">
                      <input
                        type="checkbox"
                        checked={subtask.done}
                        onChange={() => toggleSubtask(subtask.id)}
                        className="mt-0.5 h-4 w-4 accent-accent"
                      />
                      <span
                        className={`text-sm ${
                          subtask.done
                            ? "text-foreground-faint line-through"
                            : "text-foreground-secondary"
                        }`}
                      >
                        {subtask.title}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Activity
            </h3>
            {activity.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-foreground-faint">
                <MessageSquareIcon />
                <span>No activity yet. Comments and updates will appear here.</span>
              </div>
            ) : (
              <ul className="space-y-4">
                {activity.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <Avatar
                      name={item.author}
                      initials={item.authorInitials}
                      className="w-8 h-8 text-xs"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{item.author}</span>{" "}
                        <span className="text-foreground-subtle">{item.text}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-foreground-faint">
                        {formatActivityTime(item.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={addComment} className="mt-4 flex items-start gap-3">
              <Avatar
                name={currentUser.name}
                initials={currentUser.initials}
                className="w-8 h-8 text-xs"
              />
              <input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Write a comment..."
                aria-label="Write a comment"
                className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground-secondary focus:border-accent focus:outline-none"
              />
            </form>
          </div>
        </div>

        <aside className="w-full shrink-0 space-y-3 lg:w-72 lg:border-l lg:border-border lg:pl-6">
          <MetaCard title="Status">
            <SelectMenu
              value={status}
              options={STATUS_OPTIONS}
              onChange={(value) => setStatus(value as TaskStatus)}
            />
          </MetaCard>

          <MetaCard title="Priority">
            <SelectMenu
              value={priority}
              options={PRIORITY_OPTIONS}
              onChange={(value) => setPriority(value as TaskPriority)}
              renderOption={(option) => (
                <PriorityBadge priority={option.value as TaskPriority} />
              )}
            />
          </MetaCard>

          <MetaCard title="Members">
            <div className="flex items-center gap-2.5">
              <Avatar
                name={task.assignee}
                initials={task.assigneeInitials}
                className="w-7 h-7 text-xs"
              />
              <span className="text-sm text-foreground-secondary">{task.assignee}</span>
            </div>
          </MetaCard>

          <MetaCard title="Dates">
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </MetaCard>

          <MetaCard title="Labels">
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-surface-subtle px-2 py-0.5 text-xs font-medium text-foreground-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </MetaCard>
        </aside>
      </div>
      </div>

      {(onSave || onDelete) && (
        <div className="flex items-center justify-between gap-2 border-t border-border bg-surface px-4 py-3">
          {onDelete && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting || saving}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-red-600 hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
              <TrashIcon />
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
          <div className="flex items-center gap-2">
            {saveError && (
              <p className="text-xs text-red-600">{saveError}</p>
            )}
            <button
              type="button"
              onClick={onBack}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
            >
              Cancel
            </button>
            {onSave && (
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving || !isDirty}
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete this task?"
        description="This action cannot be undone. The task and all its data will be permanently removed."
        confirmLabel="Delete"
        onConfirm={() => void handleDelete()}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
