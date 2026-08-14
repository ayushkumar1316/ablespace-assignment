"use client";

import { useState } from "react";

export function Login() {
  const [showGoogle, setShowGoogle] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-surface shadow-lg p-6 sm:p-8 flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-surface-subtle flex items-center justify-center mb-6">
          <div className="w-7 h-7 bg-surface-strong rounded-text text-foreground-subtle flex items-center justify-center text-xs font-bold">
            LM
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground">Task Manager</h2>

        <p className="text-foreground-subtle text-center">Manage your tasks efficiently</p>

        <div className="w-full space-y-3">
          <button
            onClick={() => setShowGoogle(true)}
            className="w-full rounded-md px-4 py-2 bg-surface-subtle hover:bg-surface-subtle text-sm font-medium transition-colors"
          >
            <span>Continue as Guest</span>
          </button>
          <button
            onClick={() => setShowGoogle(true)}
            className="w-full rounded-md px-4 py-2 bg-surface hover:bg-surface-subtle text-sm font-medium transition-colors border border-border-strong"
          >
            Continue with Google
          </button>
        </div>

        {showGoogle && (
          <div className="w-full flex items-center justify-between text-sm text-foreground-subtle">
            <span>Or continue with</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}