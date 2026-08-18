"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { STATUSES } from "../data/tasks";
import type { Task, TaskStatus, VisibleFields } from "../data/tasks";
import type { DragHandleHandlers } from "./drag-handle";
import { TaskCard } from "./task-card";

type DropTarget = { status: TaskStatus; index: number };

const DRAG_THRESHOLD = 6;
const GHOST_OFFSET_X = 144;

function DropIndicator() {
  return (
    <div
      aria-hidden="true"
      className="h-1 rounded-full bg-accent my-0.5 pointer-events-none select-none"
    />
  );
}

export function KanbanBoard({
  tasks,
  fields,
  onSelect,
  onReorder,
}: {
  tasks: Task[];
  fields: VisibleFields;
  onSelect: (taskId: string) => void;
  onReorder: (taskId: string, status: TaskStatus, index: number) => void;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(null);
  const [ghostHeight, setGhostHeight] = useState(60);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);

  const startRef = useRef<{ x: number; y: number } | null>(null);
  const draggingIdRef = useRef<string | null>(null);
  const sourceCardRef = useRef<HTMLElement | null>(null);
  const suppressClickRef = useRef(false);

  const dragging = draggingId !== null;
  const draggedTask = draggingId
    ? tasks.find((task) => task.id === draggingId) ?? null
    : null;

  const clearDrag = useCallback(() => {
    draggingIdRef.current = null;
    startRef.current = null;
    sourceCardRef.current = null;
    setDraggingId(null);
    setGhostPos(null);
    setDropTarget(null);
  }, []);

  const suppressNextClick = useCallback(() => {
    suppressClickRef.current = true;
  }, []);

  const updateDropTarget = (event: ReactPointerEvent<HTMLElement>) => {
    const el = document.elementFromPoint(event.clientX, event.clientY);
    const column = el instanceof Element ? el.closest("[data-status]") : null;
    if (!column) {
      setDropTarget(null);
      return;
    }
    const status = column.getAttribute("data-status") as TaskStatus;
    const draggedId = draggingIdRef.current;
    const cards = Array.from(column.querySelectorAll("[data-task-id]")).filter(
      (card) => card.getAttribute("data-task-id") !== draggedId
    );
    let index = 0;
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      if (event.clientY < rect.top + rect.height / 2) {
        break;
      }
      index += 1;
    }
    setDropTarget({ status, index });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    const target = event.currentTarget;
    try {
      target.setPointerCapture(event.pointerId);
    } catch {
      // pointer already released
    }
    startRef.current = { x: event.clientX, y: event.clientY };
    sourceCardRef.current = target.closest("[data-task-id]") as HTMLElement | null;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!startRef.current) {
      return;
    }
    const dx = event.clientX - startRef.current.x;
    const dy = event.clientY - startRef.current.y;
    if (!draggingIdRef.current) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) {
        return;
      }
      const cardId = sourceCardRef.current?.getAttribute("data-task-id");
      if (!cardId) {
        return;
      }
      draggingIdRef.current = cardId;
      setDraggingId(cardId);
      setGhostHeight(sourceCardRef.current?.offsetHeight ?? 60);
    }
    setGhostPos({ x: event.clientX, y: event.clientY });
    updateDropTarget(event);
  };

  const finishDrag = () => {
    const cardId = draggingIdRef.current;
    if (!cardId) {
      return;
    }
    suppressNextClick();
    const target = dropTarget;
    if (target) {
      onReorder(cardId, target.status, target.index);
    }
    clearDrag();
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // capture already released
    }
    if (!draggingIdRef.current) {
      startRef.current = null;
      sourceCardRef.current = null;
      return;
    }
    finishDrag();
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLElement>) => {
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // capture already released
    }
    if (!draggingIdRef.current) {
      startRef.current = null;
      sourceCardRef.current = null;
      return;
    }
    suppressNextClick();
    clearDrag();
  };

  useEffect(() => {
    const clearSuppression = () => {
      suppressClickRef.current = false;
    };
    document.addEventListener("pointerdown", clearSuppression, true);
    return () => document.removeEventListener("pointerdown", clearSuppression, true);
  }, []);

  useEffect(() => {
    if (!dragging) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        suppressNextClick();
        clearDrag();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dragging, clearDrag, suppressNextClick]);

  const handleHandlers: DragHandleHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
  };

  const handleCardSelect = (taskId: string) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onSelect(taskId);
  };

  return (
    <div
      className={`flex gap-4 h-full overflow-x-auto pb-2 ${
        dragging ? "select-none" : ""
      }`}
    >
      {STATUSES.map(({ key, label }) => {
        const columnTasks = tasks.filter((task) => task.status === key);
        const draggedInColumn = columnTasks.some((task) => task.id === draggingId);
        const nonDraggedCount = columnTasks.length - (draggedInColumn ? 1 : 0);
        const isDropColumn = dropTarget?.status === key;
        let ndx = 0;
        return (
          <div
            key={key}
            data-status={key}
            className={`w-72 shrink-0 h-full flex flex-col rounded-xl bg-surface-subtle transition-shadow ${
              isDropColumn ? "ring-2 ring-accent/40" : ""
            }`}
          >
            <div className="flex items-center justify-between px-3 py-2.5">
              <h3 className="text-sm font-semibold text-foreground-secondary">{label}</h3>
              <span className="text-xs font-medium text-foreground-faint bg-surface px-2 py-0.5 rounded-full border border-border-subtle">{columnTasks.length}</span>
            </div>
            <div className="flex-1 px-2 pb-2 space-y-2 overflow-y-auto">
              {isDropColumn && dropTarget.index === 0 && <DropIndicator />}
              {columnTasks.map((task) => {
                const isDragged = task.id === draggingId;
                const showIndicator =
                  isDropColumn && dropTarget.index === ndx && !isDragged;
                ndx += isDragged ? 0 : 1;
                return (
                  <Fragment key={task.id}>
                    {showIndicator && (
                      <DropIndicator key={`indicator-${task.id}`} />
                    )}
                    <TaskCard
                      key={task.id}
                      task={task}
                      fields={fields}
                      onSelect={() => handleCardSelect(task.id)}
                      dragging={isDragged}
                      grabbed={isDragged}
                      handleHandlers={handleHandlers}
                    />
                  </Fragment>
                );
              })}
              {isDropColumn && dropTarget.index === nonDraggedCount && (
                <DropIndicator />
              )}
            </div>
          </div>
        );
      })}

      {draggedTask && ghostPos && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed left-0 top-0 z-50 pointer-events-none w-72"
              style={{
                transform: `translate(${ghostPos.x - GHOST_OFFSET_X}px, ${
                  ghostPos.y - ghostHeight / 2
                }px)`,
              }}
            >
              <TaskCard task={draggedTask} fields={fields} isGhost grabbed onSelect={() => {}} />
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
