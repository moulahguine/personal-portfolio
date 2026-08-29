"use client";

import { useTheme } from "next-themes";
import { resolveTheme, type Theme } from "@/lib";

export function useResolvedTheme(): Theme {
  const { resolvedTheme } = useTheme();
  return resolveTheme(resolvedTheme);
}
