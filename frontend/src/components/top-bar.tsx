"use client";

import type { FieldKey, VisibleFields } from "../data/tasks";
import { DisplayMenu } from "./display-menu";

function BoardIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const FIELD_OPTIONS: { key: FieldKey; label: string }[] = [
  { key: "priority", label: "Priority" },
  { key: "tags", label: "Tags" },
  { key: "dueDate", label: "Due Date" },
  { key: "assignee", label: "Assignee" },
];

export function TopBar({
  selectedView,
  setSelectedView,
  searchQuery,
  setSearchQuery,
  fields,
  setField,
  onAddTask,
}: {
  selectedView: "board" | "list";
  setSelectedView: (view: "board" | "list") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fields: VisibleFields;
  setField: (key: FieldKey, value: boolean) => void;
  onAddTask: () => void;
}) {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-surface px-4 py-3 flex-wrap">
      <div className="flex items-center gap-3 sm:gap-4">
        <h1 className="text-lg font-semibold text-foreground">Tasks</h1>

        <div className="flex items-center gap-1 rounded-lg bg-surface-subtle p-0.5 transition-colors">
          <button
            type="button"
            onClick={() => setSelectedView("board")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-out ${
              selectedView === "board"
                ? "bg-accent text-white shadow-sm"
                : "text-foreground-subtle hover:text-foreground-secondary"
            }`}
          >
            <BoardIcon />
            Board
          </button>
          <button
            type="button"
            onClick={() => setSelectedView("list")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-out ${
              selectedView === "list"
                ? "bg-accent text-white shadow-sm"
                : "text-foreground-subtle hover:text-foreground-secondary"
            }`}
          >
            <ListIcon />
            List
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-w-[160px]">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-faint">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-8 pr-3 rounded-md border border-border bg-surface-muted text-sm placeholder:text-foreground-faint focus:outline-none focus:ring-2 focus:ring-border"
        />
      </div>

      <DisplayMenu fields={fields} options={FIELD_OPTIONS} onChange={setField} />

      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          onClick={onAddTask}
          className="rounded-md px-3 py-1.5 text-sm font-medium bg-surface text-foreground-secondary border border-border hover:bg-surface-muted transition-colors btn-press"
        >
          Add Task
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-colors btn-press"
        >
          Add Project
        </button>
      </div>
    </header>
  );
}
