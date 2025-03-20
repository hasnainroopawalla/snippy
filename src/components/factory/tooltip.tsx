import * as React from "react";
import * as TooltipFct from "@radix-ui/react-tooltip";

type TooltipProps = {
  content: React.ReactNode;
  children?: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => (
  <TooltipFct.Provider>
    <TooltipFct.Root>
      <TooltipFct.Trigger asChild>{children}</TooltipFct.Trigger>
      <TooltipFct.Content
        className="select-none rounded bg-secondary-bg px-[15px] py-2.5 text-[15px] leading-none text-primary-text shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
        sideOffset={5}
      >
        {content}
        <TooltipFct.Arrow className="fill-secbg-secondary-bg" />
      </TooltipFct.Content>
    </TooltipFct.Root>
  </TooltipFct.Provider>
);
