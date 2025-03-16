import * as React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  defaultDataIdFromObject,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { getPasteByIdDocument } from "../../queries";

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ("nodeId" in responseObject) {
      return `${responseObject.nodeId}`;
    }

    return defaultDataIdFromObject(responseObject);
  },
  possibleTypes: { Node: ["Pastes"] }, // optional, but useful to specify supertype-subtype relationships
  typePolicies: {
    Query: {
      fields: {
        todosCollection: relayStylePagination(), // example of paginating a collection
        node: {
          read(_, { args, toReference }) {
            const ref = toReference({
              nodeId: args?.nodeId,
            });

            return ref;
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SUPABASE_URL,
});

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
    // Authorization: token ? `Bearer ${token}` : "",
  },
}));

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <List />
  </ApolloProvider>
);

const List = () => {
  const { data, loading } = useQuery(getPasteByIdDocument, {
    variables: {
      id: {
        eq: "2",
      },
    },
  });

  console.log("graphql", data);

  return (
    <div>
      {loading ? (
        <span>LOADING</span>
      ) : (
        data?.pastesCollection?.edges.map(({ node }) => (
          <span key={node.id}>{node.content}</span>
        ))
      )}
    </div>
  );
};
