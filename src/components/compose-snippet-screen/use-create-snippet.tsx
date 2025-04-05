import * as React from "react";
import { useServices } from "../../contexts";
import { SnippetPrivacy, type ICreateSnippetFormData } from "../../types";
import { useNavigate } from "@tanstack/react-router";

export const useCreateSnippet = () => {
  const { snippetService } = useServices();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);

  const createSnippet = React.useCallback(
    async (props: ICreateSnippetFormData) => {
      setIsLoading(true);

      return snippetService
        .createSnippet(props)
        .then(snippet => {
          if (snippet) {
            navigate({
              to: "/$snippetSlug",
              params: { snippetSlug: snippet.slug },
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [navigate, snippetService],
  );

  return { createSnippet, isLoading };
};

export const isValidCreateSnippetData = (
  snippetData: Partial<ICreateSnippetFormData>,
): snippetData is ICreateSnippetFormData =>
  !!(
    // content should not be empty
    (
      snippetData.content &&
      // validity should not be empty
      snippetData.validity &&
      // privacy should not be empty
      snippetData.privacy &&
      // password should exist if private snippet
      ((snippetData.privacy === SnippetPrivacy.Private &&
        snippetData.password) ||
        // password should not exist if public snippet
        (snippetData.privacy === SnippetPrivacy.Public &&
          !snippetData.password))
    )
  );
