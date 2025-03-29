import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  CREATE_SNIPPET_MUTATION,
  GET_SNIPPET_BY_ID_QUERY,
  GET_SNIPPET_BY_SLUG_QUERY,
} from "../graphql";
import type { ICreateSnippetFormData, ISnippet } from "../types";
import { MutationResultAdapters, QueryResultAdapters } from "./adapters";
import type { SlugService } from "./slug-service";
import { CryptoService } from "./crypto-service";

type SnippetServiceProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  slugService: SlugService;
  cryptoService: CryptoService;
};

export class SnippetService {
  private apolloClient: ApolloClient<NormalizedCacheObject>;
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
    const slug = this.slugService.generate();

    return this.apolloClient
      .mutate({
        mutation: CREATE_SNIPPET_MUTATION,
        variables: {
          slug,
          content: variables.content,
          privacy: variables.privacy,
          validity: variables.validity,
          passwordHash: variables.password
            ? this.cryptoService.hash(variables.password)
            : "",
        },
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

  public deleteSnippet() {}

  public validatePasswordHash(
    snippetPasswordHash: string,
    inputPasswordHash: string,
  ): boolean {
    return snippetPasswordHash === this.cryptoService.hash(inputPasswordHash);
  }
}
