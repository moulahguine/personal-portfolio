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
      variant="secondary"
      size="sm"
      className={styles.themeSelector}
      aria-label="Switch theme"
      onPress={() => {
        const isLight = getResolvedThemeFromDocument() === "light";
        runThemeTransition(() => setTheme(isLight ? "dark" : "light"));
      }}
      icon={
        <>
          <HiSun
            className={styles.themeSelector__iconLight}
            fontSize={25}
            aria-hidden
          />
          <HiMoon
            className={styles.themeSelector__iconDark}
            fontSize={25}
            aria-hidden
          />
        </>
      }
    />
  );
}
