import * as React from "react";
import classNames from "classnames";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: React.RefObject<HTMLInputElement>;
  classNameOverrides?: string;
};

export const Input: React.FC<InputProps> = ({
  inputRef: ref,
  classNameOverrides,
  children,
  ...props
}) => (
  <input
    ref={ref}
    className={classNames(
      "h-[45px] w-[150px] flex flex-row justify-between text-md items-center gap-2 rounded bg-secondary-bg px-[15px] text-primary-text focus:outline-accent focus:outline-1",
      classNameOverrides,
    )}
    {...props}
  />
);

type InputWithLabelProps = InputProps & {
  label: string;
};

export const InputWithLabel = (props: InputWithLabelProps) => (
  <div className="flex flex-col gap-2">
    <span className="text-secondary-text">{props.label}</span>
    <Input {...props} />
  </div>
);
