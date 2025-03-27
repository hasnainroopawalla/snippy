import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ComposeSnippetScreen } from "../components";

const SnippetComposerPage: React.FC = () => <ComposeSnippetScreen />;

export const Route = createFileRoute("/")({
  component: SnippetComposerPage,
});
