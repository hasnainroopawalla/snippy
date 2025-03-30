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
    <div className="p-1 rounded cursor-pointer hover:bg-secondary-bg">
      <Icon className="w-4.5 h-4.5 text-primary-text" onClick={onToggle} />
    </div>
  );
};
