import * as React from "react";
import { Button } from "../factory";
import {
  isValidCreateSnippetData,
  useCreateSnippet,
} from "./use-create-snippet";
import type { SnippetPrivacy, SnippetValidity } from "../../types";

type ButtonsPanelProps = {
  contentEditorRef: React.RefObject<HTMLTextAreaElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
  validityRef: React.RefObject<SnippetValidity>;
  privacyRef: React.RefObject<SnippetPrivacy>;
};

export const ButtonsPanel: React.FC<ButtonsPanelProps> = ({
  contentEditorRef,
  validityRef,
  privacyRef,
  passwordRef,
}) => {
  const { createSnippet, isLoading } = useCreateSnippet();

  const onSubmit = React.useCallback(() => {
    const snippetData = {
      content: contentEditorRef.current?.value,
      validity: validityRef.current,
      privacy: privacyRef.current,
      password: passwordRef.current?.value,
    };

    if (!isValidCreateSnippetData(snippetData)) {
      if (!snippetData.content) contentEditorRef.current?.focus();
      if (!snippetData.password) passwordRef.current?.focus();
      return;
    }

    createSnippet(snippetData);
  }, [contentEditorRef, validityRef, privacyRef, passwordRef, createSnippet]);

  return (
    <div className="flex flex-row flex-wrap justify-start gap-4">
      <Button variant="primary" onClick={onSubmit} isLoading={isLoading}>
        Save
      </Button>
    </div>
  );
};
