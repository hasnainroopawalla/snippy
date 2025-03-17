import * as React from "react";
import { Button, SelectWithLabel } from "../factory";
import { ClipValidity, CLIP_VALIDITY } from "../../types";

export const NewClipForm: React.FC = () => {
  const validityRef = React.useRef<ClipValidity>("10m");

  return (
    <div className="flex flex-col gap-6">
      <OptionsPanel validityRef={validityRef} />
      <ContentEditor />
      <ButtonsPanel />
      <button onClick={() => console.log(validityRef.current)}>click</button>
    </div>
  );
};

type OptionsPanelProps = {
  validityRef: React.MutableRefObject<ClipValidity>;
};

const OptionsPanel: React.FC<OptionsPanelProps> = ({ validityRef }) => {
  const onValiditySelected = React.useCallback(
    (validity: ClipValidity) => {
      validityRef.current = validity;
    },
    [validityRef]
  );

  return (
    <div className="flex flex-row flex-wrap gap-4">
      <SelectWithLabel
        label="Validity"
        items={CLIP_VALIDITY}
        onItemSelect={onValiditySelected}
        initialValue={validityRef.current}
      />
      {/* <SelectWithLabel label="Privacy" /> */}
    </div>
  );
};

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
