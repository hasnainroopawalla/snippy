import classNames from "classnames";
import * as React from "react";

type TextWithIconProps = {
  TextSlot: React.ReactElement;
  IconSlot: React.ReactElement;
  classNameOverrides?: string;
  onClick?: () => void;
};

export const TextWithIcon: React.FC<TextWithIconProps> = ({
  TextSlot,
  IconSlot,
  classNameOverrides,
  onClick,
}) => (
  <div
    className={classNames(
      "flex flex-row items-center gap-2 text-primary-text",
      classNameOverrides,
    )}
    onClick={onClick}
  >
    {IconSlot}
    {TextSlot}
  </div>
);

type TextAnchorProps = {
  label: string;
  onClick?: () => void;
  testId?: string;
};

export const TextAnchor: React.FC<TextAnchorProps> = ({
  testId,
  label,
  onClick,
}) => (
  <span
    data-testid={testId}
    className="cursor-pointer text-accent hover:underline"
    onClick={onClick}
  >
    {label}
  </span>
);
