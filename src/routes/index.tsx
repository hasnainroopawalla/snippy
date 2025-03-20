import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SnippetComposer } from "../components";

const SnippetComposerPage: React.FC = () => <SnippetComposer />;

export const Route = createFileRoute("/")({
  component: SnippetComposerPage,
});
