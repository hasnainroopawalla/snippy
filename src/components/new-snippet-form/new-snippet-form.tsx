import * as React from "react";
import { SnippetValidity } from "../../types";
import { ButtonsPanel } from "./buttons-panel";
import { ContentEditor } from "./content-editor";
import { SettingsPanel } from "./settings-panel";
import { isNewSnippetDataValid, useCreateSnippet } from "./use-create-snippet";

export const NewSnippetForm: React.FC = () => {
  const validityRef = React.useRef<SnippetValidity>("1h");
  const contentEditorRef = React.useRef<HTMLTextAreaElement>(null);

  const { createSnippet, isLoading } = useCreateSnippet();

  const onSubmit = React.useCallback(() => {
    const snippetData = {
      content: contentEditorRef.current?.value || "",
      validity: validityRef.current,
    };

    if (!isNewSnippetDataValid(snippetData)) {
      contentEditorRef.current?.focus();
      return;
    }

    createSnippet(snippetData);
  }, [createSnippet]);

  const onClear = React.useCallback(() => {
    if (contentEditorRef.current) {
      contentEditorRef.current.value = "";
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <SettingsPanel validityRef={validityRef} />
      <ContentEditor contentEditorRef={contentEditorRef} />
      <ButtonsPanel
        onSubmit={onSubmit}
        isLoading={isLoading}
        onClear={onClear}
      />
    </div>
  );
};
