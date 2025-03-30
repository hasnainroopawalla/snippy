import * as React from "react";
import type { CryptoService, SnippetService } from "../services";

export type IServicesContext = {
  snippetService: SnippetService;
  cryptoService: CryptoService;
};

const ServicesContext = React.createContext<IServicesContext>(
  {} as IServicesContext,
);

type IServicesProviderProps = {
  services: IServicesContext;
};

export const ServicesProvider = ({
  services,
  children,
}: React.PropsWithChildren<IServicesProviderProps>) => (
  <ServicesContext.Provider value={services}>
    {children}
  </ServicesContext.Provider>
);

export const useServices = () => React.useContext(ServicesContext);
