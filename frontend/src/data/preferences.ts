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

export const ACCENT_COLORS: Record<ColorMode, string> = {
  amber: "#D97706",
  blue: "#3B82F6",
  pink: "#DB2777",
  rose: "#E11D48",
  emerald: "#059669",
  black: "#171717",
};

export const COLOR_MODE_OPTIONS: {
  value: ColorMode;
  label: string;
  hex: string;
}[] = [
  { value: "amber", label: "Amber", hex: ACCENT_COLORS.amber },
  { value: "blue", label: "Blue", hex: ACCENT_COLORS.blue },
  { value: "pink", label: "Pink", hex: ACCENT_COLORS.pink },
  { value: "rose", label: "Rose", hex: ACCENT_COLORS.rose },
  { value: "emerald", label: "Emerald", hex: ACCENT_COLORS.emerald },
  { value: "black", label: "Black", hex: ACCENT_COLORS.black },
];

export const COLOR_MODE_STORAGE_KEY = "ablespace:color-mode";
