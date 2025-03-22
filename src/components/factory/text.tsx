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
