import * as React from "react";
import { SelectWithLabel } from "../factory";

// TODO: rename
export const NewClipForm: React.FC = () => (
  <div className="flex flex-col gap-4">
    <OptionsPanel />
    <ContentEditor />
  </div>
);

const OptionsPanel: React.FC = () => (
  <div className="flex flex-row flex-wrap gap-2">
    <SelectWithLabel label="Validity" />
    <SelectWithLabel label="Privacy" />
  </div>
);

const ContentEditor: React.FC = () => (
  <div>
    <textarea className="rounded w-full bg-secondary-bg text-primary-text p-2" />
  </div>
);
