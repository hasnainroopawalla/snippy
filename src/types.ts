import { Privacy } from "./graphql/generated";

export enum SnippetValidity {
  "10m" = "10 minutes",
  "1h" = "1 hour",
  "1d" = "1 day",
}

export const validityToMinutesMap: Record<SnippetValidity, number> = {
  [SnippetValidity["10m"]]: 10,
  [SnippetValidity["1h"]]: 60,
  [SnippetValidity["1d"]]: 1440,
};

export { Privacy as SnippetPrivacy };

/**
 * Represents a Snippet in the DB.
 */
export type ISnippet = {
  /* The unique integer identifier of the Snippet in the DB */
  id: string;
  /* The unique, human readable identifier of the Snippet */
  slug: string;
  /* The privacy of the snippet - Private/Protected/Public */
  privacy: Privacy;
  /* The raw string content of the Snippet */
  content: string;
  /* The timestamp of when the Snippet was created */
  createdAt: string;
  /* The timestamp of when the Snippet will expire */
  expiresAt: string;
  /* The hashed password string */
  passwordHash: string | null | undefined;
};

/**
 * The required props from the UX layer for creating a new Snippet.
 */
export type ICreateSnippetFormData = {
  content: ISnippet["content"];
  validity: SnippetValidity;
} & (
  | {
      privacy: Privacy.Public;
      password: string | null | undefined;
    }
  | {
      privacy: Privacy.Protected;
      password: string;
    }
  | {
      privacy: Privacy.Private;
      password: string;
    }
);

/**
 * All the required props for creating a new Snippet.
 */
export type ICreateSnippetData = ICreateSnippetFormData & {
  slug: ISnippet["slug"];
};
