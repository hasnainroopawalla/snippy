import * as React from "react";
import type { ISnippet } from "../../types";
import { ViewerToolbar } from "./viewer-toolbar";
import { ContentViewer } from "./content-viewer";
import { TextWithIcon } from "../factory";
import { CountdownTimerIcon } from "@radix-ui/react-icons";

type SnippetViewerProps = { snippet: ISnippet };

export const SnippetViewer: React.FC<SnippetViewerProps> = ({ snippet }) => {
  const contentViewerRef = React.useRef<HTMLTextAreaElement>(null);

  console.log(snippet);

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
  <TextWithIcon
    TextSlot={<span>Expires on __. Read 4 times</span>}
    IconSlot={<CountdownTimerIcon />}
    classNameOverrides="text-xs text-secondary-text"
  />
);
