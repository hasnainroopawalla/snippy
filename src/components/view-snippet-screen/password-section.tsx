import * as React from "react";
import { FileTextIcon, LockClosedIcon } from "@radix-ui/react-icons";
import type { ISnippet } from "../../types";
import {
  TextWithIcon,
  BadgeWithIcon,
  InputWithLabel,
  Button,
} from "../factory";
import { useServices } from "../../contexts";

type SnippetPasswordSection = {
  snippet: ISnippet;
  onPasswordValidationSuccess: (rawPassword: string) => void;
};

export const SnippetPasswordSection: React.FC<SnippetPasswordSection> = ({
  snippet,
  onPasswordValidationSuccess,
}) => {
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const { cryptoService } = useServices();

  const validateAndSubmit = React.useCallback(() => {
    if (
      passwordRef.current &&
      snippet.passwordHash &&
      cryptoService.comparePasswordHash(
        snippet.passwordHash,
        passwordRef.current.value,
      )
    ) {
      onPasswordValidationSuccess(passwordRef.current.value);
    }
  }, [onPasswordValidationSuccess, snippet.passwordHash, cryptoService]);

  return (
    <div className="flex flex-col flex-wrap gap-8">
      <div className="flex flex-row flex-wrap gap-6">
        <TextWithIcon
          TextSlot={<span className="font-mono text-md">{snippet.slug}</span>}
          IconSlot={<FileTextIcon />}
          classNameOverrides="text-primary-text"
        />
        <BadgeWithIcon
          color="orange"
          text={snippet.privacy}
          IconSlot={<LockClosedIcon />}
        />
      </div>
      <InputWithLabel
        inputRef={passwordRef}
        label="Password"
        type="password"
        classNameOverrides="w-[250px]"
      />
      <Button variant="primary" onClick={validateAndSubmit} isLoading={false}>
        Submit
      </Button>
    </div>
  );
};
