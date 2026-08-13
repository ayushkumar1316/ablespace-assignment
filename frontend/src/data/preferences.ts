export type Section = "tasks" | "projects" | "settings";

export type ThemeMode = "light" | "dark";

export type ColorMode =
  | "amber"
  | "blue"
  | "pink"
  | "rose"
  | "emerald"
  | "black";

export const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export const COLOR_MODE_OPTIONS: {
  value: ColorMode;
  label: string;
  swatchClass: string;
}[] = [
  { value: "amber", label: "Amber", swatchClass: "bg-amber-500" },
  { value: "blue", label: "Blue", swatchClass: "bg-blue-500" },
  { value: "pink", label: "Pink", swatchClass: "bg-pink-500" },
  { value: "rose", label: "Rose", swatchClass: "bg-rose-500" },
  { value: "emerald", label: "Emerald", swatchClass: "bg-emerald-500" },
  { value: "black", label: "Black", swatchClass: "bg-gray-900" },
];
