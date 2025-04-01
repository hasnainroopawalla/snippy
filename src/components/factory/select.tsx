import * as React from "react";
import * as SelectFct from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import type { EnumToUnion, UnionOfValues } from "../../utils";

type ISelectItem = Record<string, string>;

type SelectProps<T extends ISelectItem> = {
  initialValue: EnumToUnion<T>;
  items: T;
  onItemSelect: (item: UnionOfValues<T>) => void;
  selectClassNameOverrides?: string;
  testId?: string;
};

const Select = <T extends ISelectItem>({
  items,
  onItemSelect,
  initialValue,
  selectClassNameOverrides,
  testId,
}: SelectProps<T>) => (
  <SelectFct.Root defaultValue={initialValue} onValueChange={onItemSelect}>
    <SelectFct.Trigger
      data-testid={`${testId}-button`}
      className={classNames(
        "h-[45px] flex flex-row justify-between text-md items-center gap-2 rounded bg-secondary-bg px-[15px] text-primary-text cursor-pointer focus:outline-accent focus:outline-1",
        selectClassNameOverrides,
      )}
    >
      <SelectFct.Value />
      <SelectFct.Icon className="text-primary-text">
        <ChevronDownIcon />
      </SelectFct.Icon>
    </SelectFct.Trigger>
    <SelectFct.Content className="overflow-hidden rounded-md bg-secondary-bg ring ring-secondary-bg-offset">
      <SelectFct.Viewport className="p-[7px]">
        <SelectFct.Group>
          {Object.entries(items).map(([value, text]) => (
            <SelectItem key={value} value={text} text={text} testId={testId} />
          ))}
        </SelectFct.Group>
      </SelectFct.Viewport>
    </SelectFct.Content>
  </SelectFct.Root>
);

type SelectItemProps = {
  value: string;
  text: string;
  testId?: string;
};

const SelectItem: React.FC<SelectItemProps> = ({ value, text, testId }) => (
  <SelectFct.Item
    value={value}
    className={
      "relative flex h-[25px] select-none items-center rounded p-4 text-md text-primary-text leading-none data-[highlighted]:bg-secondary-bg-offset data-[highlighted]:outline-none cursor-pointer"
    }
  >
    <SelectFct.ItemText>
      <span data-testid={`${testId}-label-${value}`}>{text}</span>
    </SelectFct.ItemText>
  </SelectFct.Item>
);

type SelectWithLabelProps<T extends ISelectItem> = SelectProps<T> & {
  label: string;
};

export const SelectWithLabel = <T extends ISelectItem>(
  props: SelectWithLabelProps<T>,
) => (
  <div className="flex flex-col gap-2">
    <span
      data-testid={`${props.testId}-label`}
      className="flex flex-row items-center gap-3 text-secondary-text"
    >
      {props.label}
    </span>
    <Select {...props} />
  </div>
);
