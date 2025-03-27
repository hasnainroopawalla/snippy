import * as React from "react";
import { CountdownTimerIcon } from "@radix-ui/react-icons";
import { TextWithIcon } from "../factory";

// TODO
export const SnippetMetadata: React.FC = () => (
  <TextWithIcon
    TextSlot={<span>Expires on __. Read 4 times</span>}
    IconSlot={<CountdownTimerIcon />}
    classNameOverrides="text-xs text-secondary-text"
  />
);
