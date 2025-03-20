import * as React from "react";
import { SelectWithLabel } from "../factory";
import {
  SnippetValidity,
  SNIPPET_VALIDITY,
  validityToMinutesMap,
} from "../../types";
import { CountdownTimerIcon } from "@radix-ui/react-icons";
import {
  useMinuteTick,
  convertDateToString,
  addMinutesToDate,
} from "../../utils";

type ComposerSettingsPanelProps = {
  validityRef: React.MutableRefObject<SnippetValidity>;
};

export const ComposerSettingsPanel: React.FC<ComposerSettingsPanelProps> = ({
  validityRef,
}) => {
  const [validity, setValidity] = React.useState(validityRef.current);

  const onValiditySelected = React.useCallback(
    (validity: SnippetValidity) => {
      validityRef.current = validity;
      setValidity(validity);
    },
    [validityRef],
  );

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <div className="flex flex-row flex-wrap gap-4">
        <SelectWithLabel
          label="Validity"
          items={SNIPPET_VALIDITY}
          onItemSelect={onValiditySelected}
          initialValue={validityRef.current}
        />
      </div>
      <MinuteChange validity={validity} />
    </div>
  );
};

// TODO: rename
type MinuteChangeProps = {
  validity: SnippetValidity;
};

const MinuteChange: React.FC<MinuteChangeProps> = ({ validity }) => {
  const renderToken = useMinuteTick();

  const expiresOn = React.useMemo(
    () =>
      convertDateToString(
        addMinutesToDate(new Date(), validityToMinutesMap[validity]),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validity, renderToken],
  );

  return (
    <div className="text-secondary-text text-xs flex flex-row gap-1 items-center">
      <CountdownTimerIcon />
      <span>Expires on {expiresOn}</span>
    </div>
  );
};
