import * as React from "react";
import { NewClipForm } from "../new-clip-form";
import { Navbar } from "../navbar";

export const App: React.FC = () => (
  <div
    id="container"
    className="container flex flex-col gap-1 mx-auto mt-5 p-2"
  >
    {/* <Navbar /> */}
    <NewClipForm />
  </div>
);
