import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { IServicesContext } from "../contexts/services-context";
import { Navbar } from "../components";

export type IRootRouterWithContext = { services: IServicesContext };

export const Route = createRootRouteWithContext<IRootRouterWithContext>()({
  component: () => (
    <div
      id="container"
      className="container flex flex-col gap-10 p-5 mx-auto mt-5 lg:px-35"
    >
      <Navbar />
      <Outlet />
    </div>
  ),
});
