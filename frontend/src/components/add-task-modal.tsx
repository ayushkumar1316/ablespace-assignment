"use client";

import { useEffect, useState } from "react";
import { MEMBERS, PRIORITY_CONFIG, STATUSES } from "../data/tasks";
import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../data/tasks";
import { DatePicker } from "./date-picker";
import { PriorityBadge } from "./priority-badge";
import { SelectMenu } from "./select-menu";
import type { SelectOption } from "./select-menu";
import { getCurrentUser } from "../lib/user-profile";

const STATUS_OPTIONS: SelectOption[] = STATUSES.map((status) => ({
  value: status.key,
  label: status.label,
}));

const PRIORITY_OPTIONS: SelectOption[] = (
  Object.keys(PRIORITY_CONFIG) as TaskPriority[]
).map((key) => ({ value: key, label: PRIORITY_CONFIG[key].label }));

const ASSIGNEE_OPTIONS: SelectOption[] = MEMBERS.map((member) => ({
  value: member.name,
  label: member.name,
}));

function XIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AddTaskModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (task: Omit<Task, "id">) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [assignee, setAssignee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [labels, setLabels] = useState("");
  const [errors, setErrors] = useState<{ title?: string; assignee?: string }>(
    {}
  );
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [closing, setClosing] = useState(false);

  const handleClose = () => setClosing(true);

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => onClose(), 150);
    return () => clearTimeout(timer);
  }, [closing, onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: { title?: string; assignee?: string } = {};
    if (!title.trim()) {
      nextErrors.title = "Title is required.";
    }
    if (!assignee) {
      nextErrors.assignee = "Assignee is required.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const selectedMember = MEMBERS.find((member) => member.name === assignee);

    setSaving(true);
    setSubmitError("");
    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        tags: labels
          .split(",")
          .map((label) => label.trim())
          .filter(Boolean),
        startDate,
        dueDate,
        assignee,
        assigneeInitials: selectedMember?.initials ?? "",
        subtasks: [],
        activity: [
          {
            id: `a-${Date.now()}`,
            author: getCurrentUser().name,
            authorInitials: getCurrentUser().initials,
            text: "created this task",
            createdAt: new Date().toISOString().slice(0, 16),
          },
        ],
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create task."
      );
    } finally {
      setSaving(false);
    }
  };

  const fieldLabel =
    "text-xs font-medium text-foreground-subtle uppercase tracking-wide";
  const inputClass = (hasError: boolean) =>
    `mt-1 w-full rounded-md border px-3 py-2 text-sm text-foreground-secondary focus:outline-none ${
      hasError
        ? "border-red-300 focus:border-red-400"
        : "border-border focus:border-accent"
    }`;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add task"
    >
      <div
        className={`fixed inset-0 bg-black/30 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className={`relative z-10 flex max-h-full w-full max-w-lg flex-col rounded-xl border border-border bg-surface shadow-xl ${closing ? "animate-scale-out" : "animate-scale-in"}`}>
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">Add Task</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="rounded-md p-1 text-foreground-faint hover:bg-surface-subtle hover:text-foreground-muted"
          >
            <XIcon />
          </button>
        </div>

        <form
          id="add-task-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 py-4"
        >
          <div>
            <label htmlFor="add-task-title" className={fieldLabel}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="add-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to be done?"
              className={inputClass(Boolean(errors.title))}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="add-task-description" className={fieldLabel}>
              Description
            </label>
            <textarea
              id="add-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Add more detail (optional)"
              className={`${inputClass(false)} resize-none`}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className={fieldLabel}>Status</span>
              <div className="mt-1">
                <SelectMenu
                  value={status}
                  options={STATUS_OPTIONS}
                  onChange={(value) => setStatus(value as TaskStatus)}
                />
              </div>
            </div>
            <div>
              <span className={fieldLabel}>Priority</span>
              <div className="mt-1">
                <SelectMenu
                  value={priority}
                  options={PRIORITY_OPTIONS}
                  onChange={(value) => setPriority(value as TaskPriority)}
                  renderOption={(option) => (
                    <PriorityBadge priority={option.value as TaskPriority} />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <span className={fieldLabel}>
              Assignee <span className="text-red-500">*</span>
            </span>
            <div className="mt-1">
              <SelectMenu
                value={assignee}
                options={ASSIGNEE_OPTIONS}
                onChange={setAssignee}
              />
            </div>
            {errors.assignee && (
              <p className="mt-1 text-xs text-red-600">{errors.assignee}</p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className={fieldLabel}>Start Date</span>
              <div className="mt-1">
                <DatePicker
                  startDate={startDate}
                  endDate=""
                  single
                  onChange={(start) => setStartDate(start)}
                />
              </div>
            </div>
            <div>
              <span className={fieldLabel}>Due Date</span>
              <div className="mt-1">
                <DatePicker
                  startDate={dueDate}
                  endDate=""
                  single
                  onChange={(start) => setDueDate(start)}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="add-task-labels" className={fieldLabel}>
              Labels
            </label>
            <input
              id="add-task-labels"
              type="text"
              value={labels}
              onChange={(event) => setLabels(event.target.value)}
              placeholder="Design, UI, Bug"
              className={inputClass(false)}
            />
          </div>
        </form>

        <div className="flex items-center justify-end gap-2 border-t border-border-subtle px-5 py-4">
          {submitError && (
            <p className="mr-auto text-xs text-red-600">{submitError}</p>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-task-form"
            disabled={saving}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Creating…" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
