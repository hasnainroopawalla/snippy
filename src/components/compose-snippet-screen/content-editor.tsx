import * as React from "react";
import { CompactButton, Textarea, TextWithIcon } from "../factory";
import { Pencil2Icon } from "@radix-ui/react-icons";

type ContentEditorProps = {
  contentEditorRef: React.RefObject<HTMLTextAreaElement | null>;
};

export const ContentEditor: React.FC<ContentEditorProps> = ({
  contentEditorRef,
}) => {
  const onClear = React.useCallback(() => {
    if (contentEditorRef.current) {
      contentEditorRef.current.value = "";
    }
  }, [contentEditorRef]);

  return (
    <Textarea
      textareaRef={contentEditorRef}
      id="content-editor-textarea"
      placeholder="Paste or type here.."
      HeaderTitleSlot={
        <TextWithIcon
          TextSlot={<span className="font-mono text-md">Content</span>}
          IconSlot={<Pencil2Icon />}
          classNameOverrides="text-secondary-text"
        />
      }
      HeaderButtonSlot={
        <CompactButton
          variant="secondary"
          size="small"
          text="Clear"
          onClick={onClear}
        />
      }
    />
  );
};
