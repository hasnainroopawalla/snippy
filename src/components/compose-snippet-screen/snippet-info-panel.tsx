import * as React from "react";
import {
  CountdownTimerIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  LockClosedIcon,
  LockOpen2Icon,
} from "@radix-ui/react-icons";
import { BadgeWithIcon } from "../factory";
import {
  SnippetPrivacy,
  SnippetValidity,
  validityToMinutesMap,
} from "../../types";
import {
  useMinuteTick,
  convertDateToString,
  addMinutesToDate,
} from "../../utils";

type SnippetInfoPanelProps = {
  validity: SnippetValidity;
  privacy: SnippetPrivacy;
};

export const SnippetInfoPanel: React.FC<SnippetInfoPanelProps> = ({
  validity,
  privacy,
}) => {
  const {
    privacyBadgeText,
    privacyBadgeIcon,
    passwordBadgeText,
    passwordBadgeIcon,
  } = getBadgeText(privacy);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <LiveValidityInfoBadge validity={validity} />
      <BadgeWithIcon
        color="blue"
        text={privacyBadgeText}
        IconSlot={privacyBadgeIcon}
      />
      <BadgeWithIcon
        color="green"
        text={passwordBadgeText}
        IconSlot={passwordBadgeIcon}
      />
    </div>
  );
};

type LiveValidityInfoBadgeProps = {
  validity: SnippetValidity;
};

const LiveValidityInfoBadge: React.FC<LiveValidityInfoBadgeProps> = ({
  validity,
}) => {
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
      color="orange"
      text={`${expiresOn}`}
      IconSlot={<CountdownTimerIcon />}
    />
  );
};

const getBadgeText = (privacy: SnippetPrivacy) => {
  switch (privacy) {
    case SnippetPrivacy.Public:
      return {
        privacyBadgeText: "Everyone",
        privacyBadgeIcon: <EyeOpenIcon />,
        passwordBadgeText: "Readonly",
        passwordBadgeIcon: <LockOpen2Icon />,
      };

    case SnippetPrivacy.Protected:
      return {
        privacyBadgeText: "Everyone",
        privacyBadgeIcon: <EyeOpenIcon />,
        passwordBadgeText: "Password required to edit",
        passwordBadgeIcon: <LockClosedIcon />,
      };

    case SnippetPrivacy.Private:
      return {
        privacyBadgeText: "No one",
        privacyBadgeIcon: <EyeNoneIcon />,
        passwordBadgeText: "Password required to view and edit",
        passwordBadgeIcon: <LockClosedIcon />,
      };
  }
};
