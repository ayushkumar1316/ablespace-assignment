"use client";

import { useState } from "react";

function WorkspaceIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-7 7v-5a1 1 0 00-1-1h-3m7 7v-5a1 1 0 01-1-1h-3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M10.3 4.2a2 2 0 013.4 0l.5.8a2 2 0 002.3.9l.9-.3a2 2 0 012.6 1.3 2 2 0 01-1 2.3l-.8.4a2 2 0 000 3.6l.8.4a2 2 0 011 2.3 2 2 0 01-2.6 1.3l-.9-.3a2 2 0 00-2.3.9l-.5.8a2 2 0 01-3.4 0l-.5-.8a2 2 0 00-2.3-.9l-.9.3a2 2 0 01-2.6-1.3 2 2 0 011-2.3l.8-.4a2 2 0 000-3.6l-.8-.4a2 2 0 01-1-2.3 2 2 0 012.6-1.3l.9.3a2 2 0 002.3-.9l.5-.8z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  );
}

export function Sidebar({
  onThemeChange,
  onColorChange,
  onSettingsClick,
}: {
  onThemeChange?: (theme: "light" | "dark") => void;
  onColorChange?: (
    color: "amber" | "blue" | "pink" | "rose" | "emerald" | "black"
  ) => void;
  onSettingsClick?: () => void;
}) {
  const [minimized, setMinimized] = useState(false);

  return (
    <aside
      className={`shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        minimized ? "w-16" : "w-64"
      }`}
    >
      {/* User Profile Section */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
        <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
          MD
        </div>
        {!minimized && (
          <span className="font-medium text-gray-900 truncate">Mandira Datta</span>
        )}
        <button
          type="button"
          onClick={() => setMinimized((value) => !value)}
          className="ml-auto text-gray-400 hover:text-gray-600 p-1 rounded"
          aria-label={minimized ? "Expand sidebar" : "Minimize sidebar"}
        >
          <svg
            className={`w-4 h-4 transition-transform ${minimized ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col overflow-y-auto p-2">
        <p className={`px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide ${minimized ? "text-center px-0" : ""}`}>
          {minimized ? "•" : "Main"}
        </p>

        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-900 font-medium">
          <WorkspaceIcon />
          {!minimized && <span className="text-sm">Tasks</span>}
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors mt-1"
        >
          <ProjectsIcon />
          {!minimized && <span className="text-sm">Projects</span>}
        </button>

        <button
          type="button"
          onClick={onSettingsClick}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors mt-1"
        >
          <SettingsIcon />
          {!minimized && <span className="text-sm">Settings</span>}
        </button>
      </nav>

      {/* Footer Utilities */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {!minimized && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Theme</label>
              <select
                onChange={(e) => onThemeChange?.(e.target.value as "light" | "dark")}
                defaultValue="light"
                className="block w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Color Mode</label>
              <select
                onChange={(e) =>
                  onColorChange?.(
                    e.target.value as
                      | "amber"
                      | "blue"
                      | "pink"
                      | "rose"
                      | "emerald"
                      | "black"
                  )
                }
                defaultValue="blue"
                className="block w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="amber">Amber</option>
                <option value="blue">Blue</option>
                <option value="pink">Pink</option>
                <option value="rose">Rose</option>
                <option value="emerald">Emerald</option>
                <option value="black">Black</option>
              </select>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
