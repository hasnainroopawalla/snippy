import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";
import * as fs from "fs";

const graphqlPath = "src/graphql/generated/";

console.log(`Generating from URL: ${process.env.VITE_SUPABASE_DATA_URL}`);

/* Export types from generated/graphql for easier imports in the project */
const exportGraphqlTypesFromGeneratedIndex = () => {
  const path = `${graphqlPath}index.ts`;
  const content = '\nexport * from "./graphql";';
  fs.appendFileSync(path, content);
  console.log(`GraphQL types exported from ${path} successfully`);
};

const config: CodegenConfig = {
  schema: [
    {
      [process.env.VITE_SUPABASE_DATA_URL as string]: {
        headers: {
          apiKey: process.env.VITE_SUPABASE_API_KEY as string,
        },
      },
    },
  ],
  documents: "src/**/*.{ts,tsx}",
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    [graphqlPath]: {
      preset: "client",
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: "string",
          Date: "string",
          Time: "string",
          Datetime: "string",
          JSON: "string",
          BigInt: "string",
          BigFloat: "string",
          Opaque: "any",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: [exportGraphqlTypesFromGeneratedIndex],
  },
};

export default config;
