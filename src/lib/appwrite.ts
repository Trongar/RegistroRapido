import { Account, Avatars, Client, ID, Teams } from "appwrite";

export const SsrHostname:string = "localhost";
export const AppwriteHostname:string = "appwrite.trongar.site";

export const AppwriteEndpoint = import.meta.env.PUBLIC_APPWRITE_ENDPOINT;
export const AppwriteProject = import.meta.env.PUBLIC_APPWRITE_PROJECT;

const client = new Client();
client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject);

const account = new Account(client);
const avatars = new Avatars(client);
const teams = new Teams(client);

export const AppwriteService = {
  signOut: async () => {
    await account.deleteSession("current");
  },
  getAccount: async () => {
    return await account.get();
  },
  getAccountPicture: (name) => {
    return avatars
      .getInitials(name.split("").reverse().join(""), 256, 256)
      .toString();
  },
  setSession: (hash) => {
    const authCookies = {};
    authCookies["a_session_" + AppwriteProject] = hash;
    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
  },
  getTeams: async () => {
    return await teams.list();
  },
  createTeam: async (name) => {
    return await teams.create(ID.unique(), name);
  }
};