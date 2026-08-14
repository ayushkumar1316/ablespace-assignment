"use client";

import { useEffect, useState } from "react";
import { Avatar } from "./avatar";
import { EmptyState } from "./empty-state";

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function LogOutIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProfileSettings() {
  const [name, setName] = useState("Mandira Datta");
  const [email, setEmail] = useState("mandira@ablespace.app");
  const [savedName, setSavedName] = useState(name);
  const [savedEmail, setSavedEmail] = useState(email);
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [leftWorkspace, setLeftWorkspace] = useState(false);

  const dirty = name.trim() !== savedName || email.trim() !== savedEmail;

  useEffect(() => {
    if (saveState !== "saved") {
      return;
    }
    const timer = window.setTimeout(() => setSaveState("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [saveState]);

  useEffect(() => {
    if (!confirmLeave) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setConfirmLeave(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmLeave]);

  const handleSave = () => {
    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setSavedName(name.trim());
    setSavedEmail(email.trim());
    setSaveState("saved");
  };

  const handleLeave = () => {
    setConfirmLeave(false);
    setLeftWorkspace(true);
  };

  const inputClass = (hasError: boolean) =>
    `mt-1 w-full rounded-md border px-3 py-2 text-sm text-foreground-secondary focus:outline-none ${
      hasError
        ? "border-red-300 focus:border-red-400"
        : "border-border focus:border-accent"
    }`;

  if (leftWorkspace) {
    return (
      <div className="h-full overflow-y-auto">
        <EmptyState
          icon={<LogOutIcon />}
          title="You've left the workspace"
          description="Your profile and saved data remain intact. Rejoin the workspace anytime."
          action={
            <button
              type="button"
              onClick={() => setLeftWorkspace(false)}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors"
            >
              Return to workspace
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="text-lg font-semibold text-foreground">Settings</h1>
      <p className="mt-0.5 text-sm text-foreground-subtle">
        Manage your profile and workspace.
      </p>

      <div className="mt-6 max-w-2xl space-y-6">
        <section className="rounded-lg border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Profile</h2>
          <p className="mt-0.5 text-sm text-foreground-subtle">
            Update your personal information.
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar
              name={name || " "}
              initials={initialsFromName(name)}
              className="w-14 h-14 text-lg"
            />
            <div className="flex-1 space-y-3">
              <div>
                <label
                  htmlFor="profile-name"
                  className="text-xs font-medium text-foreground-subtle uppercase tracking-wide"
                >
                  Name
                </label>
                <input
                  id="profile-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="profile-email"
                  className="text-xs font-medium text-foreground-subtle uppercase tracking-wide"
                >
                  Email
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            {saveState === "saved" && (
              <span className="text-sm font-medium text-emerald-600">Saved</span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={!dirty}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save changes
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Workspace</h2>
          <p className="mt-0.5 text-sm text-foreground-subtle">
            Manage your workspace membership.
          </p>

          <div className="mt-4 flex items-center justify-between rounded-md border border-border bg-surface-muted px-3 py-2.5">
            <p className="text-sm font-medium text-foreground">AbleSpace</p>
            <span className="text-xs text-foreground-subtle">Workspace</span>
          </div>

          <button
            type="button"
            onClick={() => setConfirmLeave(true)}
            className="mt-4 rounded-md border border-red-500/40 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500/10 transition-colors"
          >
            Leave Workspace
          </button>
        </section>
      </div>

      {confirmLeave && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Leave workspace"
        >
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setConfirmLeave(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-xl">
            <h2 className="text-base font-semibold text-foreground">
              Leave workspace?
            </h2>
            <p className="mt-1 text-sm text-foreground-subtle">
              You will be signed out of this workspace. Your profile and saved
              data remain intact.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmLeave(false)}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLeave}
                className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500/15 transition-colors"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
