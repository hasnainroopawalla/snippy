import { createClient } from "@supabase/supabase-js";
import { createApolloClient } from "./apollo-client";
import {
  SnippetService,
  AuthService,
  SlugService,
  CryptoService,
} from "./services";

export type ICore = {
  services: { snippetService: SnippetService };
};

export const initializeCore = async (): Promise<ICore> => {
  const supabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_BASE_URL,
    import.meta.env.VITE_SUPABASE_API_KEY,
  );

  const authService = new AuthService({ supabaseClient });
  await authService.createAnonymousUser();

  const apolloClient = createApolloClient({ authService });

  const slugService = new SlugService();

  const cryptoService = new CryptoService();

  const snippetService = new SnippetService({
    apolloClient,
    slugService,
    cryptoService,
  });

  return {
    services: {
      snippetService,
    },
  };
};
