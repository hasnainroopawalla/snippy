import * as React from "react";
import { SnippetService, SlugService } from "../services";
import apolloClient from "../apollo-client";

type IServicesContext = {
  snippetService: SnippetService;
};

const ServicesContext = React.createContext<IServicesContext>(
  {} as IServicesContext
);

export const ServicesProvider = ({ children }: React.PropsWithChildren) => {
  const services = React.useMemo(() => {
    const slugService = new SlugService();

    return {
      snippetService: new SnippetService({ apolloClient, slugService }),
    };
  }, []);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => React.useContext(ServicesContext);
