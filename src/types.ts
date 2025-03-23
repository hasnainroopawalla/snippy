export const SNIPPET_VALIDITY_OPTIONS = {
  "10m": "10 minutes",
  "1h": "1 hour",
  "1d": "1 day",
};

export const validityToMinutesMap: Record<SnippetValidity, number> = {
  "10m": 10,
  "1h": 60,
  "1d": 1440,
};

export type SnippetValidity = keyof typeof SNIPPET_VALIDITY_OPTIONS;

export const SNIPPET_PRIVACY_OPTIONS = {
  public: "Public",
  protected: "Protected",
  private: "Private",
};

export type SnippetPrivacy = keyof typeof SNIPPET_PRIVACY_OPTIONS;

/**
 * Represents a Snippet in the DB.
 */
export type ISnippet = {
  /* The unique integer identifier of the Snippet in the DB */
  id: string;
  /* The unique, human readable identifier of the Snippet */
  slug: string;
  /* The validity of the Snippet after which it is deleted from the DB */
  // validity: string;
  /* The raw string content of the Snippet */
  content: string;
  /* The timestamp of when the Snippet was created */
  createdAt: string;
  /* The hashed password string */
  passwordHash: string | null | undefined;
};

/**
 * The required props from the UX layer for creating a new Snippet.
 */
export type ICreateSnippetFormData = {
  content: ISnippet["content"];
  validity: SnippetValidity; // TODO: experiment with ways to store in DB
} & (
  | {
      privacy: Extract<SnippetPrivacy, "public">;
      password: string | null | undefined;
    }
  | {
      privacy: Extract<SnippetPrivacy, "protected">;
      password: string;
    }
  | {
      privacy: Extract<SnippetPrivacy, "private">;
      password: string;
    }
);

/**
 * All the required props for creating a new Snippet.
 */
export type ICreateSnippetData = ICreateSnippetFormData & {
  slug: ISnippet["slug"];
};
