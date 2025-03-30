import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type ITheme = "light" | "dark";

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = React.useState<ITheme>("dark");

  const onToggle = React.useCallback(() => {
    // Add the "light" class to the DOM element if theme switch to light mode is requested
    document.body.classList.toggle("light", theme === "dark");
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  const Icon = theme === "light" ? MoonIcon : SunIcon;

  return (
    <div
      className="p-2 rounded-lg cursor-pointer hover:bg-secondary-bg"
      onClick={onToggle}
    >
      <Icon className="w-4 h-4 text-primary-text" />
    </div>
  );
};
