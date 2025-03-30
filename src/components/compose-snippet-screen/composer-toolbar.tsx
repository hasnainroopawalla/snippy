import * as React from "react";
import { InputWithLabel, SelectWithLabel } from "../factory";
import { SnippetValidity, SnippetPrivacy } from "../../types";
import {
  RealTimeSnippetValidityBadge,
  SnippetPrivacyBadge,
} from "../snippet-info-badges";

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
          items={SnippetValidity}
          selectClassNameOverrides={"w-[150px]"}
          onItemSelect={onSelectValidity}
          initialValue={validity}
        />
        <SelectWithLabel
          label="Privacy"
          items={SnippetPrivacy}
          selectClassNameOverrides={"w-[120px]"}
          onItemSelect={onSelectPrivacy}
          initialValue={privacy}
        />
        {privacy !== SnippetPrivacy.Public && (
          <InputWithLabel
            inputRef={passwordRef}
            onChange={onChangePassword}
            label="Password"
            type="password"
          />
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <RealTimeSnippetValidityBadge validity={validity} />
        <SnippetPrivacyBadge privacy={privacy} />
      </div>
    </div>
  );
};
