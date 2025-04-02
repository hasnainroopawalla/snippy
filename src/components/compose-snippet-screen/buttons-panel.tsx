import * as React from "react";
import { Button } from "../factory";
import {
  isValidCreateSnippetData,
  useCreateSnippet,
} from "./use-create-snippet";
import { useNavigate } from "@tanstack/react-router";
import type { SnippetPrivacy, SnippetValidity } from "../../types";

type ButtonsPanelProps = {
  contentEditorRef: React.RefObject<HTMLTextAreaElement>;
  validityRef: React.MutableRefObject<SnippetValidity>;
  privacyRef: React.MutableRefObject<SnippetPrivacy>;
  passwordRef: React.RefObject<HTMLInputElement>;
};

export const ButtonsPanel: React.FC<ButtonsPanelProps> = ({
  contentEditorRef,
  validityRef,
  privacyRef,
  passwordRef,
}) => {
  const { createSnippet, isLoading } = useCreateSnippet();

  const navigate = useNavigate();

  const onSubmit = React.useCallback(() => {
    const snippetData = {
      content: contentEditorRef.current?.value,
      validity: validityRef.current,
      privacy: privacyRef.current,
      password: passwordRef.current?.value,
    };

    // TODO: improve this logic
    if (!isValidCreateSnippetData(snippetData)) {
      if (!snippetData.content) contentEditorRef.current?.focus();
      if (!snippetData.password) passwordRef.current?.focus();
      return;
    }

    createSnippet(snippetData).then(snippet => {
      if (!snippet) {
        console.log("Snippet not created");
        return;
      }

      navigate({ to: "/$snippetSlug", params: { snippetSlug: snippet.slug } });
    });
  }, [
    contentEditorRef,
    validityRef,
    privacyRef,
    passwordRef,
    createSnippet,
    navigate,
  ]);

  return (
    <div className="flex flex-row flex-wrap justify-start gap-4">
      <Button variant="primary" onClick={onSubmit} isLoading={isLoading}>
        Save
      </Button>
    </div>
  );
};
