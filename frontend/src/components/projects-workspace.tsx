"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_PROJECT_VISIBLE_FIELDS,
  PROJECT_STATUS_STYLES,
  PROJECTS,
} from "../data/projects";
import type {
  Project,
  ProjectFieldKey,
  ProjectVisibleFields,
} from "../data/projects";
import { TASKS, formatDate } from "../data/tasks";
import { AddProjectModal } from "./add-project-modal";
import { Avatar } from "./avatar";
import { DisplayMenu } from "./display-menu";
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

const FIELD_OPTIONS: { key: ProjectFieldKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "members", label: "Members" },
  { key: "dueDate", label: "Due Date" },
  { key: "tags", label: "Tags" },
];

export function ProjectsWorkspace() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
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

  const selectedTask = TASKS.find((task) => task.id === selectedTaskId);
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

  const handleCreateProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
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
          onBack={() => setSelectedProjectId(null)}
          onSelectTask={setSelectedTaskId}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 flex-wrap">
        <h1 className="text-lg font-semibold text-gray-900">Projects</h1>

        <div className="relative flex-1 min-w-[160px]">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-md border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto h-full">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Project
                  </th>
                  {fields.status && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                  )}
                  {fields.members && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Members
                    </th>
                  )}
                  {fields.dueDate && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Due Date
                    </th>
                  )}
                  {fields.tags && (
                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-2.5">
                      <div className="text-sm font-medium text-gray-900">
                        {project.name}
                      </div>
                      <div className="text-xs text-gray-500">
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
                                className="w-6 h-6 text-[10px] ring-2 ring-white"
                              />
                            ))}
                          </div>
                          {project.members.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{project.members.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                    {fields.dueDate && (
                      <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(project.dueDate)}
                      </td>
                    )}
                    {fields.tags && (
                      <td className="px-3 py-2.5">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
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
        {filteredProjects.length === 0 && (
          <p className="mt-6 text-center text-sm text-gray-500">
            No projects match your search.
          </p>
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
