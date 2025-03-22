import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { BadgeButtonWithAutoTextUpdate } from "../factory";
import { copyToClipboard } from "../../utils";

type ViewerToolbarProps = {
  contentViewerRef: React.RefObject<HTMLTextAreaElement>;
};

export const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  contentViewerRef,
}) => {
  const navigate = useNavigate();

  const onClickNew = React.useCallback(() => navigate({ to: "/" }), [navigate]);

  const onClickCopyText = React.useCallback(() => {
    const contentViewerValue = contentViewerRef.current?.value;

    if (!contentViewerValue) {
      return;
    }

    copyToClipboard(contentViewerValue).catch(e => console.error(e));
  }, [contentViewerRef]);

  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <BadgeButtonWithAutoTextUpdate
        variant="primary"
        size="large"
        text="Copy Text"
        onClick={onClickCopyText}
        postClickText="Copied!"
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
