import classNames from "classnames";
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
};

export const Button: React.FC<ButtonProps> = props => (
  <button
    className={classNames(
      "px-4 py-2 transition duration-200 w-[100px] rounded cursor-pointer focus:outline-1 text-primary-text text-md",
      props.variant === "primary"
        ? "bg-accent hover:bg-accent-hover outline-accent-hover"
        : "bg-secondary-bg hover:bg-hover outline-hover"
    )}
    {...props}
  />
);
