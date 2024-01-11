import { Client, Account } from "node-appwrite";

export const AppwriteSSClient = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT) // Your project ID
    .setKey(import.meta.env.APPWRITE_KEY) // Your secret API key
;

export const AppwriteSSAccount = new Account(AppwriteSSClient);
