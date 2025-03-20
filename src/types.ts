export const SNIPPET_VALIDITY = {
  "10m": "10 minutes",
  "1h": "1 hour",
  "1d": "1 day",
};

export type SnippetValidity = keyof typeof SNIPPET_VALIDITY;

export type ISnippet = {
  /* The unique integer identifier of the Snippet in the DB */
  id: string;
  /* The unique, human readable identifier of the Snippet */
  slug: string;
  /* The validity of the Snippet after which it is deleted from the DB */
  validity: string;
  /* The raw string content of the Snippet */
  content: string;
  /* The timestamp of when the Snippet was created */
  createdAt: string;
};

/**
 * The required props for creating a new Snippet.
 */
export type ICreateSnippetFormData = {
  content: ISnippet["content"];
  validity: SnippetValidity;
};
