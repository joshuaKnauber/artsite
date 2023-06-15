import { User } from "@clerk/nextjs/dist/types/server";

export type PrivateUserMetadata = {
  invites: string[];
};

export type PublicUserMetadata = {
  unlocked?: boolean;
  location?: string;
  bio?: string;
  twitter?: string;
  instagram?: string;
  for_hire?: boolean;
};

export type ClerkUser = User & {
  privateMetadata: PrivateUserMetadata;
  publicMetadata: PublicUserMetadata;
};
