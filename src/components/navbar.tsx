import * as React from "react";
import { TextAnchor } from "./factory";
import { useNavigate } from "@tanstack/react-router";
import { SunIcon } from "@radix-ui/react-icons";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const onClickNew = React.useCallback(() => navigate({ to: "/" }), [navigate]);

  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-4">
      <div className="flex flex-row flex-wrap gap-6 text-lg">
        <span className="font-mono cursor-default text-primary-text">
          ✂️ Snippy
        </span>
        <TextAnchor label="New" onClick={onClickNew} />
        <TextAnchor label="Find" onClick={() => {}} />
        <TextAnchor label="Help" onClick={() => {}} />
      </div>
      <SunIcon
        className="cursor-pointer text-primary-text"
        onClick={() => document.body.classList.toggle("light")}
      />
    </div>
  );
};
