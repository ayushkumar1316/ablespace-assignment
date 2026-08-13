import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../components/sidebar";
import { TopBar } from "../components/top-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management System",
  description: "Full-stack Task Management System",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // State for view selection
  const [selectedView, setSelectedView] = React.useState<"board" | "list">("board");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex bg-background flex-col">
        {/* Top Bar */}
        <TopBar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          onViewToggle={(view) => setSelectedView(view)}
          onAddTask={() => alert("Add Task clicked")}
          onAddProject={() => alert("Add Project clicked")}
        />

        {/* Main Application Area */}
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Sidebar - fixed on mobile, persistent on desktop */}
          <Sidebar
            onThemeChange={(theme) => {
              // Update root CSS variables for theme
              const root = document.documentElement;
              if (theme === "dark") {
                root.style.setProperty("--background", "#0a0a0a");
                root.style.setProperty("--foreground", "#ededed");
              } else {
                root.style.setProperty("--background", "#ffffff");
                root.style.setProperty("--foreground", "#171717");
              }
            }}
            onColorChange={(color) => {
              // Apply color mode - would add custom CSS classes here
              console.log("Color mode:", color);
            }}
            onSettingsClick={() => alert("Settings clicked")}
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
      </body>
    </html>
  );
}