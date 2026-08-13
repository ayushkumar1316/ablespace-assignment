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
}: {
  selectedView: "board" | "list";
  setSelectedView: (view: "board" | "list") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fields: VisibleFields;
  setField: (key: FieldKey, value: boolean) => void;
}) {
  return (
    <header className="flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 flex-wrap">
      <h1 className="text-lg font-semibold text-gray-900">Tasks</h1>

      <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5">
        <button
          type="button"
          onClick={() => setSelectedView("board")}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            selectedView === "board"
              ? "bg-white shadow-sm text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <BoardIcon />
          Board
        </button>
        <button
          type="button"
          onClick={() => setSelectedView("list")}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            selectedView === "list"
              ? "bg-white shadow-sm text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ListIcon />
          List
        </button>
      </div>

      <div className="relative flex-1 min-w-[160px]">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-8 pr-3 rounded-md border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <DisplayMenu fields={fields} options={FIELD_OPTIONS} onChange={setField} />

      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Add Task
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
        >
          Add Project
        </button>
      </div>
    </header>
  );
}
