import "./index.css";
import { ServicesProvider, useServices } from "./contexts";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { IRootRouterWithContext } from "./routes/__root";

const router = createRouter({
  routeTree,
  defaultPendingMinMs: 0,
  context: {} as IRootRouterWithContext,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  const services = useServices();

  return <RouterProvider router={router} context={{ services }} />;
};

export const ContextualApp: React.FC = () => (
  <ServicesProvider>
    <App />
  </ServicesProvider>
);
