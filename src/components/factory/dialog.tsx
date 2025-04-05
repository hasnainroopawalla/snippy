import * as React from "react";
import * as DialogFct from "@radix-ui/react-dialog";

type DialogProps = {
  ContentSlot: React.ReactElement;
  TriggerSlot: React.ReactElement;
};

export const Dialog: React.FC<DialogProps> = ({ ContentSlot, TriggerSlot }) => (
  <DialogFct.Root>
    <DialogFct.Trigger asChild>{TriggerSlot}</DialogFct.Trigger>
    <DialogFct.Portal>
      <DialogFct.Title></DialogFct.Title>
      <DialogFct.Overlay className="fixed inset-0 bg-primary-bg data-[state=open]:opacity-70" />
      <DialogFct.Content className="fixed left-1/2 top-1/2 max-h-[85vh] max-w-[500px] -translate-x-1/2 -translate-y-1/2  border border-secondary-bg rounded-md">
        {ContentSlot}
      </DialogFct.Content>
    </DialogFct.Portal>
  </DialogFct.Root>
);
