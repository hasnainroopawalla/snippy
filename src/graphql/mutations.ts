import { graphql } from "./generated";

export const CREATE_SNIPPET_MUTATION = graphql(`
  mutation CreateSnippet(
    $content: String!
    $slug: String!
    $privacy: privacy!
    $passwordHash: String
  ) {
    insertIntosnippetsCollection(
      objects: {
        content: $content
        slug: $slug
        privacy: $privacy
        password_hash: $passwordHash
      }
    ) {
      records {
        id
        created_at
        content
        slug
        privacy
        password_hash
      }
    }
  }
`);
