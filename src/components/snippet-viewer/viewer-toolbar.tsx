import * as React from "react";
import { useNavigate } from "@tanstack/react-router";

export const ViewerToolbar: React.FC = () => {
  const navigate = useNavigate();

  const onClickNew = React.useCallback(() => navigate({ to: "/" }), [navigate]);

  return (
    <div className="flex flex-row flex-wrap gap-4">
      <span className="inline-flex items-center px-3 py-1 text-sm rounded-md cursor-pointer bg-accent hover:bg-accent-hover text-primary-text">
        Copy Content
      </span>
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
