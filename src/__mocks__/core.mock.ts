/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ICore } from "../core";
import { SnippetService, CryptoService, SlugService } from "../services";

const apolloClientMock = {
  mutate: () => Promise.resolve({} as any),
  query: () => Promise.resolve({} as any),
};

export const initializeCoreMock = async (): Promise<ICore> => {
  const slugService = new SlugService();

  const cryptoService = new CryptoService();

  const snippetService = new SnippetService({
    apolloClient: apolloClientMock,
    slugService,
    cryptoService,
  });

  return {
    services: {
      snippetService,
      cryptoService,
    },
  };
};
