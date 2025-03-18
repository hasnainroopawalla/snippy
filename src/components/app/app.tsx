import * as React from "react";
import { NewSnippetForm } from "../new-snippet-form";
import { ServicesProvider } from "../../contexts";

export const App: React.FC = () => (
  <ServicesProvider>
    <div
      id="container"
      className="container flex flex-col gap-1 mx-auto mt-5 p-2"
    >
      <NewSnippetForm />
    </div>
  </ServicesProvider>
);
