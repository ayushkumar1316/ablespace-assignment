"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Login } from "./login";
import { ProjectsWorkspace } from "./projects-workspace";
import { ProfileSettings } from "./profile-settings";
import { COLOR_MODE_STORAGE_KEY, THEME_STORAGE_KEY } from "../data/preferences";
import type { ColorMode, Section, ThemeMode } from "../data/preferences";
import { fetchPreferences, getGuestToken, hasGuestToken, updatePreferences } from "../lib/api";
import { loadProfile } from "../lib/user-profile";
import { ToastContainer } from "./toast";

const COLOR_MODES: ColorMode[] = [
  "amber",
  "blue",
  "pink",
  "rose",
  "emerald",
  "black",
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        className={`transition-all duration-300 ease-out ${open ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`}
        d={open ? "M6 6l12 12" : "M4 7h16"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className={`transition-all duration-300 ease-out ${open ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
        d="M4 12h16"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className={`transition-all duration-300 ease-out ${open ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`}
        d={open ? "M18 6L6 18" : "M4 17h16"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

function applyPreferences(prefs: { theme: ThemeMode; colorMode: ColorMode }) {
  window.localStorage.setItem(THEME_STORAGE_KEY, prefs.theme);
  window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, prefs.colorMode);
  window.dispatchEvent(new Event("storage"));
}

export function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean>(() => hasGuestToken());
  const [section, setSection] = useState<Section>("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    void updatePreferences({ theme: next }).catch((error) => {
      console.error("Failed to save theme preference", error);
    });
  };

  const handleColorChange = (next: ColorMode) => {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
    window.dispatchEvent(new Event("storage"));
    void updatePreferences({ colorMode: next }).catch((error) => {
      console.error("Failed to save color mode preference", error);
    });
  };

  useEffect(() => {
    let cancelled = false;
    fetchPreferences()
      .then((prefs) => {
        if (cancelled) return;
        applyPreferences(prefs);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load preferences", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadProfile()
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load profile", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.accent = colorMode;
  }, [colorMode]);

  useEffect(() => {
    if (!sidebarOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  const handleLogin = useCallback(async () => {
    await getGuestToken();
    setAuthenticated(true);
  }, []);

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
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
        mobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-hidden bg-surface">
        <div className="md:hidden flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="-ml-1 rounded-md p-1.5 text-foreground-muted hover:bg-surface-subtle hover:text-foreground transition-colors"
          >
            <MenuIcon open={sidebarOpen} />
          </button>
          <span className="text-base font-semibold text-foreground">
            AbleSpace
          </span>
          <span className="w-6" aria-hidden="true" />
        </div>
        <div className="flex-1 min-h-0 p-3 md:p-6" key={section}>
          <div className="animate-fade-in h-full">
            {section === "tasks" && children}
            {section === "projects" && <ProjectsWorkspace />}
            {section === "settings" && <ProfileSettings />}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
