import { AppwriteProject, AppwriteService } from "@lib/appwrite";
import { defineMiddleware } from "astro:middleware";
export const auth = defineMiddleware(
  async (context, next) => {


    const sessionNames = [
      "a_session_" + AppwriteProject.toLowerCase(),
      "a_session_" + AppwriteProject.toLowerCase() + "_legacy",
    ];

    const hash =
      context.cookies.get(sessionNames[0])?.value ||
      context.cookies.get(sessionNames[1])?.value ||
      "";

    AppwriteService.setSession(hash);

    let account: Awaited<ReturnType<typeof AppwriteService.getAccount>>;
    try {
      account = await AppwriteService.getAccount();
      context.locals.account = account;
    } catch (err) {

      account = null;
      context.locals.account = null;
    }
    const response = await next();
    return response;

  }
)
