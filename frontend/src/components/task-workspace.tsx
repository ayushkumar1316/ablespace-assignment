"use client";

import { useMemo, useState } from "react";
import { DEFAULT_VISIBLE_FIELDS, TASKS } from "../data/tasks";
import type { FieldKey, Task, TaskStatus, VisibleFields } from "../data/tasks";
import { TopBar } from "./top-bar";
import { KanbanBoard } from "./kanban-board";
import { TaskList } from "./task-list";
import { TaskDetail } from "./task-detail";
import { AddTaskModal } from "./add-task-modal";

export function TaskWorkspace() {
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [view, setView] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields] = useState<VisibleFields>(DEFAULT_VISIBLE_FIELDS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const setField = (key: FieldKey, value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return tasks;
    }
    return tasks.filter((task) =>
      [task.title, task.description, ...task.tags].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, tasks]);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  const handleCreateTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
    setIsAddTaskOpen(false);
  };

  const handleReorderTask = (taskId: string, status: TaskStatus, index: number) => {
    setTasks((prev) => {
      const task = prev.find((item) => item.id === taskId);
      if (!task) {
        return prev;
      }
      const without = prev.filter((item) => item.id !== taskId);
      const column = without.filter((item) => item.status === status);
      const clamped = Math.max(0, Math.min(index, column.length));
      const reordered = [
        ...column.slice(0, clamped),
        { ...task, status },
        ...column.slice(clamped),
      ];
      const others = without.filter((item) => item.status !== status);
      return [...others, ...reordered];
    });
  };

  return (
    <div className="h-full flex flex-col">
      {selectedTask ? (
        <div className="flex-1 overflow-hidden">
          <div className="h-full px-1">
            <TaskDetail
              task={selectedTask}
              onBack={() => setSelectedTaskId(null)}
            />
          </div>
        </div>
      ) : (
        <>
          <TopBar
            selectedView={view}
            setSelectedView={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fields={fields}
            setField={setField}
            onAddTask={() => setIsAddTaskOpen(true)}
          />

          <div className="flex-1 overflow-hidden pt-4">
            {view === "board" ? (
              <KanbanBoard
                tasks={filteredTasks}
                fields={fields}
                onSelect={setSelectedTaskId}
                onReorder={handleReorderTask}
              />
            ) : (
              <TaskList
                tasks={filteredTasks}
                fields={fields}
                onSelect={setSelectedTaskId}
              />
            )}
          </div>
        </>
      )}

      {isAddTaskOpen && (
        <AddTaskModal
          onClose={() => setIsAddTaskOpen(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
}
