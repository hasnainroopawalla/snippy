import * as React from "react";
import { SnippetService, SlugService, CryptoService } from "../services";
import apolloClient from "../apollo-client";

export type IServicesContext = {
  snippetService: SnippetService;
};

const ServicesContext = React.createContext<IServicesContext>(
  {} as IServicesContext,
);

export const ServicesProvider = ({ children }: React.PropsWithChildren) => {
  const services = React.useMemo(() => {
    const slugService = new SlugService();

    const cryptoService = new CryptoService();

    return {
      snippetService: new SnippetService({
        apolloClient,
        slugService,
        cryptoService,
      }),
    };
  }, []);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => React.useContext(ServicesContext);
