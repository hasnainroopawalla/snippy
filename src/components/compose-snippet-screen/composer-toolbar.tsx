import * as React from "react";
import { InputWithLabel, SelectWithLabel } from "../factory";
import {
  SnippetValidity,
  SNIPPET_VALIDITY_OPTIONS,
  SNIPPET_PRIVACY_OPTIONS,
  SnippetPrivacy,
} from "../../types";
import { SnippetInfoPanel } from "./snippet-info-panel";

type ComposerToolbarProps = {
  validityRef: React.MutableRefObject<SnippetValidity>;
  privacyRef: React.MutableRefObject<SnippetPrivacy>;
  passwordRef: React.RefObject<HTMLInputElement>;
};

export const ComposerToolbar: React.FC<ComposerToolbarProps> = ({
  validityRef,
  privacyRef,
  passwordRef,
}) => {
  const [validity, setValidity] = React.useState(validityRef.current);
  const [privacy, setPrivacy] = React.useState(privacyRef.current);
  const [password, setPassword] = React.useState(
    passwordRef.current?.value || "",
  );

  const onSelectValidity = React.useCallback(
    (validity: SnippetValidity) => {
      setValidity(validity);
      validityRef.current = validity;
    },
    [validityRef],
  );

  const onSelectPrivacy = React.useCallback(
    (privacy: SnippetPrivacy) => {
      setPrivacy(privacy);
      privacyRef.current = privacy;
    },
    [privacyRef],
  );

  const onChangePassword = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <div className="flex flex-row flex-wrap gap-4">
        <SelectWithLabel
          label="Validity"
          items={SNIPPET_VALIDITY_OPTIONS}
          selectClassNameOverrides={"w-[150px]"}
          onItemSelect={onSelectValidity}
          initialValue={validity}
        />
        <SelectWithLabel
          label="Privacy"
          items={SNIPPET_PRIVACY_OPTIONS}
          selectClassNameOverrides={"w-[120px]"}
          onItemSelect={onSelectPrivacy}
          initialValue={privacy}
        />
        {privacy !== "public" && (
          <InputWithLabel
            inputRef={passwordRef}
            onChange={onChangePassword}
            label="Password"
            type="password"
          />
        )}
      </div>
      <SnippetInfoPanel validity={validity} privacy={privacy} />
    </div>
  );
};
