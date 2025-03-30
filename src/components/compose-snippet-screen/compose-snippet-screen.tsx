import * as React from "react";
import { SnippetValidity, SnippetPrivacy } from "../../types";
import { ButtonsPanel } from "./buttons-panel";
import { ContentEditor } from "./content-editor";
import { ComposerToolbar } from "./composer-toolbar";

export const ComposeSnippetScreen: React.FC = () => {
  const validityRef = React.useRef<SnippetValidity>(SnippetValidity["10m"]);
  const privacyRef = React.useRef<SnippetPrivacy>(SnippetPrivacy.Public);
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
