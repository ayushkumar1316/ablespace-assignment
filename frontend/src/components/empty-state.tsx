"use client";

import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-16 text-center ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-subtle text-foreground-faint">
        {icon}
      </div>
      <p className="mt-4 text-sm font-medium text-foreground-secondary">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-foreground-subtle">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
