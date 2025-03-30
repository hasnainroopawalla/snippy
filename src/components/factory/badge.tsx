import * as React from "react";
import classNames from "classnames";

type BadgeProps = {
  color: "orange" | "blue" | "green";
  text: string;
};

export const Badge: React.FC<BadgeProps> = ({ color, text }) => (
  <span
    className={classNames(
      "max-w-max items-center px-1.5 py-1 rounded-sm text-badge-green-text bg-badge-green text-xs",
      getColorClass(color),
      // size === "large" ? "py-2 text-sm" : "py-1 text-xs",
    )}
  >
    {text}
  </span>
);

export type BadgeWithIconProps = BadgeProps & {
  IconSlot: React.ReactElement;
};

export const BadgeWithIcon: React.FC<BadgeWithIconProps> = ({
  color,
  text,
  IconSlot,
}) => (
  <div
    className={classNames(
      "flex flex-row gap-1 max-w-max items-center px-1.5 py-1 rounded-sm text-xs",
      getColorClass(color),
    )}
  >
    {IconSlot}
    <span>{text}</span>
  </div>
);

const getColorClass = (color: BadgeProps["color"]): string => {
  switch (color) {
    case "blue":
      return "text-badge-blue-text bg-badge-blue";
    case "green":
      return "text-badge-green-text bg-badge-green";
    case "orange":
      return "text-badge-orange-text bg-badge-orange";
    default:
      return "";
  }
};
