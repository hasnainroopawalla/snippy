/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from "@apollo/client";

const allPastesQueryDocument = gql(/* GraphQL */ `
  query getAllPastes($cursor: Cursor) {
    pastesCollection(first: 10, after: $cursor) {
      edges {
        node {
          id
          created_at
          content
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

const getPasteByIdDocument = gql(/* GraphQL */ `
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
