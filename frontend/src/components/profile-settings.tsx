"use client";

import { useState } from "react";
import { Avatar } from "./avatar";

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function ProfileSettings() {
  const [name, setName] = useState("Mandira Datta");
  const [email, setEmail] = useState("mandira@ablespace.app");

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
      <p className="mt-0.5 text-sm text-gray-500">
        Manage your profile and workspace.
      </p>

      <div className="mt-6 max-w-2xl space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Update your personal information.
          </p>

          <div className="mt-4 flex items-start gap-4">
            <Avatar
              name={name}
              initials={initialsFromName(name)}
              className="w-14 h-14 text-lg"
            />
            <div className="flex-1 space-y-3">
              <div>
                <label
                  htmlFor="profile-name"
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Name
                </label>
                <input
                  id="profile-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="profile-email"
                  className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  Email
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong transition-colors"
            >
              Save changes
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">Workspace</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage your workspace membership.
          </p>
          <button
            type="button"
            className="mt-4 rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Leave Workspace
          </button>
        </section>
      </div>
    </div>
  );
}
