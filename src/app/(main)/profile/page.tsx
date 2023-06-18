import { currentUser } from "@clerk/nextjs";
import ProfileForm from "./components/ProfileForm";

const getInvites = async () => {
  return [];
};

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) {
    throw new Error("No user");
  }

  const invites = await getInvites();

  return (
    <>
      <ProfileForm
        invites={invites}
        metadata={user.publicMetadata}
        username={user.username || ""}
      />
    </>
  );
}
