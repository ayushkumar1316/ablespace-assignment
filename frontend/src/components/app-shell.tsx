"use client";

import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Login } from "./login";

export function AppShell({
  children,
  loginMode,
}: {
  children: ReactNode;
  loginMode?: boolean;
}) {
  if (loginMode) {
    return <Login />;
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden bg-white p-6">
        {children}
      </main>
    </div>
  );
}
