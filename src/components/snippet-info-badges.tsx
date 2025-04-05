import * as React from "react";
import {
  CountdownTimerIcon,
  EyeNoneIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { BadgeWithIcon, BadgeWithIconProps } from "./factory";
import {
  SnippetPrivacy,
  SnippetValidity,
  validityToMinutesMap,
} from "../types";
import { useMinuteTick, convertDateToString, addMinutesToDate } from "../utils";

type SnippetPrivacyBadgeProps = {
  privacy: SnippetPrivacy;
};

export const SnippetPrivacyBadge: React.FC<SnippetPrivacyBadgeProps> = ({
  privacy,
}) => <BadgeWithIcon {...getPrivacyBadgeProps(privacy)} />;

type SnippetValidityBadgeProps = {
  validity: SnippetValidity;
};

export const RealTimeSnippetValidityBadge: React.FC<
  SnippetValidityBadgeProps
> = ({ validity }) => {
  const renderToken = useMinuteTick();

  const expiresOn = React.useMemo(
    () =>
      convertDateToString(
        addMinutesToDate(new Date() /* now */, validityToMinutesMap[validity]),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validity, renderToken],
  );

  return (
    <BadgeWithIcon
      color="blue"
      text={`${expiresOn}`}
      IconSlot={<CountdownTimerIcon />}
    />
  );
};

const getPrivacyBadgeProps = (privacy: SnippetPrivacy): BadgeWithIconProps => {
  switch (privacy) {
    case SnippetPrivacy.Public:
      return {
        color: "green",
        text: "Everyone • No Password required",
        IconSlot: <EyeOpenIcon />,
      };
    case SnippetPrivacy.Private:
      return {
        color: "orange",
        text: "No one • Password required to View",
        IconSlot: <EyeNoneIcon />,
      };
  }
};
