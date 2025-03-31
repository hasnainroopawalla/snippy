import { graphql } from "./generated";

export const CREATE_SNIPPET_MUTATION = graphql(`
  mutation CreateSnippet(
    $content: String!
    $slug: String!
    $privacy: privacy!
    $expires_at: Datetime!
    $passwordHash: String
  ) {
    insertIntosnippetsCollection(
      objects: {
        content: $content
        slug: $slug
        privacy: $privacy
        password_hash: $passwordHash
        expires_at: $expires_at
      }
    ) {
      records {
        id
        created_at
        expires_at
        content
        slug
        privacy
        password_hash
      }
    }
  }
`);
