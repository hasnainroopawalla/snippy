import {
  InMemoryCache,
  defaultDataIdFromObject,
  createHttpLink,
  ApolloClient,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ("nodeId" in responseObject) {
      return `${responseObject.nodeId}`;
    }

    return defaultDataIdFromObject(responseObject);
  },
  possibleTypes: { Node: ["Snippets"] }, // optional, but useful to specify supertype-subtype relationships
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

const authLink = setContext((_, { headers }) => ({
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

export default apolloClient;
