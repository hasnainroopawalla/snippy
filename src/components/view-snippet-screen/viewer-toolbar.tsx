import * as React from "react";
import { DynamicCompactButton, TextAnchor } from "../factory";
import { copyToClipboard, openRawContent } from "../../utils";
import { SnippetPrivacyBadge } from "../snippet-info-badges";
import { SnippetPrivacy } from "../../types";

type ViewerToolbarProps = {
  privacy: SnippetPrivacy;
  content: string;
  contentViewerRef: React.RefObject<HTMLTextAreaElement>;
};

export const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  privacy,
  content,
  contentViewerRef,
}) => {
  const onClickCopyText = React.useCallback(() => {
    const contentViewerValue = contentViewerRef.current?.value;

    if (!contentViewerValue) {
      return;
    }

    copyToClipboard(contentViewerValue).catch(e => console.error(e));
  }, [contentViewerRef]);

  const onRawClick = React.useCallback(
    () => openRawContent(content),
    [content],
  );

  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-5">
      <div className="flex flex-row flex-wrap items-center gap-5">
        <DynamicCompactButton
          variant="primary"
          size="large"
          text="Copy Text"
          onClick={onClickCopyText}
          postClickText="Copied!"
        />
        <TextAnchor label="Raw" onClick={onRawClick} />
        {/* <TextAnchor label="QR" onClick={() => {}} /> */}
      </div>
      <SnippetPrivacyBadge privacy={privacy} />
    </div>
  );
};
