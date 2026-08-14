"use client";

import { formatDate } from "../data/tasks";
import type { Task, VisibleFields } from "../data/tasks";
import { Avatar } from "./avatar";
import { DragHandle } from "./drag-handle";
import type { DragHandleHandlers } from "./drag-handle";
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
  isGhost = false,
  dragging = false,
  grabbed = false,
  handleHandlers,
}: {
  task: Task;
  fields: VisibleFields;
  onSelect: () => void;
  isGhost?: boolean;
  dragging?: boolean;
  grabbed?: boolean;
  handleHandlers?: DragHandleHandlers;
}) {
  return (
    <div
      data-task-id={task.id}
      role={isGhost ? undefined : "button"}
      tabIndex={isGhost ? undefined : 0}
      onClick={isGhost ? undefined : onSelect}
      onKeyDown={
        isGhost
          ? undefined
          : (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect();
              }
            }
      }
      className={`group bg-surface rounded-lg border border-border shadow-sm transition-all p-3 flex gap-2 ${
        isGhost
          ? "w-72 rotate-2 shadow-2xl ring-2 ring-accent/50 border-accent/40"
          : dragging
            ? "opacity-40 ring-2 ring-accent/60 border-accent/50"
            : "hover:shadow-md hover:border-border-strong cursor-pointer"
      }`}
    >
      <DragHandle
        className="group-hover:text-foreground-faint mt-0.5"
        grabbed={grabbed}
        handlers={handleHandlers}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-foreground leading-snug">
            {task.title}
          </h4>
          {fields.priority && <PriorityBadge priority={task.priority} />}
        </div>

        <p className="mt-1 text-xs text-foreground-subtle line-clamp-2">{task.description}</p>

        <div className="mt-3 flex items-center gap-2">
          {fields.tags && task.tags.length > 0 && (
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
          )}

          <div className="ml-auto flex items-center gap-2 shrink-0">
            {fields.dueDate && (
              <span className="inline-flex items-center gap-1 text-[11px] text-foreground-subtle">
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
