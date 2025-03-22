import * as React from "react";
import type { ISnippet } from "../../types";
import { FileTextIcon } from "@radix-ui/react-icons";
import {
  BadgeButtonWithAutoTextUpdate,
  Textarea,
  TextWithIcon,
} from "../factory";
import { copyToClipboard } from "../../utils";

type ContentViewerProps = {
  content: ISnippet["content"];
  slug: ISnippet["slug"];
  contentViewerRef: React.RefObject<HTMLTextAreaElement>;
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
          classNameOverrides="text-secondary-text"
        />
      }
      HeaderButtonSlot={
        <BadgeButtonWithAutoTextUpdate
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
