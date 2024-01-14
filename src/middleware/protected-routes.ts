import { defineMiddleware } from "astro:middleware";
export const protectedRoutes = defineMiddleware(
  async (context, next) =>{
    // context.url.pathname
    // make a middleware that checks the url and if it is a protected route, it checks if the user is logged in
    // if the user is logged in, it continues
    const publicRoutes = [
        "/",
        "/auth",
        "/auth/login",
    ];

    const url = context.url.pathname;

    if (publicRoutes.includes(url)) {
        return next();
    }

    if (context.locals.account) {
        return next();
    }

    return Response.redirect(new URL("/auth", context.url), 302);

  })