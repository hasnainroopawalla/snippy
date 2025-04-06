import * as React from "react";
import classNames from "classnames";
import { useButtonTextUpdateOnClick } from "./hooks";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant;
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
      "px-4 py-2 transition duration-200 w-[100px] rounded focus:outline-1 text-primary-button-text text-md",
      variant === "primary"
        ? "bg-accent hover:bg-accent-offset outline-accent-offset"
        : "bg-secondary-bg hover:bg-secondary-bg-offset outline-secondary-bg-offset",
      isLoading ? "opacity-50 disabled:pointer-events-none" : "cursor-pointer",
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
      className="w-6 h-6 animate-spin text-primary-button-text"
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

type CompactButtonProps = {
  variant: ButtonVariant;
  size: "small" | "large";
  text: string;
  onClick: () => void;
};

export const CompactButton: React.FC<CompactButtonProps> = ({
  variant,
  size,
  text,
  onClick,
}) => (
  <span
    className={classNames(
      "inline-flex items-center px-3 rounded-md cursor-pointer",
      size === "large" ? "py-2 text-sm" : " py-1 text-xs",
      variant === "primary"
        ? "bg-accent hover:bg-accent-offset text-primary-button-text"
        : "bg-secondary-bg hover:bg-primary-bg text-primary-text",
    )}
    onClick={onClick}
  >
    {text}
  </span>
);

type DynamicCompactButtonProps = CompactButtonProps & {
  postClickText: string;
};

export const DynamicCompactButton: React.FC<DynamicCompactButtonProps> = ({
  postClickText,
  onClick,
  text: initialText,
  ...props
}) => {
  const { onClickWithTextUpdate, buttonText } = useButtonTextUpdateOnClick({
    callback: onClick,
    initialText,
    postClickText,
  });

  return (
    <CompactButton
      onClick={onClickWithTextUpdate}
      text={buttonText}
      {...props}
    />
  );
};

type IconButtonProps = {
  onClick?: () => void;
  IconSlot: React.ReactElement;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  IconSlot,
}) => (
  <div
    data-testid="theme-switcher"
    className="p-2 rounded-lg cursor-pointer hover:bg-secondary-bg"
    onClick={onClick}
  >
    {IconSlot}
  </div>
);
