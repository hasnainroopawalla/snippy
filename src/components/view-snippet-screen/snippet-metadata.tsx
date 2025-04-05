import * as React from "react";
import { CountdownTimerIcon } from "@radix-ui/react-icons";
import { TextWithIcon } from "../factory";
import {
  convertDateToString,
  convertUTCDateStringToLocalDate,
} from "../../utils";

type SnippetMetadataProps = {
  // Snippet expiry date string in UTC.
  expiresAt: string;
};

export const SnippetMetadata: React.FC<SnippetMetadataProps> = ({
  expiresAt,
}) => {
  const expiresAtDateString = React.useMemo(
    () => convertDateToString(convertUTCDateStringToLocalDate(expiresAt)),
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
