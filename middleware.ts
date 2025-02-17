import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/stores"
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
     await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Static файлуудыг хасаж, бүх хуудсуудыг хамгаална
    "/api/(.*)", // API замуудыг хамгаална
    "/trpc/(.*)",
  ],
};

