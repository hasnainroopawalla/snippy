import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { IServicesContext } from "../contexts/services-context";
import { Navbar } from "../components";

export type IRootRouterWithContext = { services: IServicesContext };

export const Route = createRootRouteWithContext<IRootRouterWithContext>()({
  component: () => (
    <div
      id="container"
      className="container flex flex-col gap-10 px-5 pt-10 mx-auto lg:px-35 bg-primary-bg"
    >
      <Navbar />
      <Outlet />
    </div>
  ),
});
