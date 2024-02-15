/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_APPWRITE_ENDPOINT: string;
  readonly PUBLIC_APPWRITE_PROJECT: string;
  readonly APPWRITE_KEY: string;

  readonly PUBLIC_APPWRITE_DATABASE_STORES: string;
  readonly PUBLIC_APPWRITE_COLLECTION_STORE: string;
  readonly PUBLIC_APPWRITE_COLLECTION_PRODUCT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


declare namespace App {
  import type { Models } from "appwrite";
  interface Locals {
    account: Models.User<Models.Preferences>;
  }
  // interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes
}

declare namespace astroHTML.JSX {
  interface InputHTMLAttributes {
    'datepicker'?: string
  }
} 