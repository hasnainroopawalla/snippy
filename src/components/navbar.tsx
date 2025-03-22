import * as React from "react";
import { TextAnchor } from "./factory";
import { useNavigate } from "@tanstack/react-router";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const onClickNew = React.useCallback(() => navigate({ to: "/" }), [navigate]);

  return (
    <div className="flex flex-row flex-wrap gap-6 text-lg">
      <span className="font-mono text-primary-text">✂️ Snippy</span>
      <TextAnchor label="New" onClick={onClickNew} />
      <TextAnchor label="Delete" onClick={() => {}} />
    </div>
  );
};
