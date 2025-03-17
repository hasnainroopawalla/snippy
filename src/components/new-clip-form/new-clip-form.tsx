import * as React from "react";
import { Button, SelectWithLabel } from "../factory";

// TODO: rename
export const NewClipForm: React.FC = () => (
  <div className="flex flex-col gap-6">
    <OptionsPanel />
    <ContentEditor />
    <ButtonsPanel />
  </div>
);

const OptionsPanel: React.FC = () => (
  <div className="flex flex-row flex-wrap gap-4">
    <SelectWithLabel label="Validity" />
    <SelectWithLabel label="Privacy" />
  </div>
);

const ContentEditor: React.FC = () => (
  <div className="flex flex-col gap-2">
    <span className="text-secondary-text">Content</span>
    <textarea className="w-full h-[300px] p-2 tracking-wide rounded bg-secondary-bg text-primary-text focus:outline-accent focus:outline-1" />
  </div>
);

const ButtonsPanel: React.FC = () => (
  <div className="flex flex-row flex-wrap justify-start gap-4">
    <Button variant="primary">Save</Button>
    <Button variant="secondary">Clear</Button>
  </div>
);
