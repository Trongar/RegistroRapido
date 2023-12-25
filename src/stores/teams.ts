import { atom } from "nanostores";
import { appwriteTeams } from "@lib/appwrite";

export type TeamsItems = Awaited<ReturnType<typeof appwriteTeams.list>>;

export const teamsItems = atom<TeamsItems>({ teams: [], total: 0 });
