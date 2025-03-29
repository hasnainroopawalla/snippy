import * as React from "react";
import type { ISnippet } from "../../types";
import { ViewerToolbar } from "./viewer-toolbar";
import { ContentViewer } from "./content-viewer";
import { SnippetMetadata } from "./snippet-metadata";
import { SnippetPasswordSection } from "./password-section";
import { isBlockedByPassword } from "./utils";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { BadgeWithIcon } from "../factory";

type ViewSnippetScreenProps = { snippet: ISnippet };

export const ViewSnippetScreen: React.FC<ViewSnippetScreenProps> = ({
  snippet,
}) => {
  const [passwordRequired, setPasswordRequired] = React.useState<boolean>(() =>
    isBlockedByPassword(snippet),
  );

  const onPasswordValidationSuccess = React.useCallback(
    () => setPasswordRequired(false),
    [],
  );

  return (
    <>
      {passwordRequired ? (
        <SnippetPasswordSection
          snippet={snippet}
          onPasswordValidationSuccess={onPasswordValidationSuccess}
        />
      ) : (
        <SnippetSection snippet={snippet} />
      )}
    </>
  );
};

type SnippetSectionProps = {
  snippet: ISnippet;
};

const SnippetSection: React.FC<SnippetSectionProps> = ({ snippet }) => {
  const contentViewerRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-8">
      <ViewerToolbar contentViewerRef={contentViewerRef} />
      <BadgeWithIcon
        color="green"
        text={snippet.privacy}
        IconSlot={<EyeOpenIcon />}
      />
      <div className="flex flex-col gap-3">
        <ContentViewer
          contentViewerRef={contentViewerRef}
          slug={snippet.slug}
          content={snippet.content}
        />
        <SnippetMetadata />
      </div>
    </div>
  );
};
