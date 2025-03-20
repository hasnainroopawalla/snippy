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

export const isNewSnippetDataValid = (snippetData: ICreateSnippetFormData) =>
  snippetData.content.length > 0;
