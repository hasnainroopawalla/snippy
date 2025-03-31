import * as React from "react";
import { CountdownTimerIcon } from "@radix-ui/react-icons";
import { TextWithIcon } from "../factory";
import { convertDateToString } from "../../utils";

type SnippetMetadataProps = {
  expiresAt: string;
};

export const SnippetMetadata: React.FC<SnippetMetadataProps> = ({
  expiresAt,
}) => {
  const expiresAtDateString = React.useMemo(
    () => convertDateToString(new Date(expiresAt)),
    [expiresAt],
  );

  return (
    <TextWithIcon
      TextSlot={<span>Expires on {expiresAtDateString}</span>}
      IconSlot={<CountdownTimerIcon />}
      classNameOverrides="text-xs text-secondary-text"
    />
  );
};
