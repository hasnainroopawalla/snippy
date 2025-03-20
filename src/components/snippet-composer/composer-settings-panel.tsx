import * as React from "react";
import { SelectWithLabel } from "../factory";
import { SnippetValidity, SNIPPET_VALIDITY } from "../../types";

type ComposerSettingsPanelProps = {
  validityRef: React.MutableRefObject<SnippetValidity>;
};

export const ComposerSettingsPanel: React.FC<ComposerSettingsPanelProps> = ({
  validityRef,
}) => {
  const onValiditySelected = React.useCallback(
    (validity: SnippetValidity) => {
      validityRef.current = validity;
    },
    [validityRef],
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
