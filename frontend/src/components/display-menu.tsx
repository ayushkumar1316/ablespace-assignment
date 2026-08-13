"use client";

import { useState } from "react";

function ColumnsIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
      <path d="M9 4v16M15 4v16" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DisplayMenu<K extends string>({
  fields,
  options,
  onChange,
}: {
  fields: Record<K, boolean>;
  options: { key: K; label: string }[];
  onChange: (key: K, value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((open) => !open)}
        className={`relative z-20 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          open
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ColumnsIcon />
        Display
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
            <p className="px-2 pt-1.5 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Display fields
            </p>
            {options.map((option) => (
              <label
                key={option.key}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={fields[option.key]}
                  onChange={(e) => onChange(option.key, e.target.checked)}
                  className="w-4 h-4 accent-gray-900"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
                {fields[option.key] && (
                  <span className="ml-auto text-gray-400">
                    <CheckIcon />
                  </span>
                )}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
