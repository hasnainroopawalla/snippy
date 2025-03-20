import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { CREATE_SNIPPET_MUTATION, GET_SNIPPET_BY_ID_QUERY } from "../graphql";
import type { ICreateSnippetFormData, ISnippet } from "../types";
import { apolloGetSnippetQueryResultAdapter } from "./adapters";
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

  public async createSnippet(variables: ICreateSnippetFormData) {
    const slug = this.slugService.generate();

    return this.apolloClient.mutate({
      mutation: CREATE_SNIPPET_MUTATION,
      variables: {
        ...variables,
        slug,
      },
    });
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
      .then(result => {
        const snippet = apolloGetSnippetQueryResultAdapter(result.data);

        if (!snippet) {
          throw new Error("Snippet does not exist!");
        }

        return snippet;
      });
  }

  public deleteSnippet() {}
}
