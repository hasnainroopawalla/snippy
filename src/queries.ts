import { graphql } from "./graphql";

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
