/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_APPWRITE_ENDPOINT: string;
    readonly PUBLIC_APPWRITE_PROJECT: string;
    readonly APPWRITE_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }