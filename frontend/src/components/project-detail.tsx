"use client";

import { DEFAULT_VISIBLE_FIELDS, formatDate } from "../data/tasks";
import type { Task } from "../data/tasks";
import { PROJECT_STATUS_STYLES } from "../data/projects";
import type { Project } from "../data/projects";
import { Avatar } from "./avatar";
import { EmptyState } from "./empty-state";
import { TaskList } from "./task-list";

function ChevronRightIcon() {
  return (
    <svg
      className="w-4 h-4 text-foreground-fainter"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-foreground-faint"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardListIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="5" y="4" width="14" height="17" rx="2" strokeWidth="2" />
      <path d="M9 9h6M9 13h6M9 17h3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectDetail({
  project,
  tasks,
  onBack,
  onSelectTask,
}: {
  project: Project;
  tasks: Task[];
  onBack: () => void;
  onSelectTask: (taskId: string) => void;
}) {
  const projectTasks = tasks.filter((task) =>
    project.taskIds.includes(task.id)
  );

  return (
    <div className="h-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-5" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={onBack}
          className="font-medium text-foreground-subtle hover:text-foreground transition-colors"
        >
          Projects
        </button>
        <ChevronRightIcon />
        <span className="font-medium text-foreground">{project.name}</span>
      </nav>

      {/* Summary */}
      <div className="rounded-lg border border-border bg-surface p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-foreground">{project.name}</h1>
            <p className="mt-1 text-sm text-foreground-subtle">{project.description}</p>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${PROJECT_STATUS_STYLES[project.status]}`}
          >
            {project.status === "active" ? "Active" : "Completed"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {project.members.map((member) => (
                <Avatar
                  key={member.name}
                  name={member.name}
                  initials={member.initials}
                  className="w-6 h-6 text-[10px] ring-2 ring-surface"
                />
              ))}
            </div>
            <span className="text-sm text-foreground-muted">
              {project.members.map((member) => member.name).join(", ")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
            <CalendarIcon />
            Due {formatDate(project.dueDate)}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-surface-subtle px-2 py-0.5 text-xs font-medium text-foreground-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-6">
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Tasks <span className="font-normal text-foreground-faint">{projectTasks.length}</span>
        </h2>
        {projectTasks.length === 0 ? (
          <EmptyState
            icon={<ClipboardListIcon />}
            title="No tasks yet"
            description="This project doesn't have any tasks."
            className="border border-border bg-surface rounded-lg"
          />
        ) : (
          <TaskList tasks={projectTasks} fields={DEFAULT_VISIBLE_FIELDS} onSelect={onSelectTask} />
        )}
      </div>
    </div>
  );
}
