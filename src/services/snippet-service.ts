/* eslint-disable camelcase */
import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  CREATE_SNIPPET_MUTATION,
  GET_SNIPPET_BY_ID_QUERY,
  GET_SNIPPET_BY_SLUG_QUERY,
  GET_USAGE_METRICS_QUERY,
} from "../graphql";
import {
  validityToMinutesMap,
  type ICreateSnippetFormData,
  type ISnippet,
  type SnippetValidity,
} from "../types";
import { MutationResultAdapters, QueryResultAdapters } from "./adapters";
import type { SlugService } from "./slug-service";
import type { CryptoService } from "./crypto-service";
import { addMinutesToDate } from "../utils";

type LightApolloClient = Pick<
  ApolloClient<NormalizedCacheObject>,
  "mutate" | "query"
>;

type SnippetServiceProps = {
  apolloClient: LightApolloClient;
  slugService: SlugService;
  cryptoService: CryptoService;
};

export class SnippetService {
  private apolloClient: LightApolloClient;
  private slugService: SlugService;
  private cryptoService: CryptoService;

  constructor(props: SnippetServiceProps) {
    this.apolloClient = props.apolloClient;
    this.slugService = props.slugService;
    this.cryptoService = props.cryptoService;
  }

  public async createSnippet(
    variables: ICreateSnippetFormData,
  ): Promise<ISnippet | null> {
    const { content, password, privacy, validity } = variables;

    const slug = this.slugService.generate();

    const { content: contentPayload, password: passwordPayload } = password
      ? this.encryptDataAndHashPassword(content, password)
      : { content, password };

    const mutationVariables = {
      slug,
      privacy,
      validity,
      expires_at: this.getExpiresAtDateString(validity),
      passwordHash: passwordPayload,
      content: contentPayload,
    };

    return this.apolloClient
      .mutate({
        mutation: CREATE_SNIPPET_MUTATION,
        variables: mutationVariables,
      })
      .then(result => MutationResultAdapters.createSnippet(result));
  }

  public updateSnippet() {}

  public async getSnippetById(id: string): Promise<ISnippet | null> {
    return this.apolloClient
      .query({
        query: GET_SNIPPET_BY_ID_QUERY,
        variables: {
          id: {
            eq: id,
          },
        },
      })
      .then(result => QueryResultAdapters.getSnippet(result));
  }

  public async getSnippetBySlug(slug: string): Promise<ISnippet | null> {
    return this.apolloClient
      .query({
        query: GET_SNIPPET_BY_SLUG_QUERY,
        variables: {
          slug: {
            eq: slug,
          },
        },
      })
      .then(result => QueryResultAdapters.getSnippet(result));
  }

  public async getUsageMetrics() {
    return this.apolloClient
      .query({ query: GET_USAGE_METRICS_QUERY })
      .then(result => QueryResultAdapters.getUsageMetrics(result));
  }

  /**
   * Encrypts the content with the password string and then hashes the password.
   */
  private encryptDataAndHashPassword(content: string, password: string) {
    return {
      content: this.cryptoService.encrypt(content, password),
      password: this.cryptoService.hash(password),
    };
  }

  private getExpiresAtDateString(validity: SnippetValidity): string {
    return addMinutesToDate(
      new Date(),
      validityToMinutesMap[validity],
    ).toISOString();
  }
}
