/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_FORMSUBMIT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
