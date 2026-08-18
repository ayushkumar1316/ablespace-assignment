"use client";

import { useState } from "react";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [closing, setClosing] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onCancel();
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`fixed inset-0 bg-black/30 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className={`relative z-10 w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-xl ${closing ? "animate-scale-out" : "animate-scale-in"}`}>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">{description}</p>
        )}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground-secondary hover:bg-surface-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              setClosing(false);
            }}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
