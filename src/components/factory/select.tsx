import * as React from "react";
import * as SelectFct from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type ISelectItem = { [key: string]: string };

type SelectProps<T extends ISelectItem> = {
  initialValue: keyof T;
  items: T;
  onItemSelect: (item: keyof T) => void;
};

const Select = <T extends ISelectItem>({
  items,
  onItemSelect,
  initialValue,
}: SelectProps<T>) => (
  <SelectFct.Root
    defaultValue={initialValue.toString()}
    onValueChange={onItemSelect}
  >
    <SelectFct.Trigger className="w-[150px] h-[45px] flex flex-row justify-between text-md items-center gap-2 rounded bg-secondary-bg px-[15px] text-primary-text cursor-pointer focus:outline-accent focus:outline-1">
      <SelectFct.Value />
      <SelectFct.Icon className="text-primary-text">
        <ChevronDownIcon />
      </SelectFct.Icon>
    </SelectFct.Trigger>
    <SelectFct.Content className="overflow-hidden rounded-md bg-secondary-bg ring ring-hover">
      <SelectFct.Viewport className="p-[7px]">
        <SelectFct.Group>
          {Object.entries(items).map(([value, text]) => (
            <SelectItem key={value} value={value} text={text} />
          ))}
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

type SelectWithLabelProps<T extends ISelectItem> = SelectProps<T> & {
  label: string;
};

export const SelectWithLabel = <T extends ISelectItem>(
  props: SelectWithLabelProps<T>,
) => (
  <div className="flex flex-col gap-2">
    <span className="text-secondary-text">{props.label}</span>
    <Select {...props} />
  </div>
);
