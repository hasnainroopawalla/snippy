import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { CREATE_SNIPPET_MUTATION, GET_SNIPPET_BY_ID_QUERY } from "../graphql";
import type { ICreateSnippetProps, ISnippet } from "../types";
import { apolloGetSnippetQueryResultAdapter } from "./adapters";

type SnippetServiceProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export class SnippetService {
  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(props: SnippetServiceProps) {
    this.apolloClient = props.apolloClient;
  }

  public async createSnippet(variables: ICreateSnippetProps) {
    return this.apolloClient.mutate({
      mutation: CREATE_SNIPPET_MUTATION,
      variables,
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
      .then(result => apolloGetSnippetQueryResultAdapter(result.data));
  }

  public deleteSnippet() {}
}
