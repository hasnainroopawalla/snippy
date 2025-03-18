import * as React from "react";
import { SelectWithLabel } from "../factory";
import { SnippetValidity, SNIPPET_VALIDITY } from "../../types";

type SettingsPanelProps = {
  validityRef: React.MutableRefObject<SnippetValidity>;
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  validityRef,
}) => {
  const onValiditySelected = React.useCallback(
    (validity: SnippetValidity) => {
      validityRef.current = validity;
    },
    [validityRef]
  );

  return (
    <div className="flex flex-row flex-wrap gap-4">
      <SelectWithLabel
        label="Validity"
        items={SNIPPET_VALIDITY}
        onItemSelect={onValiditySelected}
        initialValue={validityRef.current}
      />
      {/* <SelectWithLabel label="Privacy" /> */}
    </div>
  );
};
