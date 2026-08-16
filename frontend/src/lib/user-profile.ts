import { fetchProfile } from "./api";
import type { UserProfile } from "./api";

export const USER_PROFILE_STORAGE_KEY = "ablespace:user-profile";

export function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function getCurrentUser(): { name: string; initials: string } {
  const profile = getCachedProfile();
  const name = profile?.name?.trim() || "Guest User";
  return { name, initials: initialsFromName(name) };
}

export function subscribeToProfileChange(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

let cachedProfileRaw: string | null = null;
let cachedProfile: UserProfile | null = null;

export function getCachedProfile(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = window.localStorage.getItem(USER_PROFILE_STORAGE_KEY);
  if (raw === cachedProfileRaw) {
    return cachedProfile;
  }
  cachedProfileRaw = raw;
  cachedProfile = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as UserProfile;
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        typeof parsed.name === "string"
      ) {
        cachedProfile = parsed;
      }
    } catch {
      // ignore malformed cache
    }
  }
  return cachedProfile;
}

export function cacheProfile(profile: UserProfile): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      USER_PROFILE_STORAGE_KEY,
      JSON.stringify(profile)
    );
    window.dispatchEvent(new Event("storage"));
  } catch {
    // best-effort persistence
  }
}

let loadProfilePromise: Promise<UserProfile> | null = null;

export function loadProfile(): Promise<UserProfile> {
  if (!loadProfilePromise) {
    loadProfilePromise = fetchProfile()
      .then((profile) => {
        cacheProfile(profile);
        return profile;
      })
      .catch((error) => {
        loadProfilePromise = null;
        throw error;
      });
  }
  return loadProfilePromise;
}
