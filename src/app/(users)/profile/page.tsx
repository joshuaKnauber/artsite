import { currentUser } from "@clerk/nextjs";

const getInvites = async () => {
  return [];
};

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) {
    throw new Error("No user");
  }

  const invites = await getInvites();
  console.log(invites);

  return (
    <main className="flex">
      <h1>Profile {user?.username || ""}</h1>
      {JSON.stringify(invites)}
    </main>
  );
}
