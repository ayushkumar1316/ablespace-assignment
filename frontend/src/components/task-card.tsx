"use client";

import { formatDate } from "../data/tasks";
import type { Task, VisibleFields } from "../data/tasks";
import { Avatar } from "./avatar";
import { DragHandle } from "./drag-handle";
import { PriorityBadge } from "./priority-badge";

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
  onSelect,
}: {
  task: Task;
  fields: VisibleFields;
  onSelect: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer p-3 flex gap-2"
    >
      <DragHandle className="group-hover:text-gray-400 mt-0.5" />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-gray-900 leading-snug">
            {task.title}
          </h4>
          {fields.priority && <PriorityBadge priority={task.priority} />}
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
              <Avatar
                name={task.assignee}
                initials={task.assigneeInitials}
                className="w-6 h-6 text-[10px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
