"use client";

import { useEffect, useState } from "react";

export interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

let toastListeners: Array<(toasts: Toast[]) => void> = [];
let toastState: Toast[] = [];

function notify() {
  for (const listener of toastListeners) {
    listener([...toastState]);
  }
}

export function showToast(type: "success" | "error", message: string) {
  const id = Math.random().toString(36).slice(2);
  toastState = [...toastState, { id, type, message }];
  notify();
  setTimeout(() => {
    toastState = toastState.filter((t) => t.id !== id);
    notify();
  }, 3000);
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
          className={`pointer-events-auto animate-slide-up flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
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
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export { ToastContainer };
