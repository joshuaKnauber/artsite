import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/u/(.*)",
    "/user/(.*)",
    "/a/(.*)",
    "/api/uploadthing",
    "/api/artworks/(.*)/comments",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
