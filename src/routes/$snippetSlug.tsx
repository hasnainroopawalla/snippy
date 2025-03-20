import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

const SnippetPage: React.FC = () => {
  const { snippetSlug } = Route.useParams();

  const { snippet } = Route.useLoaderData();

  return <span className="text-primary-text">{snippet?.content}</span>;
};

export const Route = createFileRoute("/$snippetSlug")({
  component: SnippetPage,
  loader: async ({ params, context }) => {
    const {
      services: { snippetService },
    } = context;

    const snippet = await snippetService.getSnippetById("582");

    return { snippet };
  },

  pendingComponent: () => <span>Loading</span>,

  notFoundComponent: () => <span>Not found!</span>,

  errorComponent: e => (
    <span className="text-primary-text">Error {e.error.message}</span>
  ),
});
