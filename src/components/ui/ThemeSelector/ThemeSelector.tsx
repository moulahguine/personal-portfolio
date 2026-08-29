import { HiMoon, HiSun } from "react-icons/hi2";
import { useTheme } from "next-themes";
import { Button } from "@/components";
import { getResolvedThemeFromDocument } from "@/lib";

import styles from "./ThemeSelector.module.scss";

function runThemeTransition(update: () => void) {
  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(update);
    return;
  }

  update();
}

export default function ThemeSelector() {
  const { setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      className={styles.themeSelector}
      aria-label="Toggle color theme"
      onPress={() => {
        const isLight = getResolvedThemeFromDocument() === "light";
        runThemeTransition(() => setTheme(isLight ? "dark" : "light"));
      }}
      icon={
        <>
          <HiSun className={styles.themeSelector__iconLight} aria-hidden />
          <HiMoon className={styles.themeSelector__iconDark} aria-hidden />
        </>
      }
    />
  );
}
