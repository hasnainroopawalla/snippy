import * as React from "react";
import type { ISnippet } from "../../types";
import { FileTextIcon } from "@radix-ui/react-icons";
import { BadgeButton, TextWithIcon } from "../factory";

type ContentViewerProps = {
  content: ISnippet["content"];
};

export const ContentViewer: React.FC<ContentViewerProps> = ({ content }) => (
  <div id="content-viewer-container" className="w-full rounded-md">
    <ContentViewerHeader />
    <textarea
      id="content-viewer-textarea"
      readOnly
      value={content}
      className="w-full min-h-[150px] p-3 tracking-wide rounded-b-md field-sizing-content bg-secondary-bg text-primary-text focus:outline-none"
    />
  </div>
);

const ContentViewerHeader: React.FC = () => (
  <div
    id="content-viewer-header"
    className="flex flex-row flex-wrap items-center justify-between gap-2 px-3 py-2 bg-secondary-bg-offset rounded-t-md"
  >
    <TextWithIcon
      TextSlot={<span className="font-mono text-md">big-blue-lion</span>}
      IconSlot={<FileTextIcon />}
      classNameOverrides="text-secondary-text"
    />
    <BadgeButton
      variant="secondary"
      size="small"
      text="Copy URL"
      onClick={() => console.log("Copy URL")}
    />
  </div>
);
