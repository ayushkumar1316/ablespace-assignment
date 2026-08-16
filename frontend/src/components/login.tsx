"use client";

import { useState } from "react";

const GUEST_STORAGE_KEY = "ablespace:guest-token";

export function Login({ onLogin }: { onLogin: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuest = async () => {
    setLoading(true);
    setError(null);
    try {
      await onLogin();
    } catch {
      setError("Failed to start guest session. Is the backend running?");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-surface shadow-lg p-6 sm:p-8 flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-surface-subtle flex items-center justify-center mb-6">
          <div className="w-7 h-7 bg-surface-strong rounded-lg text-foreground-subtle flex items-center justify-center text-xs font-bold">
            AS
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground">AbleSpace</h2>

        <p className="text-foreground-subtle text-center">
          Manage your tasks efficiently
        </p>

        <div className="w-full space-y-3">
          <button
            onClick={handleGuest}
            disabled={loading}
            className="w-full rounded-md px-4 py-2.5 bg-surface-inverse text-on-inverse text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Continue as Guest"}
          </button>
        </div>

        {error && (
          <p className="w-full text-sm text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
