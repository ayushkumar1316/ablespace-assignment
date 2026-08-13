"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { SelectMenu } from "./select-menu";
import type { SelectOption } from "./select-menu";
import { COLOR_MODE_OPTIONS, THEME_OPTIONS } from "../data/preferences";
import type { ColorMode, Section, ThemeMode } from "../data/preferences";

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

const THEME_MENU_OPTIONS: SelectOption[] = THEME_OPTIONS.map((option) => ({
  value: option.value,
  label: option.label,
}));

const COLOR_MENU_OPTIONS: SelectOption[] = COLOR_MODE_OPTIONS.map((option) => ({
  value: option.value,
  label: option.label,
}));

const COLOR_SWATCH: Record<ColorMode, string> = Object.fromEntries(
  COLOR_MODE_OPTIONS.map((option) => [option.value, option.hex])
) as Record<ColorMode, string>;

const NAV_ITEMS: { key: Section; label: string; icon: ReactNode }[] = [
  { key: "tasks", label: "Tasks", icon: <WorkspaceIcon /> },
  { key: "projects", label: "Projects", icon: <ProjectsIcon /> },
  { key: "settings", label: "Settings", icon: <SettingsIcon /> },
];

export function Sidebar({
  section,
  onNavigate,
  theme,
  onThemeChange,
  colorMode,
  onColorChange,
}: {
  section: Section;
  onNavigate: (section: Section) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  colorMode: ColorMode;
  onColorChange: (color: ColorMode) => void;
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

        {NAV_ITEMS.map((item, index) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onNavigate(item.key)}
            aria-current={section === item.key ? "page" : undefined}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              index > 0 ? "mt-1 " : ""
            }${
              section === item.key
                ? "bg-accent-soft text-accent-strong font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {item.icon}
            {!minimized && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer Utilities */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {!minimized && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Theme</label>
              <SelectMenu
                value={theme}
                options={THEME_MENU_OPTIONS}
                onChange={(value) => onThemeChange(value as ThemeMode)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Color Mode</label>
              <SelectMenu
                value={colorMode}
                options={COLOR_MENU_OPTIONS}
                onChange={(value) => onColorChange(value as ColorMode)}
                renderOption={(option) => (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: COLOR_SWATCH[option.value as ColorMode],
                      }}
                    />
                    <span>{option.label}</span>
                  </span>
                )}
              />
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
