import * as React from "react";
import {
  CountdownTimerIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  LockClosedIcon,
  LockOpen1Icon,
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
  password: string;
};

export const SnippetInfoPanel: React.FC<SnippetInfoPanelProps> = ({
  validity,
  privacy,
  password,
}) => {
  const { privacyBadge, passwordBadge } = getBadgeText(privacy, password);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <LiveValidityInfoBadge validity={validity} />
      <BadgeWithIcon
        color="green"
        text={privacyBadgeText}
        IconSlot={<EyeNoneIcon />}
      />
      <BadgeWithIcon
        color="orange"
        text={passwordBadgeText}
        IconSlot={<LockClosedIcon />}
      />
    </div>
  );
};

type ExpirationInfoBannerProps = {
  validity: SnippetValidity;
};

const LiveValidityInfoBadge: React.FC<ExpirationInfoBannerProps> = ({
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
      color="blue"
      text={`${expiresOn}`}
      IconSlot={<CountdownTimerIcon />}
    />
  );
};

const getBadgeText = (
  privacy: SnippetPrivacy,
  password: string,
): {
  privacyBadgeText: string;
  privacyBadgeIcon: React.ReactElement;
  passwordBadgeText: string;
  passwordBadgeIcon: React.ReactElement;
} => {
  const privacyBadgeProps =
    privacy === "public"
      ? {
          privacyBadgeText: "Everyone",
          privacyBadgeIcon: <EyeOpenIcon />,
        }
      : {
          privacyBadgeText: "No one.",
          privacyBadgeIcon: <EyeNoneIcon />,
        };

  if (privacy === "public") {
    // Public with password - require password for edit.
    if (password) {
      return {
        ...privacyBadgeProps,
        passwordBadgeText: "Password required only to edit",
        passwordBadgeIcon: <LockClosedIcon />,
      };
    } else {
      // Public without password - readonly.
      return {
        ...privacyBadgeProps,
        passwordBadgeText: "No password required",
        passwordBadgeIcon: <LockOpen1Icon />,
      };
    }
  } else if (privacy === "private") {
    // Public with password - require password for edit.
    if (password) {
      return {
        ...privacyBadgeProps,
        passwordBadgeText: "Password required only to edit",
        passwordBadgeIcon: <LockClosedIcon />,
      };
    } else {
      // Public without password - cannot be edited.
      return {
        ...privacyBadgeProps,
        passwordBadgeText: "No password required",
        passwordBadgeIcon: <LockOpen1Icon />,
      };
    }
  }
};
