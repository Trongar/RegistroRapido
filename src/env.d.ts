/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_APPWRITE_ENDPOINT: string;
    readonly PUBLIC_APPWRITE_PROJECT: string;
    readonly APPWRITE_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }


declare namespace App {
  import { Models } from "appwrite";
  interface Locals {
    account: Models.User<Models.Preferences>;
  }
}