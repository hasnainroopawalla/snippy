import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { IServicesContext } from "../contexts/services-context";

export type IRootRouterWithContext = { services: IServicesContext };

export const Route = createRootRouteWithContext<IRootRouterWithContext>()({
  component: () => (
    <div
      id="container"
      className="container flex flex-col gap-1 p-2 mx-auto mt-5"
    >
      <Outlet />
    </div>
  ),
});
