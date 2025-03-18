import * as React from "react";

type ContentEditorProps = {
  contentRef: React.MutableRefObject<string>;
};

export const ContentEditor: React.FC<ContentEditorProps> = ({ contentRef }) => {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      contentRef.current = e.target.value;
    },
    [contentRef]
  );

  return (
    <div className="flex flex-col gap-2">
      <span className="text-secondary-text">Content</span>
      <textarea
        onChange={onChange}
        className="w-full h-[300px] p-2 tracking-wide rounded bg-secondary-bg text-primary-text focus:outline-accent focus:outline-1"
      />
    </div>
  );
};
