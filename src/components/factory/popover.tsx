import * as React from "react";
import * as PopoverFct from "@radix-ui/react-popover";

type PopoverProps = {
  ContentSlot: React.ReactElement;
  TriggerSlot: React.ReactElement;
};

export const Popover: React.FC<PopoverProps> = ({
  ContentSlot,
  TriggerSlot,
}) => (
  <PopoverFct.Root>
    <PopoverFct.Trigger>{TriggerSlot}</PopoverFct.Trigger>
    <PopoverFct.Content className="select-none rounded bg-secondary-bg px-[15px] py-2.5 text-[15px] leading-none text-primary-text ">
      {ContentSlot}
      <PopoverFct.Arrow className="fill-secondary-bg" />
    </PopoverFct.Content>
  </PopoverFct.Root>
);
