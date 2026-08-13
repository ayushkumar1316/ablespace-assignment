"use client";

import { AVATAR_COLORS, PRIORITY_CONFIG, formatDate } from "../data/tasks";
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
      className="w-4 h-4 shrink-0 text-gray-300 group-hover:text-gray-400 cursor-grab mt-0.5"
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

function CalendarIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        strokeWidth="2"
      />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TaskCard({
  task,
  fields,
}: {
  task: Task;
  fields: VisibleFields;
}) {
  const priority = PRIORITY_CONFIG[task.priority];

  return (
    <div className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-3 flex gap-2">
      <DragHandle />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-gray-900 leading-snug">
            {task.title}
          </h4>
          {fields.priority && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${priority.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priority.dotClass}`} />
              {priority.label}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{task.description}</p>

        <div className="mt-3 flex items-center gap-2">
          {fields.tags && task.tags.length > 0 && (
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
          )}

          <div className="ml-auto flex items-center gap-2 shrink-0">
            {fields.dueDate && (
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                <CalendarIcon />
                {formatDate(task.dueDate)}
              </span>
            )}
            {fields.assignee && (
              <span
                className={`w-6 h-6 rounded-full ${avatarColor(task.assignee)} text-white text-[10px] font-semibold flex items-center justify-center`}
                title={task.assignee}
              >
                {task.assigneeInitials}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
