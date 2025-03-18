import * as React from "react";
import { useServices } from "../../contexts";
import type { ICreateSnippetProps } from "../../types";

export const useCreateSnippet = () => {
  const { snippetService } = useServices();

  const [isLoading, setIsLoading] = React.useState(false);

  const createSnippet = React.useCallback(
    async (props: ICreateSnippetProps) => {
      setIsLoading(true);

      snippetService.createSnippet(props).finally(() => {
        setIsLoading(false);
      });
    },
    [snippetService]
  );

  return { createSnippet, isLoading };
};

export const isNewSnippetDataValid = (snippetData: ICreateSnippetProps) =>
  snippetData.content.length > 0;
