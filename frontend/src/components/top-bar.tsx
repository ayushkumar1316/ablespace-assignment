"use client";

import { useState } from "react";
import type { FieldKey, VisibleFields } from "../data/tasks";

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

function ColumnsIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
      <path d="M9 4v16M15 4v16" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  const [displayOpen, setDisplayOpen] = useState(false);

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

      <div className="relative">
        <button
          type="button"
          onClick={() => setDisplayOpen((open) => !open)}
          className={`relative z-20 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            displayOpen
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ColumnsIcon />
          Display
        </button>

        {displayOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setDisplayOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
              <p className="px-2 pt-1.5 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Display fields
              </p>
              {FIELD_OPTIONS.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={fields[option.key]}
                    onChange={(e) => setField(option.key, e.target.checked)}
                    className="w-4 h-4 accent-gray-900"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                  {fields[option.key] && (
                    <span className="ml-auto text-gray-400">
                      <CheckIcon />
                    </span>
                  )}
                </label>
              ))}
            </div>
          </>
        )}
      </div>

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
