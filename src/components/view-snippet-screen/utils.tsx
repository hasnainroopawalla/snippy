import { SnippetPrivacy, type ISnippet } from "../../types";

export const isBlockedByPassword = (snippet: ISnippet): boolean =>
  !!snippet.passwordHash && snippet.privacy === SnippetPrivacy.Private;
