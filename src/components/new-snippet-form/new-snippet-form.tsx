import * as React from "react";
import { SnippetValidity } from "../../types";
import { ButtonsPanel } from "./buttons-panel";
import { ContentEditor } from "./content-editor";
import { SettingsPanel } from "./settings-panel";
import { isNewSnippetDataValid, useCreateSnippet } from "./use-create-snippet";

export const NewSnippetForm: React.FC = () => {
  const validityRef = React.useRef<SnippetValidity>("10m");
  const contentRef = React.useRef<string>("");

  const { createSnippet, isLoading } = useCreateSnippet();

  const onSubmit = React.useCallback(() => {
    const snippetData = {
      content: contentRef.current,
      validity: validityRef.current,
    };

    if (!isNewSnippetDataValid(snippetData)) {
      return;
    }

    createSnippet(snippetData);
  }, [createSnippet]);

  // TODO: implement
  const onClear = React.useCallback(() => {}, []);

  return (
    <div className="flex flex-col gap-6">
      <SettingsPanel validityRef={validityRef} />
      <ContentEditor contentRef={contentRef} />
      <ButtonsPanel
        onSubmit={onSubmit}
        isLoading={isLoading}
        onClear={onClear}
      />
    </div>
  );
};
