import {
  AppwriteEndpoint,
  AppwriteHostname,
  AppwriteProject,
  SsrHostname,
} from "@lib/appwrite";
import * as setCookie from "set-cookie-parser";

import type { APIRoute, AstroCookieSetOptions } from "astro";


export const POST: APIRoute = async ({ cookies }) => {
  const response = await fetch(
    `${AppwriteEndpoint}/account/sessions/anonymous`,
    {
      method: "POST",
      headers: {
        "x-appwrite-project": AppwriteProject,
      },
    }
  );


  const json = await response.json();

  if (json.code >= 400) {
    return new Response(JSON.stringify({ message: json.message }))
  }
  const ssrHostname =
    SsrHostname === "localhost" ? SsrHostname : "." + SsrHostname;
  const appwriteHostname =
    AppwriteHostname === "localhost"
      ? AppwriteHostname
      : "." + AppwriteHostname;

  const cookiesStr = (response.headers.get("set-cookie") ?? "")
    .split(appwriteHostname)
    .join(ssrHostname);

  const cookiesArray = setCookie.splitCookiesString(cookiesStr);

  const cookiesParsed = cookiesArray.map((cookie) =>
    setCookie.parseString(cookie)
  );

  for (const cookie of cookiesParsed) {

    cookies.set(cookie.name, cookie.value, {
      domain: cookie.domain,
      secure: cookie.secure,
      sameSite: cookie.sameSite as AstroCookieSetOptions["sameSite"],
      path: cookie.path,
      maxAge: cookie.maxAge,
      httpOnly: cookie.httpOnly,
      expires: cookie.expires,
    });
  }

  return new Response(JSON.stringify({ json }))
}