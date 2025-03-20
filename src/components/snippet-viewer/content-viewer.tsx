import * as React from "react";
import type { ISnippet } from "../../types";

type ContentViewerProps = {
  content: ISnippet["content"];
};

export const ContentViewer: React.FC<ContentViewerProps> = ({ content }) => (
  <textarea
    readOnly
    //   ref={contentViewerRef}
    value={content}
    className="w-full min-h-[150px] p-2 tracking-wide rounded field-sizing-content bg-secondary-bg text-primary-text focus:outline-accent focus:outline-1"
  />
);
