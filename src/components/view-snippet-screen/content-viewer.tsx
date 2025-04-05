import * as React from "react";
import type { ISnippet } from "../../types";
import { FileTextIcon } from "@radix-ui/react-icons";
import { DynamicCompactButton, Textarea, TextWithIcon } from "../factory";
import { copyToClipboard } from "../../utils";

type ContentViewerProps = {
  content: ISnippet["content"];
  slug: ISnippet["slug"];
  contentViewerRef: React.RefObject<HTMLTextAreaElement | null>;
};

export const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  slug,
  contentViewerRef,
}) => {
  const onClickCopyUrl = React.useCallback(() => {
    copyToClipboard(window.location.href).catch(e => console.error(e));
  }, []);

  return (
    <Textarea
      id="content-viewer-textarea"
      textareaRef={contentViewerRef}
      readOnly
      value={content}
      HeaderTitleSlot={
        <TextWithIcon
          TextSlot={<span className="font-mono text-md">{slug}</span>}
          IconSlot={<FileTextIcon />}
          classNameOverrides="text-primary-text"
        />
      }
      HeaderButtonSlot={
        <DynamicCompactButton
          variant="secondary"
          size="small"
          text="Copy URL"
          onClick={onClickCopyUrl}
          postClickText="Copied!"
        />
      }
    />
  );
};
