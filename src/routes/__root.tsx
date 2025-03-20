import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { IServicesContext } from "../contexts/services-context";

export type IRootRouterWithContext = { services: IServicesContext };

export const Route = createRootRouteWithContext<IRootRouterWithContext>()({
  component: () => (
    <div
      id="container"
      className="container flex flex-col gap-5 p-5 mx-auto mt-5"
    >
      <Navbar />
      <Outlet />
    </div>
  ),
});

const Navbar = () => <span className="text-primary-text text-xl">Snippy</span>;
