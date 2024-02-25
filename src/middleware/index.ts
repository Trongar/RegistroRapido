import { sequence } from "astro:middleware";
import { auth } from "./auth.ts";
import { protectedRoutes } from "./protected-routes.ts";
import { signOut } from "./signOut.ts";
export const onRequest = sequence(signOut, auth, protectedRoutes)