import { ApolloQueryResult } from "@apollo/client";
import type { GetSnippetByIdQuery } from "../graphql/generated/graphql";
import type { ISnippet } from "../types";

/**
 * Adapts the apollo get snippet query result to an ISnippet.
 */
export const apolloGetSnippetQueryResultAdapter = (
  data: ApolloQueryResult<GetSnippetByIdQuery>["data"]
): ISnippet | null => {
  if (
    !data.snippetsCollection ||
    !data.snippetsCollection.edges ||
    data.snippetsCollection.edges.length === 0
  ) {
    return null;
  }

  // Return the first element of the array since each entry in the DB has a unique ID (primary key).
  const snippetData = data.snippetsCollection.edges[0].node;

  return {
    content: snippetData.content,
    id: snippetData.id,
    createdAt: snippetData.created_at,
    // validity: snippetData.validity,
    // slug: snippetData.slug
  };
};
