import type { productFormSchema } from "@schemas/product";
import type { storeFormSchema } from "@schemas/store";
import { Account, Avatars, Client, Databases, ID, Query, Teams, type Models } from "appwrite";
import type { Output } from "valibot";

export const SsrHostname: string = import.meta.env.PUBLIC_SSR_HOSTNAME;
export const AppwriteHostname: string = import.meta.env.PUBLIC_APPWRITE_HOSTNAME;

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
    await account.get()
    await AppwriteService.setPrefs({ stores: (await AppwriteService.getStores()).documents })
    return await account.get()

  },
  getAccountPicture: (name: string) => {
    return avatars
      .getInitials(name.split("").reverse().join(""), 256, 256)
      .toString();
  },
  setPrefs: async (prefs: Partial<Models.Preferences>) => {
    account.updatePrefs(
      prefs
    )
  },
  setSession: (hash: string) => {
    const authCookies = {};
    authCookies["a_session_" + AppwriteProject] = hash;
    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
  },
  createID: () => {
    return ID.unique();
  },
  getTeams: async () => {
    return await teams.list();
  },
  createTeam: async (id: string, name: string) => {
    return await teams.create(id, name);
  },
  updateTeam: async (id: string, name: string) => {
    return await teams.updateName(id, name);
  },
  deleteTeam: async (id: string) => {
    return await teams.delete(id);
  },
  getTeamMembers: async (teamId: string) => {
    return await teams.listMemberships(teamId);
  },
  createDocument: async (databaseId: string, collectionId: string, documentId: string, data: object) => {
    return await databases.createDocument(databaseId, collectionId, documentId, data)
  },
  updateDocument: async (databaseId: string, collectionId: string, documentId: string, data: object) => {
    return await databases.updateDocument(databaseId, collectionId, documentId, data)
  },
  deleteDocument: async (databaseId: string, collectionId: string, documentId: string) => {
    return await databases.deleteDocument(databaseId, collectionId, documentId)
  },
  getDocument: async (databaseId: string, collectionId: string, documentId: string) => {
    return await databases.getDocument(databaseId, collectionId, documentId)
  },
  getDocuments: async (databaseId: string, collectionId: string, filters?: Array<string>) => {
    return await databases.listDocuments(databaseId, collectionId,
      filters
    );
  },
  getStores: async () => {
    let startTime = Date.now();

    const teamsIds = (await AppwriteService.getTeams()).teams.map(team => team.$id)

    console.log('teams:', Date.now() - startTime, 'ms');
    startTime = Date.now();
    const res = await AppwriteService.getDocuments(
      import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
      import.meta.env.PUBLIC_APPWRITE_COLLECTION_STORE,
      !(teamsIds.length > 0) ? []
        : [Query.equal("$id", teamsIds)]
    )
    console.log('stores:', Date.now() - startTime, 'ms');
    return res
  },
  getStore: async (id: string) => {
    return await AppwriteService.getDocument(
      import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
      import.meta.env.PUBLIC_APPWRITE_COLLECTION_STORE,
      id
    )
  },
  updateStore: async (id: string, data: Output<typeof storeFormSchema>) => {
    await AppwriteService.updateTeam(id, data.name)
    await AppwriteService.updateDocument(
      import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
      import.meta.env.PUBLIC_APPWRITE_COLLECTION_STORE,
      id,
      data
    )
  },
  createProduct: async (id: string, data: Output<typeof productFormSchema>) => {
    await AppwriteService.createDocument(
      import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
      import.meta.env.PUBLIC_APPWRITE_COLLECTION_PRODUCT,
      id,
      data
    )
  },
  getProducts: async (offset = 0, limit = 10, storeId: string) => {
    return await AppwriteService.getDocuments(
      import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
      import.meta.env.PUBLIC_APPWRITE_COLLECTION_PRODUCT,
      [
        Query.offset(offset),
        Query.equal("storeId", storeId),
        Query.limit(limit),
      ]
    )
  },
  deleteProduct: async (id: string) => {
    return await AppwriteService.deleteDocument(
      import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
      import.meta.env.PUBLIC_APPWRITE_COLLECTION_PRODUCT,
      id,
    );
  },

  updateProduct: async (id: string, data: Output<typeof productFormSchema>) => {
    await AppwriteService.updateDocument(
      import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
      import.meta.env.PUBLIC_APPWRITE_COLLECTION_PRODUCT,
      id,
      data
    )
  },

};