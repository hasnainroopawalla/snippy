import { graphql } from "./generated";

export const GET_CLIP_BY_ID = graphql(`
  query GetClipByIdQuery($id: BigIntFilter! = { in: [] }) {
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
