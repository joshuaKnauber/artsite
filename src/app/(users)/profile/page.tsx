import { currentUser } from "@clerk/nextjs";

const getInvites = async () => {
  const inviteResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/invites`
  );
  const invites = await inviteResponse.json();
  return invites;
};

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) {
    throw new Error("No user");
  }

  const invites = await getInvites();
  console.log(invites);

  return (
    <main className="flex min-h-screen">
      <h1>Profile {user?.username || ""}</h1>
      {JSON.stringify(invites)}
    </main>
  );
}
