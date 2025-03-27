import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ViewSnippetScreen, SnippetNotFound } from "../components";

const SnippetPage: React.FC = () => {
  const { snippetSlug } = Route.useParams();

  const { snippet } = Route.useLoaderData();

  return (
    <>
      {snippet ? <ViewSnippetScreen snippet={snippet} /> : <SnippetNotFound />}
    </>
  );
};

export const Route = createFileRoute("/$snippetSlug")({
  component: SnippetPage,

  loader: async ({ params, context }) => {
    const {
      services: { snippetService },
    } = context;

    const snippet = await snippetService.getSnippetBySlug(params.snippetSlug);

    return { snippet };
  },

  pendingComponent: () => <span>Loading</span>,
});
