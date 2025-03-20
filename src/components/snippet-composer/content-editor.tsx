import * as React from "react";

type ContentEditorProps = {
  contentEditorRef: React.RefObject<HTMLTextAreaElement>;
};

export const ContentEditor: React.FC<ContentEditorProps> = ({
  contentEditorRef,
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-secondary-text">Content</span>
    <textarea
      ref={contentEditorRef}
      placeholder="Paste or type here.."
      className="w-full h-[150px] p-2 tracking-wide rounded bg-secondary-bg text-primary-text focus:outline-accent focus:outline-1"
    />
  </div>
);
