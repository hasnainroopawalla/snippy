import * as React from "react";
import { SnippetValidity } from "../../types";
import { ButtonsPanel } from "./buttons-panel";
import { ContentEditor } from "./content-editor";
import { ComposerToolbar } from "./composer-toolbar";

export const SnippetComposer: React.FC = () => {
  const validityRef = React.useRef<SnippetValidity>("10m");
  const contentEditorRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-6">
      <ComposerToolbar validityRef={validityRef} />
      <ContentEditor contentEditorRef={contentEditorRef} />
      <ButtonsPanel
        contentEditorRef={contentEditorRef}
        validityRef={validityRef}
      />
    </div>
  );
};
