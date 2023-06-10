import { User } from "@clerk/nextjs/dist/types/server";

export type PrivateUserMetadata = {};

export type PublicUserMetadata = {
  unlocked?: boolean;
};

export type ClerkUser = User & {
  privateMetadata: PrivateUserMetadata;
  publicMetadata: PublicUserMetadata;
};
