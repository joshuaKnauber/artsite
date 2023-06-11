import db from "@/db";
import { desc, eq } from "drizzle-orm";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "@/app/components/ArtworkCard";
import Link from "next/link";

type UserPageProps = {
  name: string;
  minimal?: boolean;
};

const UserPage = async ({ name, minimal }: UserPageProps) => {
  const users = await clerkClient.users.getUserList({ username: [name] });
  if (users.length === 0) throw new Error("User not found");
  const user = users[0];

  const artworks = await db.query.artworks.findMany({
    with: { images: true },
    where: eq(artworksTable.user_id, user.id),
    columns: { id: true, title: true, user_id: true },
    orderBy: desc(artworksTable.created_at),
  });

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-4 md:flex-row md:gap-8 md:px-0 md:py-0">
      <div
        className={`w-full md:sticky md:left-0 md:h-[calc(100vh-4rem)] md:w-[400px] ${
          minimal ? "md:top-0" : "md:top-16"
        }`}
      >
        <h1>User {user.firstName}</h1>
        {!minimal && <Link href={`/u/${user.username}`}>Minimal</Link>}
      </div>
      <div className="md:flex-grow md:bg-bg-400 md:px-8 md:py-8">
        <ArtworkGrid>
          {artworks.map((artwork) => (
            <ArtworkCard
              id={artwork.id}
              key={artwork.id}
              thumbnailKey={artwork.images[0]?.key || ""}
            />
          ))}
        </ArtworkGrid>
      </div>
    </div>
  );
};

export default UserPage;
