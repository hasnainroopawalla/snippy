import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

console.log(`Generating from URL: ${process.env.VITE_SUPABASE_URL}`);

const config: CodegenConfig = {
  schema: [
    {
      [process.env.VITE_SUPABASE_URL as string]: {
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
    "src/graphql/": {
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
  //   hooks: {
  //     afterAllFileWrite: ["npm run prettier"], // optional
  //   },
};

export default config;
