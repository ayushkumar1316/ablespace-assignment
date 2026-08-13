"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  // State for view selection (client-side only)
  const [selectedView, setSelectedView] = React.useState<"board" | "list">("board");

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Header - shows view toggles and breadcrumb-like area */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
          <span className="font-medium">Tasks</span>

          {/* View Toggle Section */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView("board")}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: selectedView === "board"
                  ? "rgba(0, 0, 0, 0.05)"
                  : "transparent",
                color: selectedView === "board" ? "inherit" : "current",
              }}
            >
              Board
            </button>
            <button
              onClick={() => setSelectedView("list")}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: selectedView === "list"
                  ? "rgba(0, 0, 0, 0.05)"
                  : "transparent",
                color: selectedView === "list" ? "inherit" : "current",
              }}
            >
              List
            </button>
          </div>
        </div>

        {/* Content Area - Kanban Board or List View */}
        <main className="flex-1 p-4 bg-background overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}