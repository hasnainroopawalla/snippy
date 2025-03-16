import * as React from "react";
import * as SelectFct from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const Select = () => (
  <SelectFct.Root defaultValue="10">
    <SelectFct.Trigger className="inline-flex h-[45px] text-md items-center justify-center gap-2 rounded bg-secondary-bg px-[15px] text-primary-text outline-none cursor-pointer">
      <SelectFct.Value />
      <SelectFct.Icon className="text-primary-text">
        <ChevronDownIcon />
      </SelectFct.Icon>
    </SelectFct.Trigger>
    <SelectFct.Content className="overflow-hidden bg-secondary-bg rounded-md ring ring-hover">
      <SelectFct.Viewport className="p-[7px]">
        <SelectFct.Group>
          <SelectItem value="10" text="10 minutes" />
          <SelectItem value="60" text="1 hour" />
        </SelectFct.Group>
      </SelectFct.Viewport>
    </SelectFct.Content>
  </SelectFct.Root>
);

type SelectItemProps = {
  value: string;
  text: string;
};

const SelectItem: React.FC<SelectItemProps> = ({ value, text }) => (
  <SelectFct.Item
    value={value}
    className={
      "relative flex h-[25px] select-none items-center rounded p-4 text-md text-primary-text leading-none data-[highlighted]:bg-hover data-[highlighted]:outline-none cursor-pointer"
    }
  >
    <SelectFct.ItemText>{text}</SelectFct.ItemText>
  </SelectFct.Item>
);

type SelectWithLabelProps = {
  label: string;
};

export const SelectWithLabel: React.FC<SelectWithLabelProps> = ({ label }) => (
  <div className="flex flex-col gap-2">
    <span className="text-primary-text">{label}</span>
    <Select />
  </div>
);
