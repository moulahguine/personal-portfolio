export type Theme = "light" | "dark";

export function getResolvedThemeFromDocument(): Theme {
  if (typeof document === "undefined") return "light";

  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "light" ? "light" : "dark";
}

export function resolveTheme(resolvedTheme: string | undefined): Theme {
  if (resolvedTheme === "dark") return "dark";
  if (resolvedTheme === "light") return "light";

  return getResolvedThemeFromDocument();
}
