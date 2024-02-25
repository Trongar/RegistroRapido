import { AppwriteProject, AppwriteService } from "@lib/appwrite";
import type { Models } from "appwrite";
import { defineMiddleware } from "astro:middleware";
import { publicRoutes } from "./protected-routes";
export const sessionNames = [
  "a_session_" + AppwriteProject.toLowerCase(),
  "a_session_" + AppwriteProject.toLowerCase() + "_legacy",
];
export const auth = defineMiddleware(
  async ({ cookies, locals, url }, next) => {



    const startTime = Date.now();


    const hash =
      cookies.get(sessionNames[0])?.value ||
      cookies.get(sessionNames[1])?.value ||
      "";

    AppwriteService.setSession(hash);

    const accountCookie = cookies.get("account")?.value

    let account: Models.User<Models.Preferences>;
    if (accountCookie) account = JSON.parse(accountCookie)
    if (account) {
      locals.account = account
    }
    if (!account && publicRoutes.includes(url.pathname)) {
      try {
        account = await AppwriteService.getAccount();
        cookies.set("account", JSON.stringify(account))
        locals.account = account;
      } catch (err) {
        cookies.delete("account")
        locals.account = undefined;
      }
    }
    const executionTime = Date.now() - startTime;
    console.log('Middleware Auth:', executionTime, 'ms');

    const response = await next();
    return response;

  }
)
