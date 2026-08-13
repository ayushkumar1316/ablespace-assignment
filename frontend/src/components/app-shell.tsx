"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Login } from "./login";
import { ProjectsWorkspace } from "./projects-workspace";
import { ProfileSettings } from "./profile-settings";
import type { ColorMode, Section, ThemeMode } from "../data/preferences";

export function AppShell({
  children,
  loginMode,
}: {
  children: ReactNode;
  loginMode?: boolean;
}) {
  const [section, setSection] = useState<Section>("tasks");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [colorMode, setColorMode] = useState<ColorMode>("blue");

  if (loginMode) {
    return <Login />;
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        section={section}
        onNavigate={setSection}
        theme={theme}
        onThemeChange={setTheme}
        colorMode={colorMode}
        onColorChange={setColorMode}
      />

      <main className="flex-1 flex flex-col overflow-hidden bg-white p-6">
        {section === "tasks" && children}
        {section === "projects" && <ProjectsWorkspace />}
        {section === "settings" && <ProfileSettings />}
      </main>
    </div>
  );
}
