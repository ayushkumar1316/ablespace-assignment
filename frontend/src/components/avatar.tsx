"use client";

import { AVATAR_COLORS } from "../data/tasks";

function avatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
}

export function Avatar({
  name,
  initials,
  className = "",
}: {
  name: string;
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={`rounded-full ${avatarColor(name)} text-white font-semibold flex items-center justify-center shrink-0 ${className}`}
      title={name}
    >
      {initials}
    </span>
  );
}
