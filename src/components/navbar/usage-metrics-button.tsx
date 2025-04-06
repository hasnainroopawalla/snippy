import * as React from "react";
import { BarChartIcon } from "@radix-ui/react-icons";
import { IconButton, Popover } from "../factory";

type UsageMetricsButtonProps = {
  totalSnippetsCount: number;
};

export const UsageMetricsButton: React.FC<UsageMetricsButtonProps> = ({
  totalSnippetsCount,
}) => (
  <Popover
    TriggerSlot={
      <IconButton
        IconSlot={<BarChartIcon className="w-4 h-4 text-primary-text" />}
      />
    }
    ContentSlot={
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-primary-text">
          {toHumanReadableNumber(totalSnippetsCount)}
        </span>
        <span className="text-secondary-text">Snippets served</span>
      </div>
    }
  />
);

const toHumanReadableNumber = (num: number) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(num);
