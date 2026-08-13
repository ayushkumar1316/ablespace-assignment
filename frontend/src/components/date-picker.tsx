"use client";

import { useState } from "react";
import { formatFullDate } from "../data/tasks";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISODate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) {
    return null;
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className={`w-4 h-4 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Calendar({
  startDate,
  endDate,
  onDayClick,
}: {
  startDate: string;
  endDate: string;
  onDayClick: (iso: string) => void;
}) {
  const [view, setView] = useState(() => {
    const base = parseISODate(startDate) ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const monthLabel = view.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const offset = first.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

  const cells: (string | null)[] = [];
  for (let i = 0; i < offset; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toISODate(new Date(view.getFullYear(), view.getMonth(), day)));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const todayISO = toISODate(new Date());

  const changeMonth = (delta: number) => {
    setView((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="rounded p-1 text-gray-500 hover:bg-gray-100"
          aria-label="Previous month"
        >
          <ChevronIcon direction="left" />
        </button>
        <span className="text-sm font-semibold text-gray-900">{monthLabel}</span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="rounded p-1 text-gray-500 hover:bg-gray-100"
          aria-label="Next month"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[11px] font-medium text-gray-400 mb-1">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="py-1">
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {cells.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} />;
          }
          const isStart = cell === startDate;
          const isEnd = cell === endDate;
          const inRange =
            startDate && endDate && cell > startDate && cell < endDate;
          const isToday = cell === todayISO;

          return (
            <button
              key={cell}
              type="button"
              onClick={() => onDayClick(cell)}
              className={`h-8 w-8 rounded-full text-xs flex items-center justify-center transition-colors ${
                isStart || isEnd
                  ? "bg-accent text-white font-semibold"
                  : inRange
                    ? "bg-accent-soft text-accent-strong"
                    : isToday
                      ? "ring-1 ring-inset ring-accent text-gray-900 hover:bg-gray-100"
                      : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {Number(cell.slice(8, 10))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DatePicker({
  startDate,
  endDate,
  onChange,
  single = false,
}: {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  single?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleDayClick = (iso: string) => {
    if (single) {
      onChange(iso, "");
      setOpen(false);
      return;
    }
    if (!startDate || (startDate && endDate)) {
      onChange(iso, "");
      return;
    }
    if (iso < startDate) {
      onChange(iso, "");
      return;
    }
    onChange(startDate, iso);
  };

  return (
    <div className="relative">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative z-20 flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 hover:border-gray-300"
        >
          <CalendarIcon />
          <span className="flex-1 truncate text-left">
            {startDate ? formatFullDate(startDate) : "Start date"}
          </span>
        </button>
        {!single && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative z-20 flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 hover:border-gray-300"
          >
            <CalendarIcon />
            <span className="flex-1 truncate text-left">
              {endDate ? formatFullDate(endDate) : "End date"}
            </span>
          </button>
        )}
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <Calendar
              startDate={startDate}
              endDate={endDate}
              onDayClick={handleDayClick}
            />
          </div>
        </>
      )}
    </div>
  );
}
