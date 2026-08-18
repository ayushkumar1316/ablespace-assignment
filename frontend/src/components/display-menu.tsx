"use client";

import { useEffect, useRef, useState } from "react";

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
  const [closing, setClosing] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (open) {
      handleClose();
    } else {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const width = 224;
        const left = Math.min(
          Math.max(rect.left, 8),
          window.innerWidth - width - 8
        );
        setCoords({ top: rect.bottom + 8, left });
      }
      setOpen(true);
      setClosing(false);
    }
  };

  const handleClose = () => {
    setClosing(true);
  };

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 120);
    return () => clearTimeout(timer);
  }, [closing]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        className={`relative z-20 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          open
            ? "bg-surface-subtle text-foreground"
            : "text-foreground-muted hover:bg-surface-subtle"
        }`}
      >
        <ColumnsIcon />
        Display
      </button>

      {open && coords && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            className={`fixed z-30 w-56 rounded-lg border border-border bg-surface p-1.5 shadow-lg ${
              closing ? "animate-scale-out" : "animate-scale-in"
            }`}
            style={{ top: coords.top, left: coords.left }}
          >
            <p className="px-2 pt-1.5 pb-1 text-xs font-medium text-foreground-subtle uppercase tracking-wide">
              Display fields
            </p>
            {options.map((option) => (
              <label
                key={option.key}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-surface-muted"
              >
                <input
                  type="checkbox"
                  checked={fields[option.key]}
                  onChange={(e) => onChange(option.key, e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-foreground-secondary">{option.label}</span>
                {fields[option.key] && (
                  <span className="ml-auto text-accent">
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
