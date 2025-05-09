import { ApolloQueryResult, FetchResult } from "@apollo/client";
import {
  CreateSnippetMutation,
  GetSnippetByIdQuery,
  GetUsageMetricsQuery,
} from "../graphql/generated";
import type { ISnippet, IUsageMetrics } from "../types";

export const QueryResultAdapters = {
  /**
   * Adapts the apollo get snippet query result to an ISnippet.
   */
  getSnippet: (
    result: ApolloQueryResult<GetSnippetByIdQuery>,
  ): ISnippet | null => {
    if (
      !result.data.snippetsCollection ||
      !result.data.snippetsCollection.edges ||
      result.data.snippetsCollection.edges.length === 0
    ) {
      return null;
    }

    // Return the first element of the array since each entry in the DB has a unique ID (primary key).
    const snippetData = result.data.snippetsCollection.edges[0].node;

    return {
      content: snippetData.content,
      id: snippetData.id,
      createdAt: snippetData.created_at,
      expiresAt: snippetData.expires_at,
      privacy: snippetData.privacy,
      // validity: snippetData.validity,
      slug: snippetData.slug,
      passwordHash: snippetData.password_hash,
    };
  },

  getUsageMetrics: (
    result: ApolloQueryResult<GetUsageMetricsQuery>,
  ): IUsageMetrics | null => {
    if (
      !result.data.usage_metricsCollection ||
      !result.data.usage_metricsCollection.edges ||
      result.data.usage_metricsCollection.edges.length === 0
    ) {
      return null;
    }

    // Return the first element of the array since each entry in the DB has a unique ID (primary key).
    const usageMetrics = result.data.usage_metricsCollection.edges[0].node;

    return {
      totalSnippetsCount: Number(usageMetrics.total_snippets_count),
    };
  },
};

export const MutationResultAdapters = {
  /**
   * Adapts the apollo create snippet mutation result to an ISnippet.
   */
  createSnippet: (
    result: FetchResult<CreateSnippetMutation>,
  ): ISnippet | null => {
    // result.data?.insertIntosnippetsCollection?.records[0].content
    if (
      !result.data ||
      !result.data.insertIntosnippetsCollection ||
      !result.data.insertIntosnippetsCollection.records
    ) {
      return null;
    }

    const snippetData = result.data.insertIntosnippetsCollection.records[0];

    return {
      content: snippetData.content,
      id: snippetData.id,
      createdAt: snippetData.created_at,
      expiresAt: snippetData.expires_at,
      privacy: snippetData.privacy,
      // validity: snippetData.validity,
      slug: snippetData.slug,
      passwordHash: snippetData.password_hash,
    };
  },
};
