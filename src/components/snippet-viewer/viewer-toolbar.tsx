import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { BadgeButton } from "../factory";

export const ViewerToolbar: React.FC = () => {
  const navigate = useNavigate();

  const onClickNew = React.useCallback(() => navigate({ to: "/" }), [navigate]);

  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <BadgeButton
        variant="primary"
        size="large"
        text="Copy Text"
        onClick={() => console.log("Copy Text")}
      />
      <ToolbarItem label="New" onClick={onClickNew} />
      <ToolbarItem label="Delete" onClick={() => {}} />
    </div>
  );
};

type ToolbarItemProps = {
  label: string;
  onClick: () => void;
};

const ToolbarItem: React.FC<ToolbarItemProps> = ({ label, onClick }) => (
  <span
    className="text-lg cursor-pointer text-accent hover:underline"
    onClick={onClick}
  >
    {label}
  </span>
);
