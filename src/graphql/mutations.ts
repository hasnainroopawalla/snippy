import { graphql } from "./generated";

export const CREATE_SNIPPET_MUTATION = graphql(`
  mutation CreateSnippet($content: String!) {
    insertIntosnippetsCollection(objects: { content: $content }) {
      records {
        id
      }
    }
  }
`);
