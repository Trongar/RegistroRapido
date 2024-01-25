import { Account, Avatars, Client, Databases, ID, Query, Teams } from "appwrite";

export const SsrHostname:string = "localhost";
export const AppwriteHostname:string = "appwrite.trongar.site";

export const AppwriteEndpoint = import.meta.env.PUBLIC_APPWRITE_ENDPOINT;
export const AppwriteProject = import.meta.env.PUBLIC_APPWRITE_PROJECT;


const client = new Client();
client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject);

const account = new Account(client);
const avatars = new Avatars(client);
const teams = new Teams(client);
const databases = new Databases(client);

export const AppwriteService = {
  signOut: async () => {
    await account.deleteSession("current");
  },
  getAccount: async () => {
    return await account.get();
  },
  getAccountPicture: (name:string) => {
    return avatars
      .getInitials(name.split("").reverse().join(""), 256, 256)
      .toString();
  },
  setSession: (hash:string) => {
    const authCookies = {};
    authCookies["a_session_" + AppwriteProject] = hash;
    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
  },
  createID:  () => {
    return ID.unique();
  },
  getTeams: async () => {
    return await teams.list();
  },
  createTeam: async (id:string, name:string) => {
    return await teams.create(id, name);
  },
  getTeamMembers: async (teamId:string) => {
    return await teams.listMemberships(teamId);
  },
  createDocument: async (databaseId:string, collectionId:string, documentId:string, data: object) => {
    return await databases.createDocument(databaseId, collectionId, documentId, data)
  },
  getDocuments: async (databaseId:string, collectionId:string, filters?: Array<string>) => {
    return await databases.listDocuments(databaseId, collectionId, 
    filters
    );
  }
};