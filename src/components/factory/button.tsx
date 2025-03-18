import * as React from "react";
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
  isLoading?: boolean; // New prop for loading state
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  isLoading,
  children,
  ...props
}) => (
  <button
    className={classNames(
      "px-4 py-2 transition duration-200 w-[100px] rounded focus:outline-1 text-primary-text text-md",
      variant === "primary"
        ? "bg-accent hover:bg-accent-hover outline-accent-hover"
        : "bg-secondary-bg hover:bg-hover outline-hover",
      isLoading ? "opacity-50 disabled:pointer-events-none" : "cursor-pointer"
    )}
    disabled={isLoading}
    {...props}
  >
    {isLoading ? <ButtonSpinner /> : children}
  </button>
);

const ButtonSpinner = () => (
  <span className="flex items-center justify-center">
    <svg
      className="animate-spin h-5 w-5 text-primary-text"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </span>
);
