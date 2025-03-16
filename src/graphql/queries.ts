import { graphql } from "./generated";

export const getClipByIdDocument = graphql(`
  query GetClipByIdDocumentQuery($id: BigIntFilter! = { in: [] }) {
    clipsCollection(filter: { id: $id }) {
      edges {
        node {
          id
          content
          created_at
        }
      }
    }
  }
`);
