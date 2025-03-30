import classNames from "classnames";
import * as React from "react";

type TextWithIconProps = {
  TextSlot: React.ReactElement;
  IconSlot: React.ReactElement;
  classNameOverrides?: string;
};

export const TextWithIcon: React.FC<TextWithIconProps> = ({
  TextSlot,
  IconSlot,
  classNameOverrides,
}) => (
  <div
    className={classNames(
      "flex flex-row items-center gap-2 text-primary-text",
      classNameOverrides,
    )}
  >
    {IconSlot}
    {TextSlot}
  </div>
);

type TextAnchorProps = {
  label: string;
  onClick: () => void;
};

export const TextAnchor: React.FC<TextAnchorProps> = ({ label, onClick }) => (
  <span
    className="cursor-pointer text-accent hover:underline"
    onClick={onClick}
  >
    {label}
  </span>
);
