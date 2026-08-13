"use client";

import { useState } from "react";
import { STATUSES, formatActivityTime } from "../data/tasks";
import type {
  Activity,
  Task,
  TaskPriority,
  TaskStatus,
} from "../data/tasks";
import { Avatar } from "./avatar";
import { DatePicker } from "./date-picker";
import { PriorityBadge } from "./priority-badge";
import { SelectMenu } from "./select-menu";
import type { SelectOption } from "./select-menu";

const CURRENT_USER = { name: "Mandira Datta", initials: "MD" };

const PRIORITY_OPTIONS: SelectOption[] = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const STATUS_OPTIONS: SelectOption[] = STATUSES.map((status) => ({
  value: status.key,
  label: status.label,
}));

function BackIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M15 6l-6 6 6 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetaCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function TaskDetail({
  task,
  onBack,
}: {
  task: Task;
  onBack: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.dueDate);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [activity, setActivity] = useState<Activity[]>(task.activity);
  const [comment, setComment] = useState("");

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, done: !subtask.done }
          : subtask
      )
    );
  };

  const addComment = (event: React.FormEvent) => {
    event.preventDefault();
    const text = comment.trim();
    if (!text) {
      return;
    }
    const newActivity: Activity = {
      id: `local-${Date.now()}`,
      author: CURRENT_USER.name,
      authorInitials: CURRENT_USER.initials,
      text,
      createdAt: new Date().toISOString().slice(0, 16),
    };
    setActivity((prev) => [...prev, newActivity]);
    setComment("");
  };

  const doneCount = subtasks.filter((subtask) => subtask.done).length;

  return (
    <div className="h-full overflow-y-auto">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <BackIcon />
        All tasks
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 space-y-8">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Task title"
            className="w-full bg-transparent text-2xl font-bold text-gray-900 outline-none"
          />

          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Description
            </h3>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              aria-label="Description"
              className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Subtasks{" "}
              <span className="font-normal text-gray-400">
                {doneCount}/{subtasks.length}
              </span>
            </h3>
            <ul className="space-y-1">
              {subtasks.map((subtask) => (
                <li key={subtask.id}>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-1.5 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={subtask.done}
                      onChange={() => toggleSubtask(subtask.id)}
                      className="mt-0.5 h-4 w-4 accent-indigo-600"
                    />
                    <span
                      className={`text-sm ${
                        subtask.done
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Activity
            </h3>
            <ul className="space-y-4">
              {activity.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <Avatar
                    name={item.author}
                    initials={item.authorInitials}
                    className="w-8 h-8 text-xs"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{item.author}</span>{" "}
                      <span className="text-gray-500">{item.text}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {formatActivityTime(item.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={addComment} className="mt-4 flex items-start gap-3">
              <Avatar
                name={CURRENT_USER.name}
                initials={CURRENT_USER.initials}
                className="w-8 h-8 text-xs"
              />
              <input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Write a comment..."
                aria-label="Write a comment"
                className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-indigo-400 focus:outline-none"
              />
            </form>
          </div>
        </div>

        <aside className="w-full shrink-0 space-y-3 lg:w-72 lg:border-l lg:border-gray-200 lg:pl-6">
          <MetaCard title="Status">
            <SelectMenu
              value={status}
              options={STATUS_OPTIONS}
              onChange={(value) => setStatus(value as TaskStatus)}
            />
          </MetaCard>

          <MetaCard title="Priority">
            <SelectMenu
              value={priority}
              options={PRIORITY_OPTIONS}
              onChange={(value) => setPriority(value as TaskPriority)}
              renderOption={(option) => (
                <PriorityBadge priority={option.value as TaskPriority} />
              )}
            />
          </MetaCard>

          <MetaCard title="Members">
            <div className="flex items-center gap-2.5">
              <Avatar
                name={task.assignee}
                initials={task.assigneeInitials}
                className="w-7 h-7 text-xs"
              />
              <span className="text-sm text-gray-700">{task.assignee}</span>
            </div>
          </MetaCard>

          <MetaCard title="Dates">
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </MetaCard>

          <MetaCard title="Labels">
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </MetaCard>
        </aside>
      </div>
    </div>
  );
}
