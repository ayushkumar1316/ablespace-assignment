"use client";

import { useState } from "react";

export function Login() {
  const [showGoogle, setShowGoogle] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8 flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
          <svg
            className="w-7 h-7 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01m-5.286 5.286l7-7m7 7l-7 7m7-7l-7-7m7 7l-7-7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Task Manager</h2>

        <p className="text-gray-500 text-center">Manage your tasks efficiently</p>

        <div className="w-full space-y-3">
          <button
            onClick={() => setShowGoogle(true)}
            className="w-full rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-100 text-sm font-medium transition-colors"
          >
            <span>Continue as Guest</span>
          </button>
          <button
            onClick={() => setShowGoogle(true)}
            className="w-full rounded-md px-4 py-2 bg-white hover:bg-gray-100 text-sm font-medium transition-colors border border-gray-300"
          >
            Continue with Google
          </button>
        </div>

        {showGoogle && (
          <div className="w-full flex items-center justify-between text-sm text-gray-500">
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
                d="M8 12h.01m-5.286 5.286l7-7m7 7l-7 7m7-7l-7-7m7 7l-7-7"
              />
            />
          </div>
        )}
      </div>
    </div>
  );
}