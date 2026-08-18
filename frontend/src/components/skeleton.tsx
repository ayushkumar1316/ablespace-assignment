"use client";

export function SkeletonCard() {
  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm p-3 flex gap-2 animate-fade-in">
      <div className="skeleton h-4 w-4 rounded-sm mt-0.5" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3.5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

export function SkeletonKanban() {
  return (
    <div className="flex gap-4 h-full">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-72 shrink-0 h-full flex flex-col rounded-xl bg-surface-subtle p-3 space-y-2"
        >
          <div className="flex items-center justify-between px-1 pb-2">
            <div className="skeleton h-4 w-20 rounded" />
            <div className="skeleton h-4 w-6 rounded-full" />
          </div>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden animate-fade-in">
      <div className="px-3 py-2.5 bg-surface-muted">
        <div className="skeleton h-4 w-24 rounded" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-3 py-3 border-t border-border-subtle"
        >
          <div className="skeleton h-4 w-4 rounded-sm" />
          <div className="skeleton h-3.5 w-48 rounded" />
          <div className="skeleton h-5 w-14 rounded-full" />
          <div className="skeleton h-3.5 w-20 rounded ml-auto" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonProjectList() {
  return (
    <div className="space-y-3 animate-fade-in">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-surface rounded-xl border border-border p-4"
        >
          <div className="skeleton h-10 w-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-1/3 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTaskDetail() {
  return (
    <div className="flex h-full flex-col animate-fade-in">
      <div className="flex-1 overflow-y-auto p-1">
        <div className="mb-4 skeleton h-4 w-24 rounded" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0 space-y-8">
            <div className="skeleton h-8 w-2/3 rounded" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-20 rounded" />
              <div className="skeleton h-20 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-28 rounded" />
              <div className="skeleton h-5 w-full rounded" />
              <div className="skeleton h-5 w-4/5 rounded" />
            </div>
          </div>
          <div className="w-full shrink-0 space-y-3 lg:w-72">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-surface p-3">
                <div className="skeleton h-3 w-16 rounded mb-2" />
                <div className="skeleton h-8 w-full rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
