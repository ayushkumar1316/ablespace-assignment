"use client";

import { useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

function ChevronDownIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-foreground-faint"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SelectMenu({
  value,
  options,
  onChange,
  renderOption,
}: {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  renderOption?: (option: SelectOption) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((option) => option.value === value);

  const toggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const estimatedHeight = options.length * 32 + 8;
      setFlip(
        rect.bottom + 6 + estimatedHeight > window.innerHeight &&
          rect.top - 6 - estimatedHeight > 0
      );
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        className="relative z-20 flex w-full items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm text-foreground-secondary hover:border-border-strong"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex-1 truncate">
          {renderOption && selected
            ? renderOption(selected)
            : selected?.label}
        </span>
        <ChevronDownIcon />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="listbox"
            className={`absolute left-0 right-0 z-30 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-lg ${
              flip ? "bottom-full mb-1.5" : "top-full mt-1.5"
            }`}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-foreground-secondary hover:bg-surface-muted"
                >
                  <span className="flex-1 truncate">
                    {renderOption ? renderOption(option) : option.label}
                  </span>
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
