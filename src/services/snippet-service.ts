import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  CREATE_SNIPPET_MUTATION,
  GET_SNIPPET_BY_ID_QUERY,
  GET_SNIPPET_BY_SLUG_QUERY,
} from "../graphql";
import type { ICreateSnippetFormData, ISnippet } from "../types";
import {
  MutationResultAdapters,
  QueryResultAdapters,
  VariableAdapters,
} from "./adapters";
import type { SlugService } from "./slug-service";

type SnippetServiceProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  slugService: SlugService;
};

export class SnippetService {
  private apolloClient: ApolloClient<NormalizedCacheObject>;
  private slugService: SlugService;

  constructor(props: SnippetServiceProps) {
    this.apolloClient = props.apolloClient;
    this.slugService = props.slugService;
  }

  public async createSnippet(
    variables: ICreateSnippetFormData,
  ): Promise<ISnippet | null> {
    const slug = this.slugService.generate();
    const passwordHash = this.encryptionService.encrypt();

    return this.apolloClient
      .mutate({
        mutation: CREATE_SNIPPET_MUTATION,
        variables: VariableAdapters.createSnippet({
          ...variables,
          slug,
        }),
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
}
