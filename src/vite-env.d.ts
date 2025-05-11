/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK: string;
  readonly VITE_SIGNALR_SERVER_URL: string;
  readonly VITE_API_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
