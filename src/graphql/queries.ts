import { graphql } from "./generated";

export const GET_SNIPPET_BY_ID_QUERY = graphql(`
  query GetSnippetById($id: BigIntFilter! = { in: [] }) {
    snippetsCollection(filter: { id: $id }) {
      edges {
        node {
          id
          content
          created_at
          expires_at
          slug
          password_hash
          privacy
        }
      }
    }
  }
`);

export const GET_SNIPPET_BY_SLUG_QUERY = graphql(`
  query GetSnippetBySlug($slug: StringFilter! = { eq: "" }) {
    snippetsCollection(filter: { slug: $slug }) {
      edges {
        node {
          id
          content
          created_at
          expires_at
          slug
          password_hash
          privacy
        }
      }
    }
  }
`);

export const GET_USAGE_METRICS_QUERY = graphql(`
  query GetUsageMetrics {
    usage_metricsCollection {
      edges {
        node {
          total_snippets_count
        }
      }
    }
  }
`);
