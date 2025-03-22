import * as React from "react";
import { Button } from "../factory";
import { isNewSnippetDataValid, useCreateSnippet } from "./use-create-snippet";
import { useNavigate } from "@tanstack/react-router";
import { SnippetValidity } from "../../types";

type ButtonsPanelProps = {
  contentEditorRef: React.RefObject<HTMLTextAreaElement>;
  validityRef: React.MutableRefObject<SnippetValidity>;
};

export const ButtonsPanel: React.FC<ButtonsPanelProps> = ({
  contentEditorRef,
  validityRef,
}) => {
  const { createSnippet, isLoading } = useCreateSnippet();

  const navigate = useNavigate();

  const onSubmit = React.useCallback(() => {
    const snippetData = {
      content: contentEditorRef.current?.value || "",
      validity: validityRef.current,
    };

    if (!isNewSnippetDataValid(snippetData)) {
      contentEditorRef.current?.focus();
      return;
    }

    createSnippet(snippetData).then(snippet => {
      if (!snippet) {
        console.log("Snippet not created");
        return;
      }

      navigate({ to: "/$snippetSlug", params: { snippetSlug: snippet.slug } });
    });
  }, [contentEditorRef, validityRef, createSnippet, navigate]);

  return (
    <div className="flex flex-row flex-wrap justify-start gap-4">
      <Button variant="primary" onClick={onSubmit} isLoading={isLoading}>
        Save
      </Button>
    </div>
  );
};
