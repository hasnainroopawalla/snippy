import * as React from "react";
import type { ISnippet } from "../../types";
import { ContentViewer } from "./content-viewer";
import { SnippetMetadata } from "./snippet-metadata";
import { ViewerToolbar } from "./viewer-toolbar";

type SnippetSectionProps = {
  snippet: ISnippet;
};

export const SnippetSection: React.FC<SnippetSectionProps> = ({ snippet }) => {
  const contentViewerRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-6">
      <ViewerToolbar
        privacy={snippet.privacy}
        contentViewerRef={contentViewerRef}
      />
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
