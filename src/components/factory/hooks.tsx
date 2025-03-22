import * as React from "react";

/**
 * A hook that updates the text of the button after it has been clicked and
 * restores it after a timeout.
 */
export const useButtonTextUpdateOnClick = (props: {
  callback: () => void;
  initialText: string;
  postClickText: string;
  updateTimeoutInMs?: number;
}) => {
  const {
    callback,
    initialText,
    postClickText,
    updateTimeoutInMs = 3000,
  } = props;

  const [text, setText] = React.useState(initialText);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // cleanup timeout on unnmount
  React.useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    },
    [],
  );

  const onClickWithTextUpdate = React.useCallback(() => {
    if (timeoutRef.current) {
      return;
    }

    setText(postClickText);

    timeoutRef.current = setTimeout(() => {
      setText(text);
      timeoutRef.current = null;
    }, updateTimeoutInMs);

    callback();
  }, [callback, text, postClickText, updateTimeoutInMs]);

  return { onClickWithTextUpdate, buttonText: text };
};
