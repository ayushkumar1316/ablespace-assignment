"use client";

import { useState, ReactNode } from "react";

export function TopBar({
  children,
  onViewToggle,
  selectedView,
  setSelectedView,
  onAddTask,
  onAddProject,
}: {
  children: ReactNode;
  onViewToggle: (view: "board" | "list") => void;
  selectedView: "board" | "list";
  setSelectedView: (view: "board" | "list") => void;
  onAddTask: () => void;
  onAddProject: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header
      className="flex items-center justify-between flex-wrap bg-background border-b border-border px-4 py-3"
    >
      {/* Left Section: App Name / Workspace */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-lg">Workspace</span>
      </div>

      {/* Center Section: View Toggles and Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* View Toggle */}
        <div
          onClick={() => onViewToggle("board")}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 cursor-pointer select-none transition-colors"
          style={{ background: selectedView === "board" ? "rgba(0,0,0,0.05)" : "transparent", color: selectedView === "board" ? "inherited" : "current" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Board
        </div>

        <div
          onClick={() => onViewToggle("list")}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 cursor-pointer select-none transition-colors"
          style={{ background: selectedView === "list" ? "rgba(0,0,0,0.05)" : "transparent", color: selectedView === "list" ? "inherited" : "current" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10l3 3l5-5m5 7l3-3l-2 2m2-4l-2 2m7 7v5a1 1 0 01-1 1h-3m-7-7v5a1 1 0 01-1 1h-3"
            />
          </svg>
          List
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-5.3-5.3a.75.75 0 010-1.06l5.3-5.3a.75.75 0 111.06 1.06l-5.3 5.3m-1.644 1.643a.75.75 0 01-1.06 0L19.5 11.808l-5.216 2.195m5.216 2.195L21 21"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4 h-10 w-full rounded border border-border bg-background placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
      </div>

      {/* Right Section: CTA Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAddTask}
          className="rounded-md px-3 py-1.5 text-sm font-medium bg-background hover:bg-border transition-colors"
        >
          Add Task
        </button>
        <button
          onClick={onAddProject}
          className="rounded-md px-3 py-1.5 text-sm font-medium bg-white hover:bg-border transition-colors"
        >
          Add Project
        </button>
      </div>
    </header>
  );
}