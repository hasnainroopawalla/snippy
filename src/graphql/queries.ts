import { graphql } from "./generated";

export const getPasteByIdDocument = graphql(`
  query ProfileByIdQuery($id: BigIntFilter = { in: [] }) {
    pastesCollection(filter: { id: $id }) {
      edges {
        node {
          id
          content
        }
      }
    }
  }
`);
