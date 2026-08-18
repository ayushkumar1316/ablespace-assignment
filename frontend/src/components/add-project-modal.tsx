"use client";

import { useEffect, useState } from "react";
import { MEMBERS } from "../data/tasks";
import { PROJECT_STATUSES } from "../data/projects";
import type { Project, ProjectStatus } from "../data/projects";
import { Avatar } from "./avatar";
import { DatePicker } from "./date-picker";
import { SelectMenu } from "./select-menu";
import type { SelectOption } from "./select-menu";

const STATUS_OPTIONS: SelectOption[] = PROJECT_STATUSES.map((status) => ({
  value: status.key,
  label: status.label,
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

function ChevronDownIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-foreground-faint"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MemberSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (members: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggle = (name: string) => {
    onChange(
      value.includes(name)
        ? value.filter((member) => member !== name)
        : [...value, name]
    );
  };

  const handleClose = () => setClosing(true);

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 120);
    return () => clearTimeout(timer);
  }, [closing]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          if (open) { handleClose(); } else { setOpen(true); setClosing(false); }
        }}
        className="relative z-20 flex w-full items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm text-foreground-secondary hover:border-border-strong"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex-1 truncate text-left">
          {value.length > 0 ? value.join(", ") : "Select members"}
        </span>
        <ChevronDownIcon />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            role="listbox"
            className={`absolute left-0 right-0 top-full z-30 mt-1.5 max-h-56 overflow-auto rounded-lg border border-border bg-surface p-1 shadow-lg ${
              closing ? "animate-scale-out" : "animate-scale-in"
            }`}
          >
            {MEMBERS.map((member) => {
              const isSelected = value.includes(member.name);
              return (
                <button
                  key={member.name}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggle(member.name)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-foreground-secondary hover:bg-surface-muted"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    aria-hidden="true"
                    className="pointer-events-none h-4 w-4 accent-accent"
                  />
                  <Avatar
                    name={member.name}
                    initials={member.initials}
                    className="w-6 h-6 text-[10px]"
                  />
                  <span className="flex-1 truncate">{member.name}</span>
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export function AddProjectModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (project: Omit<Project, "id">) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");
  const [members, setMembers] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [labels, setLabels] = useState("");
  const [errors, setErrors] = useState<{ name?: string; members?: string }>(
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
    const nextErrors: { name?: string; members?: string } = {};
    if (!name.trim()) {
      nextErrors.name = "Project name is required.";
    }
    if (members.length === 0) {
      nextErrors.members = "Select at least one member.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSaving(true);
    setSubmitError("");
    try {
      await onCreate({
        name: name.trim(),
        description: "",
        status,
        tags: labels
          .split(",")
          .map((label) => label.trim())
          .filter(Boolean),
        dueDate,
        members: members.map((memberName) => {
          const member = MEMBERS.find((entry) => entry.name === memberName);
          return { name: memberName, initials: member?.initials ?? "" };
        }),
        taskIds: [],
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create project."
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
      aria-label="Add project"
    >
      <div
        className={`fixed inset-0 bg-black/30 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className={`relative z-10 flex max-h-full w-full max-w-lg flex-col rounded-xl border border-border bg-surface shadow-xl ${closing ? "animate-scale-out" : "animate-scale-in"}`}>
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">Add Project</h2>
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
          id="add-project-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 py-4"
        >
          <div>
            <label htmlFor="add-project-name" className={fieldLabel}>
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="add-project-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Mobile Redesign"
              className={inputClass(Boolean(errors.name))}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className={fieldLabel}>Status</span>
              <div className="mt-1">
                <SelectMenu
                  value={status}
                  options={STATUS_OPTIONS}
                  onChange={(value) => setStatus(value as ProjectStatus)}
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
            <span className={fieldLabel}>
              Members <span className="text-red-500">*</span>
            </span>
            <div className="mt-1">
              <MemberSelect value={members} onChange={setMembers} />
            </div>
            {errors.members && (
              <p className="mt-1 text-xs text-red-600">{errors.members}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="add-project-labels" className={fieldLabel}>
              Labels
            </label>
            <input
              id="add-project-labels"
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
            disabled={saving}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-project-form"
            disabled={saving}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Creating…" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
