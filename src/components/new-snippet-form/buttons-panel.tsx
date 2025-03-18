import * as React from "react";
import { Button } from "../factory";

type ButtonsPanelProps = {
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
};

export const ButtonsPanel: React.FC<ButtonsPanelProps> = ({
  onSubmit,
  onClear,
  isLoading,
}) => (
  <div className="flex flex-row flex-wrap justify-start gap-4">
    <Button variant="primary" onClick={onSubmit} isLoading={isLoading}>
      Save
    </Button>
    <Button variant="secondary" onClick={onClear}>
      Clear
    </Button>
  </div>
);
