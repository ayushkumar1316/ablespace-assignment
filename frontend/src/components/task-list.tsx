"use client";

import { Fragment, useState } from "react";
import { AVATAR_COLORS, PRIORITY_CONFIG, STATUSES, formatDate } from "../data/tasks";
import type { Task, VisibleFields } from "../data/tasks";

function avatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
}

function DragHandle() {
  return (
    <svg
      className="w-4 h-4 text-gray-300 cursor-grab"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="9" cy="6" r="1.6" />
      <circle cx="15" cy="6" r="1.6" />
      <circle cx="9" cy="12" r="1.6" />
      <circle cx="15" cy="12" r="1.6" />
      <circle cx="9" cy="18" r="1.6" />
      <circle cx="15" cy="18" r="1.6" />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "" : "-rotate-90"}`}
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
}: {
  tasks: Task[];
  fields: VisibleFields;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fieldCount = 1 + (fields.priority ? 1 : 0) + (fields.tags ? 1 : 0) + (fields.dueDate ? 1 : 0) + (fields.assignee ? 1 : 0);
  const colSpan = 2 + fieldCount - 1;

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="w-10 px-3 py-2.5" />
              <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Task
              </th>
              {fields.priority && (
                <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Priority
                </th>
              )}
              {fields.tags && (
                <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Tags
                </th>
              )}
              {fields.dueDate && (
                <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Due Date
                </th>
              )}
              {fields.assignee && (
                <th className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                  <tr className="bg-gray-50">
                    <td colSpan={colSpan} className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => toggleSection(key)}
                        className="flex items-center gap-2 text-left w-full"
                        aria-expanded={!isCollapsed}
                      >
                        <ChevronIcon expanded={!isCollapsed} />
                        <span className="text-sm font-semibold text-gray-700">{label}</span>
                        <span className="text-xs text-gray-500">{sectionTasks.length}</span>
                      </button>
                    </td>
                  </tr>
                  {!isCollapsed &&
                    sectionTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2.5">
                          <DragHandle />
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="text-sm font-medium text-gray-900">{task.title}</div>
                          <div className="text-xs text-gray-500">{task.description}</div>
                        </td>
                        {fields.priority && (
                          <td className="px-3 py-2.5">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${PRIORITY_CONFIG[task.priority].badgeClass}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${PRIORITY_CONFIG[task.priority].dotClass}`}
                              />
                              {PRIORITY_CONFIG[task.priority].label}
                            </span>
                          </td>
                        )}
                        {fields.tags && (
                          <td className="px-3 py-2.5">
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
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
                        {fields.dueDate && (
                          <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">
                            {formatDate(task.dueDate)}
                          </td>
                        )}
                        {fields.assignee && (
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-6 h-6 rounded-full ${avatarColor(task.assignee)} text-white text-[10px] font-semibold flex items-center justify-center`}
                              >
                                {task.assigneeInitials}
                              </span>
                              <span className="text-sm text-gray-600 whitespace-nowrap">
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
