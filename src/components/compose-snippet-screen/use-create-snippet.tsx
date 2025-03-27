import * as React from "react";
import { useServices } from "../../contexts";
import type { ICreateSnippetFormData } from "../../types";

export const useCreateSnippet = () => {
  const { snippetService } = useServices();

  const [isLoading, setIsLoading] = React.useState(false);

  const createSnippet = React.useCallback(
    async (props: ICreateSnippetFormData) => {
      setIsLoading(true);

      return snippetService.createSnippet(props).finally(() => {
        setIsLoading(false);
      });
    },
    [snippetService],
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
      ((snippetData.privacy === "private" && snippetData.password) ||
        // password should exist if protected snippet
        (snippetData.privacy === "protected" && snippetData.password) ||
        // password should not exist if public snippet
        (snippetData.privacy === "public" && !snippetData.password))
    )
  );
