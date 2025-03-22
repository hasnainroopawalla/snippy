import * as React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  HeaderTitleSlot?: React.ReactElement;
  HeaderButtonSlot?: React.ReactElement;
  textareaRef?: React.LegacyRef<HTMLTextAreaElement>;
};

export const Textarea: React.FC<TextareaProps> = ({
  HeaderTitleSlot,
  HeaderButtonSlot,
  readOnly,
  textareaRef,
  children,
  ...props
}) => (
  <div id="content-viewer-container" className="w-full rounded-md">
    <TextareaHeader TitleSlot={HeaderTitleSlot} ButtonSlot={HeaderButtonSlot} />
    <textarea
      readOnly={readOnly}
      className="w-full h-[150px] p-3 tracking-wide rounded-b-md field-sizing-content bg-secondary-bg text-primary-text focus:outline-none"
      ref={textareaRef}
      {...props}
    />
  </div>
);

type TextareaHeaderProps = {
  TitleSlot?: React.ReactElement;
  ButtonSlot?: React.ReactElement;
};

const TextareaHeader: React.FC<TextareaHeaderProps> = ({
  TitleSlot,
  ButtonSlot,
}) => (
  <div className="flex flex-row flex-wrap items-center justify-between gap-2 px-3 py-2 bg-secondary-bg-offset rounded-t-md">
    {TitleSlot}
    {ButtonSlot}
  </div>
);
