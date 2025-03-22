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
      "px-4 py-2 transition duration-200 w-[100px] rounded focus:outline-1 text-primary-text text-md",
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
      className="w-5 h-5 animate-spin text-primary-text"
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

type BadgeButtonProps = {
  variant: ButtonVariant;
  size: "small" | "large";
  text: string;
  onClick: () => void;
};

export const BadgeButton: React.FC<BadgeButtonProps> = ({
  variant,
  size,
  text,
  onClick,
}) => (
  <span
    className={classNames(
      "inline-flex items-center px-3 rounded-md cursor-pointer text-primary-text",
      size === "large" ? "py-2 text-sm" : " py-1 text-xs",
      variant === "primary"
        ? "bg-accent hover:bg-accent-offset"
        : "bg-secondary-bg hover:bg-primary-bg",
    )}
    onClick={onClick}
  >
    {text}
  </span>
);

type BadgeButtonWithAutoTextUpdateProps = BadgeButtonProps & {
  postClickText: string;
};

export const BadgeButtonWithAutoTextUpdate: React.FC<
  BadgeButtonWithAutoTextUpdateProps
> = ({ postClickText, onClick, text: initialText, ...props }) => {
  const { onClickWithTextUpdate, buttonText } = useButtonTextUpdateOnClick({
    callback: onClick,
    initialText,
    postClickText,
  });

  return (
    <BadgeButton onClick={onClickWithTextUpdate} text={buttonText} {...props} />
  );
};
