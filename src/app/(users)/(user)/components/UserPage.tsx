import db from "@/db";
import { eq } from "drizzle-orm";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import Link from "next/link";

type UserPageProps = {
  name: string;
};

const UserPage = async ({ name }: UserPageProps) => {
  const users = await clerkClient.users.getUserList({ username: [name] });
  if (users.length === 0) throw new Error("User not found");
  const user = users[0];

  const artworks = await db
    .select()
    .from(artworksTable)
    .where(eq(artworksTable.user_id, user.id));

  return (
    <main className="flex min-h-screen">
      <h1>User {user.firstName}</h1>
      {artworks.map((artwork) => (
        <Link key={artwork.id} href={`/a/${artwork.id}`}>
          {artwork.title}
        </Link>
      ))}
    </main>
  );
};

export default UserPage;
