"use client";

import { STATUSES } from "../data/tasks";
import type { Task, VisibleFields } from "../data/tasks";
import { TaskCard } from "./task-card";

export function KanbanBoard({
  tasks,
  fields,
}: {
  tasks: Task[];
  fields: VisibleFields;
}) {
  return (
    <div className="flex gap-4 h-full overflow-x-auto pb-2">
      {STATUSES.map(({ key, label }) => {
        const columnTasks = tasks.filter((task) => task.status === key);
        return (
          <div
            key={key}
            className="w-72 shrink-0 h-full flex flex-col rounded-xl bg-gray-100"
          >
            <div className="flex items-center justify-between px-3 py-2.5">
              <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
              <span className="text-xs text-gray-500">{columnTasks.length}</span>
            </div>
            <div className="flex-1 px-2 pb-2 space-y-2 overflow-y-auto">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} fields={fields} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
