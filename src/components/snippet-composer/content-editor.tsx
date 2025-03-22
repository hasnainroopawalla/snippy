import * as React from "react";
import { Textarea, TextWithIcon } from "../factory";
import { Pencil2Icon } from "@radix-ui/react-icons";

type ContentEditorProps = {
  contentEditorRef: React.RefObject<HTMLTextAreaElement>;
};

export const ContentEditor: React.FC<ContentEditorProps> = ({
  contentEditorRef,
}) => (
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
  />
);
