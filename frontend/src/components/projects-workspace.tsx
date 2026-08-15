"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_PROJECT_VISIBLE_FIELDS,
  PROJECT_STATUS_STYLES,
} from "../data/projects";
import type {
  Project,
  ProjectFieldKey,
  ProjectVisibleFields,
} from "../data/projects";
import { formatDate } from "../data/tasks";
import type { Task } from "../data/tasks";
import { createProject, fetchProjects, fetchTasks } from "../lib/api";
import { AddProjectModal } from "./add-project-modal";
import { Avatar } from "./avatar";
import { DisplayMenu } from "./display-menu";
import { EmptyState } from "./empty-state";
import { ProjectDetail } from "./project-detail";
import { TaskDetail } from "./task-detail";

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchXIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35M8.5 8.5l5 5M13.5 8.5l-5 5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FolderPlusIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 11v4M10 13h4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3L2 21h20L12 3z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 10v4M12 17h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      className="w-5 h-5 animate-spin"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" strokeWidth="2" strokeLinecap="round" strokeDasharray="40 80" />
    </svg>
  );
}

const FIELD_OPTIONS: { key: ProjectFieldKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "members", label: "Members" },
  { key: "dueDate", label: "Due Date" },
  { key: "tags", label: "Tags" },
];

export function ProjectsWorkspace() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadState, setLoadState] = useState<
    "loading" | "error" | "ready"
  >("loading");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields] = useState<ProjectVisibleFields>(
    DEFAULT_PROJECT_VISIBLE_FIELDS
  );
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const setField = (key: ProjectFieldKey, value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const loadProjects = useCallback(async () => {
    try {
      const [loadedProjects, loadedTasks] = await Promise.all([
        fetchProjects(),
        fetchTasks(),
      ]);
      setProjects(loadedProjects);
      setTasks(loadedTasks);
      setLoadState("ready");
    } catch (error) {
      console.error("Failed to load projects", error);
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchProjects(), fetchTasks()])
      .then(([loadedProjects, loadedTasks]) => {
        if (cancelled) return;
        setProjects(loadedProjects);
        setTasks(loadedTasks);
        setLoadState("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load projects", error);
        setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return projects;
    }
    return projects.filter((project) =>
      [project.name, project.description, ...project.tags].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, projects]);

  const handleCreateProject = async (input: Omit<Project, "id">) => {
    const created = await createProject(input);
    setProjects((prev) => [...prev, created]);
    setIsAddProjectOpen(false);
  };

  if (selectedTask) {
    return (
      <div className="h-full overflow-y-auto">
        <TaskDetail
          task={selectedTask}
          onBack={() => setSelectedTaskId(null)}
          backLabel="Project"
        />
      </div>
    );
  }

  if (selectedProject) {
    return (
      <div className="h-full overflow-y-auto">
        <ProjectDetail
          project={selectedProject}
          tasks={tasks}
          onBack={() => setSelectedProjectId(null)}
          onSelectTask={setSelectedTaskId}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center gap-4 border-b border-border bg-surface px-4 py-3 flex-wrap">
        <h1 className="text-lg font-semibold text-foreground">Projects</h1>

        <div className="relative flex-1 min-w-[160px]">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-faint">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-md border border-border bg-surface-muted text-sm placeholder:text-foreground-faint focus:outline-none focus:ring-2 focus:ring-border"
          />
        </div>

        <DisplayMenu fields={fields} options={FIELD_OPTIONS} onChange={setField} />

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setIsAddProjectOpen(true)}
            className="rounded-md px-3 py-1.5 text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-colors"
          >
            Add Project
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden pt-4">
        {loadState === "loading" ? (
          <EmptyState icon={<LoadingIcon />} title="Loading projects…" />
        ) : loadState === "error" ? (
          <EmptyState
            icon={<ErrorIcon />}
            title="Failed to load projects"
            description="Something went wrong while loading your projects."
            action={
              <button
                type="button"
                onClick={() => {
                  setLoadState("loading");
                  void loadProjects();
                }}
                className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
              >
                Retry
              </button>
            }
          />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            icon={searchQuery.trim() ? <SearchXIcon /> : <FolderPlusIcon />}
            title={searchQuery.trim() ? "No results found" : "No projects yet"}
            description={
              searchQuery.trim()
                ? "No projects match your search. Try a different keyword or clear the search."
                : "Create your first project to start organizing your work."
            }
            action={
              searchQuery.trim() ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
                >
                  Clear search
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(true)}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors"
                >
                  Add Project
                </button>
              )
            }
          />
        ) : (
          <div className="rounded-lg border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto h-full">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                    Project
                  </th>
                  {fields.status && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                      Status
                    </th>
                  )}
                  {fields.members && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                      Members
                    </th>
                  )}
                  {fields.dueDate && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                      Due Date
                    </th>
                  )}
                  {fields.tags && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                      Tags
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedProjectId(project.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedProjectId(project.id);
                      }
                    }}
                    className="border-t border-border-subtle hover:bg-surface-muted transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-2.5">
                      <div className="text-sm font-medium text-foreground">
                        {project.name}
                      </div>
                      <div className="text-xs text-foreground-subtle">
                        {project.description}
                      </div>
                    </td>
                    {fields.status && (
                      <td className="px-3 py-2.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${PROJECT_STATUS_STYLES[project.status]}`}
                        >
                          {project.status === "active" ? "Active" : "Completed"}
                        </span>
                      </td>
                    )}
                    {fields.members && (
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="flex -space-x-1.5">
                            {project.members.slice(0, 3).map((member) => (
                              <Avatar
                                key={member.name}
                                name={member.name}
                                initials={member.initials}
                                className="w-6 h-6 text-[10px] ring-2 ring-surface"
                              />
                            ))}
                          </div>
                          {project.members.length > 3 && (
                            <span className="text-xs text-foreground-subtle">
                              +{project.members.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                    {fields.dueDate && (
                      <td className="px-3 py-2.5 text-xs text-foreground-subtle whitespace-nowrap">
                        {formatDate(project.dueDate)}
                      </td>
                    )}
                    {fields.tags && (
                      <td className="px-3 py-2.5">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-surface-subtle px-2 py-0.5 text-[11px] font-medium text-foreground-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>

      {isAddProjectOpen && (
        <AddProjectModal
          onClose={() => setIsAddProjectOpen(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}
