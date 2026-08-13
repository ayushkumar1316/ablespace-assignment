"use client";

import { useMemo, useState } from "react";
import { DEFAULT_VISIBLE_FIELDS, TASKS } from "../data/tasks";
import type { FieldKey, VisibleFields } from "../data/tasks";
import { TopBar } from "./top-bar";
import { KanbanBoard } from "./kanban-board";
import { TaskList } from "./task-list";

export function TaskWorkspace() {
  const [view, setView] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields] = useState<VisibleFields>(DEFAULT_VISIBLE_FIELDS);

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

  return (
    <div className="h-full flex flex-col">
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
          <KanbanBoard tasks={filteredTasks} fields={fields} />
        ) : (
          <TaskList tasks={filteredTasks} fields={fields} />
        )}
      </div>
    </div>
  );
}
