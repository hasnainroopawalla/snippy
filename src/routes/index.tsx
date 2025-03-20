import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NewSnippetForm } from "../components";

const NewSnippetPage: React.FC = () => <NewSnippetForm />;

export const Route = createFileRoute("/")({
  component: NewSnippetPage,
});
