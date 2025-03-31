import * as React from "react";
import { TextAnchor } from "./factory";
import { useNavigate } from "@tanstack/react-router";
import { ThemeSwitcher } from "./theme-switcher";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const onClickNew = React.useCallback(() => navigate({ to: "/" }), [navigate]);

  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-4">
      <div className="flex flex-row flex-wrap gap-6 text-lg">
        <span className="font-mono cursor-default text-primary-text">
          ✂️ Snippy
        </span>
        <TextAnchor
          testId="navbar-new-anchor"
          label="New"
          onClick={onClickNew}
        />
        <TextAnchor
          testId="navbar-find-anchor"
          label="Find"
          onClick={() => {}}
        />
        <TextAnchor
          testId="navbar-help-anchor"
          label="Help"
          onClick={() => {}}
        />
      </div>
      <ThemeSwitcher />
    </div>
  );
};
