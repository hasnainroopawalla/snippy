/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const APP_VERSION: string;
