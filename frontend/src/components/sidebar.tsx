"use client";

import { useState, ReactNode } from "react";

export function Sidebar({
  children,
  onThemeChange,
  onColorChange,
  onSettingsClick,
  selectedView,
  setSelectedView,
}: {
  children: ReactNode;
  onThemeChange: (theme: "light" | "dark") => void;
  onColorChange: (color: "amber" | "blue" | "pink" | "rose" | "emerald" | "black") => void;
  onSettingsClick: () => void;
  selectedView: "board" | "list";
  setSelectedView: (view: "board" | "list") => void;
}) {
  // Sidebar state
  const [minimized, setMinimized] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-64 bg-background transition-all duration-300 shrink-0 shadow-lg z-50"
      style={{ flexShrink: 0 }}
    >
      <div className="h-full flex flex-col">

        {/* User Profile Section */}
        <div className="flex items-gap-2 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <img
              src="/api/placeholder/40/40"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">Mandira Datta</span>
          </div>
          <button
            onClick={onSettingsClick}
            className="ml-auto text-muted-foreground hover:underline"
          >
            Settings
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col overflow-y-auto p-2">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-border transition-colors"
            onClick={() => setSelectedView("board")}
            style={{ color: selectedView === "board" ? "currentColor" : "inherit" }}
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-7 7v-5a1 1 0 00-1-1h-3m7 7v-5a1 1 0 01-1-1h-3"
              />
            </svg>
            Workspace
          </button>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-border transition-colors mt-2"
            onClick={() => setSelectedView("projects")}
          >
            Projects
          </button>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-border transition-colors mt-2"
            onClick={() => setSelectedView("settings")}
          >
            Settings
          </button>
        </nav>

        {/* Footer Utilities */}
        <div className="p-4 border-t border-border">
          <div className="flex flex-col gap-2">
            {/* Theme Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/60">Theme</label>
              <div className="relative">
                <select
                  onChange={(e) => onThemeChange(e.target.value as "light" | "dark")}
                  className="block w-full rounded border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            {/* Color Mode Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/60">Color Mode</label>
              <div className="relative">
                <select
                  onChange={(e) =>
                    onColorChange(
                      e.target.value as
                        | "amber"
                        | "blue"
                        | "pink"
                        | "rose"
                        | "emerald"
                        | "black"
                    )
                  }
                  className="block w-full rounded border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="amber">Amber</option>
                  <option value="blue">Blue</option>
                  <option value="pink">Pink</option>
                  <option value="rose">Rose</option>
                  <option value="emerald">Emerald</option>
                  <option value="black">Black</option>
                </select>
              </div>
            </div>

            {/* Settings Button */}
            <button
              onClick={onSettingsClick}
              className="w-full text-xs font-medium text-foreground/60 hover:underline"
            >
              Account
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}