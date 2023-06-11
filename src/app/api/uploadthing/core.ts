import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const artworkFileRouter = {
  artworkImages: f({ image: { maxFileSize: "16MB", maxFileCount: 16 } })
    .middleware(async (req) => {
      const { userId } = getAuth(req);
      if (!userId) throw new Error("Unauthorized");

      return { userId: userId }; // on upload complete metadata
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type ArtworkFileRouter = typeof artworkFileRouter;
