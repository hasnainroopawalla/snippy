import * as React from "react";
import { SelectWithLabel, TextWithIcon } from "../factory";
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

type ComposerToolbarProps = {
  validityRef: React.MutableRefObject<SnippetValidity>;
};

export const ComposerToolbar: React.FC<ComposerToolbarProps> = ({
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
    <TextWithIcon
      TextSlot={<span>Expires on {expiresOn}</span>}
      IconSlot={<CountdownTimerIcon />}
      classNameOverrides="text-xs text-secondary-text"
    />
  );
};
