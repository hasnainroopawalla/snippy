import { graphql } from "./generated";

export const CREATE_SNIPPET_MUTATION = graphql(`
  mutation CreateSnippet($content: String!, $slug: String!) {
    insertIntosnippetsCollection(objects: { content: $content, slug: $slug }) {
      records {
        id
      }
    }
  }
`);
