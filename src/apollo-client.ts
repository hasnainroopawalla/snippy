import {
  InMemoryCache,
  defaultDataIdFromObject,
  createHttpLink,
  ApolloClient,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import type { AuthService } from "./services";

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

export const createApolloClient = (props: { authService: AuthService }) => {
  const { authService } = props;

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_SUPABASE_DATA_URL,
  });

  const authLink = setContext(async (_, { headers }) => {
    const session = await authService.getSession();

    if (!session) {
      throw new Error("Auth session not created.");
    }

    const token = session.access_token;

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};
