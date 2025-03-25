import * as React from "react";
import { SnippetService } from "../services";

export type IServicesContext = {
  snippetService: SnippetService;
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
