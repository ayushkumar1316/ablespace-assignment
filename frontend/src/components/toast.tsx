"use client";

import { useEffect, useState } from "react";

export interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
  action?: { label: string; onClick: () => void };
  closing?: boolean;
}

let toastListeners: Array<(toasts: Toast[]) => void> = [];
let toastState: Toast[] = [];

function notify() {
  for (const listener of toastListeners) {
    listener([...toastState]);
  }
}

export function showToast(
  type: "success" | "error",
  message: string,
  action?: { label: string; onClick: () => void }
) {
  const id = Math.random().toString(36).slice(2);
  toastState = [...toastState, { id, type, message, action }];
  notify();
  setTimeout(() => {
    const idx = toastState.findIndex((t) => t.id === id);
    if (idx !== -1) {
      toastState = toastState.map((t) =>
        t.id === id ? { ...t, closing: true } : t
      );
      notify();
      setTimeout(() => {
        toastState = toastState.filter((t) => t.id !== id);
        notify();
      }, 200);
    }
  }, 4000);
}

function dismissToast(id: string) {
  const idx = toastState.findIndex((t) => t.id === id);
  if (idx !== -1) {
    toastState = toastState.map((t) =>
      t.id === id ? { ...t, closing: true } : t
    );
    notify();
    setTimeout(() => {
      toastState = toastState.filter((t) => t.id !== id);
      notify();
    }, 200);
  }
}

function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setToasts);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg transition-all duration-200 ${
            toast.closing ? "opacity-0 translate-y-2 scale-95" : "animate-slide-up"
          } ${
            toast.type === "success"
              ? "bg-surface border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400"
              : "bg-surface border-red-300 text-red-700 dark:border-red-700 dark:text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 9v4M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span className="flex-1">{toast.message}</span>
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action!.onClick();
                dismissToast(toast.id);
              }}
              className="ml-2 text-xs font-semibold underline underline-offset-2 hover:opacity-80"
            >
              {toast.action.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="ml-1 shrink-0 rounded p-0.5 hover:bg-surface-muted transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export { ToastContainer };
