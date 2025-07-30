/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD: string;
  readonly VITE_MT_EDIT_BUTTONS_ENABLED: string;
  // add more custom env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
