import * as React from "react";
import type { ISnippet } from "../../types";
import { SnippetPasswordSection } from "./password-section";
import { isBlockedByPassword } from "./utils";
import { useServices } from "../../contexts";
import { SnippetSection } from "./snippet-section";

type ViewSnippetScreenProps = { snippet: ISnippet };

export const ViewSnippetScreen: React.FC<ViewSnippetScreenProps> = ({
  snippet,
}) => {
  const [passwordRequired, setPasswordRequired] = React.useState<boolean>(() =>
    isBlockedByPassword(snippet),
  );

  const snippetRef = React.useRef<ISnippet>(snippet);

  const { cryptoService } = useServices();

  const onPasswordValidationSuccess = React.useCallback(
    (rawPassword: string) => {
      // Decrypt the content with the raw password
      snippetRef.current.content = cryptoService.decrypt(
        snippetRef.current.content,
        rawPassword,
      );
      setPasswordRequired(false);
    },
    [cryptoService],
  );

  return passwordRequired ? (
    <SnippetPasswordSection
      snippet={snippetRef.current}
      onPasswordValidationSuccess={onPasswordValidationSuccess}
    />
  ) : (
    <SnippetSection snippet={snippetRef.current} />
  );
};
