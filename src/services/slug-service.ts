import slugTokens from "./slug-categories.json";

type SlugTokens = {
  adjectives: string[];
  nouns: string[];
};

const SLUG_SEPARATOR = "-";

export class SlugService {
  private slugTokens: SlugTokens;

  constructor() {
    this.slugTokens = slugTokens;
  }

  public generate(): string {
    return [
      this.getRandomSlugToken("adjective"),
      this.getRandomSlugToken("noun"),
    ].join(SLUG_SEPARATOR);
  }

  private getRandomSlugToken(kind: "adjective" | "noun"): string {
    const tokens =
      kind === "adjective" ? this.slugTokens.adjectives : this.slugTokens.nouns;

    return tokens[Math.floor(Math.random() * tokens.length)];
  }
}
