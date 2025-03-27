import * as React from "react";
import { BadgeButtonWithTextUpdateOnClick, TextAnchor } from "../factory";
import { copyToClipboard } from "../../utils";

type ViewerToolbarProps = {
  contentViewerRef: React.RefObject<HTMLTextAreaElement>;
};

export const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  contentViewerRef,
}) => {
  const onClickCopyText = React.useCallback(() => {
    const contentViewerValue = contentViewerRef.current?.value;

    if (!contentViewerValue) {
      return;
    }

    copyToClipboard(contentViewerValue).catch(e => console.error(e));
  }, [contentViewerRef]);

  return (
    <div className="flex flex-row flex-wrap items-center gap-5">
      <BadgeButtonWithTextUpdateOnClick
        variant="primary"
        size="large"
        text="Copy Text"
        onClick={onClickCopyText}
        postClickText="Copied!"
      />
      <TextAnchor label="Raw" onClick={() => {}} />
      <TextAnchor label="QR" onClick={() => {}} />
    </div>
  );
};
