"use client";

import type { PointerEvent } from "react";

export type DragHandleHandlers = {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
};

export function DragHandle({
  className = "",
  grabbed = false,
  handlers,
}: {
  className?: string;
  grabbed?: boolean;
  handlers?: DragHandleHandlers;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 select-none touch-none rounded transition-colors ${
        grabbed
          ? "bg-accent-soft cursor-grabbing"
          : handlers
            ? "hover:bg-surface-subtle cursor-grab"
            : "cursor-grab"
      } ${className}`}
      {...(handlers
        ? {
            onPointerDown: handlers.onPointerDown,
            onPointerMove: handlers.onPointerMove,
            onPointerUp: handlers.onPointerUp,
            onPointerCancel: handlers.onPointerCancel,
          }
        : {})}
    >
      <svg
        className={`w-4 h-4 ${
          grabbed
            ? "text-accent"
            : "text-foreground-fainter group-hover:text-foreground-faint"
        }`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="9" cy="6" r="1.6" />
        <circle cx="15" cy="6" r="1.6" />
        <circle cx="9" cy="12" r="1.6" />
        <circle cx="15" cy="12" r="1.6" />
        <circle cx="9" cy="18" r="1.6" />
        <circle cx="15" cy="18" r="1.6" />
      </svg>
    </span>
  );
}
