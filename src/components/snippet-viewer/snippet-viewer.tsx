import * as React from "react";
import type { ISnippet } from "../../types";
import { ViewerToolbar } from "./viewer-toolbar";
import { ContentViewer } from "./content-viewer";

type SnippetViewerProps = { snippet: ISnippet };

export const SnippetViewer: React.FC<SnippetViewerProps> = ({ snippet }) => {
  const contentViewerRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-8">
      <ViewerToolbar contentViewerRef={contentViewerRef} />
      <div className="flex flex-col gap-3">
        <ContentViewer
          contentViewerRef={contentViewerRef}
          slug={snippet.slug}
          content={snippet.content}
        />
        <SnippetMetadata />
      </div>
    </div>
  );
};

// TODO
const SnippetMetadata: React.FC = () => (
  <span className="text-sm text-secondary-text">
    Expires on Thu, 20 Mar 2025 19:36:11 GMT
  </span>
);
