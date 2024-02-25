import { AppwriteService } from "@lib/appwrite";
import { defineMiddleware } from "astro:middleware";
export const signOut = defineMiddleware(
  async ({ url, cookies }, next) => {
    const startTime = Date.now();

    // context.url.pathname
    // make a middleware that checks the url and if it is a protected route, it checks if the user is logged in
    // if the user is logged in, it continues
    const signOutRoute = "/account/signout"

    const { pathname } = url;
    if (signOutRoute === pathname) {
      await AppwriteService.signOut().catch(() => { })
      cookies.delete("account");
      const executionTime = Date.now() - startTime;
      console.log('Middleware SignOut:', executionTime, 'ms');
    }
    return next();


  })