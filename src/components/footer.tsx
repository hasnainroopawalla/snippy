import * as React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { TextWithIcon } from "./factory";
import { config } from "../config";

export const Footer: React.FC = () => (
  <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-sm text-primary-text">
    <TextWithIcon
      TextSlot={
        <span>
          hasnainroopawalla/snippy
          <span className="text-secondary-text"> • v{APP_VERSION}</span>
        </span>
      }
      IconSlot={<GitHubLogoIcon />}
      classNameOverrides="cursor-pointer"
      onClick={() => window.open(config.githubRepoUrl, "_blank")}
    />
  </div>
);
