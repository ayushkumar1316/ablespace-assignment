"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Login } from "./login";
import { ProjectsWorkspace } from "./projects-workspace";
import { ProfileSettings } from "./profile-settings";
import { COLOR_MODE_STORAGE_KEY, THEME_STORAGE_KEY } from "../data/preferences";
import type { ColorMode, Section, ThemeMode } from "../data/preferences";

const COLOR_MODES: ColorMode[] = [
  "amber",
  "blue",
  "pink",
  "rose",
  "emerald",
  "black",
];

function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" ? "dark" : "light";
}

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getColorModeSnapshot(): ColorMode {
  if (typeof window === "undefined") {
    return "blue";
  }
  const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  return stored && (COLOR_MODES as string[]).includes(stored)
    ? (stored as ColorMode)
    : "blue";
}

export function AppShell({
  children,
  loginMode,
}: {
  children: ReactNode;
  loginMode?: boolean;
}) {
  const [section, setSection] = useState<Section>("tasks");
  const theme = useSyncExternalStore<ThemeMode>(
    subscribeToStorage,
    getThemeSnapshot,
    () => "light"
  );
  const colorMode = useSyncExternalStore<ColorMode>(
    subscribeToStorage,
    getColorModeSnapshot,
    () => "blue"
  );

  const handleThemeChange = (next: ThemeMode) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    window.dispatchEvent(new Event("storage"));
  };

  const handleColorChange = (next: ColorMode) => {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.accent = colorMode;
  }, [colorMode]);

  if (loginMode) {
    return <Login />;
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        section={section}
        onNavigate={setSection}
        theme={theme}
        onThemeChange={handleThemeChange}
        colorMode={colorMode}
        onColorChange={handleColorChange}
      />

      <main className="flex-1 flex flex-col overflow-hidden bg-surface p-6">
        {section === "tasks" && children}
        {section === "projects" && <ProjectsWorkspace />}
        {section === "settings" && <ProfileSettings />}
      </main>
    </div>
  );
}
