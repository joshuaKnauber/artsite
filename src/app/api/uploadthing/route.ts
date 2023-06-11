import { createNextRouteHandler } from "uploadthing/next";

import { artworkFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: artworkFileRouter,
});
