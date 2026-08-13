"use client";

import { useMemo, useState } from "react";
import { DEFAULT_VISIBLE_FIELDS, TASKS } from "../data/tasks";
import type { FieldKey, VisibleFields } from "../data/tasks";
import { TopBar } from "./top-bar";
import { KanbanBoard } from "./kanban-board";
import { TaskList } from "./task-list";
import { TaskDetail } from "./task-detail";

export function TaskWorkspace() {
  const [view, setView] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields] = useState<VisibleFields>(DEFAULT_VISIBLE_FIELDS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const setField = (key: FieldKey, value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return TASKS;
    }
    return TASKS.filter((task) =>
      [task.title, task.description, ...task.tags].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [searchQuery]);

  const selectedTask = TASKS.find((task) => task.id === selectedTaskId) ?? null;

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
          />

          <div className="flex-1 overflow-hidden pt-4">
            {view === "board" ? (
              <KanbanBoard
                tasks={filteredTasks}
                fields={fields}
                onSelect={setSelectedTaskId}
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
    </div>
  );
}
