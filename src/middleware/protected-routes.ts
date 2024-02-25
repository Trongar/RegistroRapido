import { defineMiddleware } from "astro:middleware";
export const publicRoutes = [
  "/",
  "/auth",
  "/auth/login/email",
  "/account/signout"
];
export const protectedRoutes = defineMiddleware(
  async (context, next) => {
    const startTime = Date.now();

    // context.url.pathname
    // make a middleware that checks the url and if it is a protected route, it checks if the user is logged in
    // if the user is logged in, it continues

    const url = context.url.pathname;

    if (publicRoutes.includes(url)) {
      const executionTime = Date.now() - startTime;
      console.log('Middleware Public:', executionTime, 'ms');
      return next();
    }

    if (context.locals.account) {
      const executionTime = Date.now() - startTime;
      console.log('Middleware Protected:', executionTime, 'ms');
      return next();
    }

    return Response.redirect(new URL("/auth", context.url), 302);

  })