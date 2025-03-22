import * as React from "react";
import type { ISnippet } from "../../types";
import { FileTextIcon } from "@radix-ui/react-icons";
import { TextWithIcon } from "../factory";

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
    className="flex items-center justify-between px-3 py-2 bg-secondary-offset rounded-t-md"
  >
    <TextWithIcon
      TextSlot={<span className="font-mono text-md">big-blue-lion</span>}
      IconSlot={<FileTextIcon />}
      classNameOverrides="text-secondary-text"
    />
    <span className="inline-flex items-center px-3 py-1 text-xs rounded-md cursor-pointer bg-secondary-bg hover:bg-primary-bg text-primary-text">
      Copy URL
    </span>
  </div>
);
