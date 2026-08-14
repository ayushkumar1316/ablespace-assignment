"use client";

import { Fragment, useState } from "react";
import { STATUSES, formatDate } from "../data/tasks";
import type { Task, VisibleFields } from "../data/tasks";
import { Avatar } from "./avatar";
import { DragHandle } from "./drag-handle";
import { PriorityBadge } from "./priority-badge";

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-foreground-faint transition-transform ${expanded ? "" : "-rotate-90"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TaskList({
  tasks,
  fields,
  onSelect,
}: {
  tasks: Task[];
  fields: VisibleFields;
  onSelect: (taskId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fieldCount = 1 + (fields.priority ? 1 : 0) + (fields.tags ? 1 : 0) + (fields.dueDate ? 1 : 0) + (fields.assignee ? 1 : 0);
  const colSpan = 2 + fieldCount - 1;

  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="w-10 px-3 py-2.5" />
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                Task
              </th>
              {fields.priority && (
                <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                  Priority
                </th>
              )}
              {fields.tags && (
                <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                  Tags
                </th>
              )}
              {fields.dueDate && (
                <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                  Due Date
                </th>
              )}
              {fields.assignee && (
                <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wide">
                  Assignee
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {STATUSES.map(({ key, label }) => {
              const sectionTasks = tasks.filter((task) => task.status === key);
              const isCollapsed = Boolean(collapsed[key]);
              return (
                <Fragment key={key}>
                  <tr className="bg-surface-muted">
                    <td colSpan={colSpan} className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => toggleSection(key)}
                        className="flex items-center gap-2 text-left w-full"
                        aria-expanded={!isCollapsed}
                      >
                        <ChevronIcon expanded={!isCollapsed} />
                        <span className="text-sm font-semibold text-foreground-secondary">{label}</span>
                        <span className="text-xs text-foreground-subtle">{sectionTasks.length}</span>
                      </button>
                    </td>
                  </tr>
                  {!isCollapsed &&
                    sectionTasks.map((task) => (
                      <tr
                        key={task.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelect(task.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onSelect(task.id);
                          }
                        }}
                        className="border-t border-border-subtle hover:bg-surface-muted transition-colors cursor-pointer"
                      >
                        <td className="px-3 py-2.5">
                          <DragHandle />
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="text-sm font-medium text-foreground">{task.title}</div>
                          <div className="text-xs text-foreground-subtle">{task.description}</div>
                        </td>
                        {fields.priority && (
                          <td className="px-3 py-2.5">
                            <PriorityBadge priority={task.priority} />
                          </td>
                        )}
                        {fields.tags && (
                          <td className="px-3 py-2.5">
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
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
                        {fields.dueDate && (
                          <td className="px-3 py-2.5 text-xs text-foreground-subtle whitespace-nowrap">
                            {formatDate(task.dueDate)}
                          </td>
                        )}
                        {fields.assignee && (
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <Avatar
                                name={task.assignee}
                                initials={task.assigneeInitials}
                                className="w-6 h-6 text-[10px]"
                              />
                              <span className="text-sm text-foreground-muted whitespace-nowrap">
                                {task.assignee}
                              </span>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
