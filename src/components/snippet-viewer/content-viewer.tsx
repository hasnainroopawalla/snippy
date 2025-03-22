import * as React from "react";
import type { ISnippet } from "../../types";
import { FileTextIcon } from "@radix-ui/react-icons";
import { BadgeButton, Textarea, TextWithIcon } from "../factory";

type ContentViewerProps = {
  content: ISnippet["content"];
  slug: ISnippet["slug"];
};

export const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  slug,
}) => (
  <Textarea
    id="content-viewer-textarea"
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
      <BadgeButton
        variant="secondary"
        size="small"
        text="Copy URL"
        onClick={() => console.log("Copy URL")}
      />
    }
  />
);
