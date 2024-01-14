import { sequence } from "astro:middleware";
import { auth } from "./auth.ts";
import { protectedRoutes } from "./protected-routes.ts";

export const onRequest = sequence(auth, protectedRoutes)