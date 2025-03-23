import * as React from "react";
import type { SnippetValidity, SnippetPrivacy } from "../../types";
import { ButtonsPanel } from "./buttons-panel";
import { ContentEditor } from "./content-editor";
import { ComposerToolbar } from "./composer-toolbar";

export const SnippetComposer: React.FC = () => {
  const validityRef = React.useRef<SnippetValidity>("10m");
  const privacyRef = React.useRef<SnippetPrivacy>("public");
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const contentEditorRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-8">
      <ComposerToolbar
        validityRef={validityRef}
        privacyRef={privacyRef}
        passwordRef={passwordRef}
      />
      <ContentEditor contentEditorRef={contentEditorRef} />
      <ButtonsPanel
        contentEditorRef={contentEditorRef}
        validityRef={validityRef}
        privacyRef={privacyRef}
        passwordRef={passwordRef}
      />
    </div>
  );
};
