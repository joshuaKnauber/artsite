import { currentUser } from "@clerk/nextjs";
import { ClerkUser } from "@/types";
import InviteForm from "./components/InviteForm";

export default async function HomePage() {
  const user = (await currentUser()) as ClerkUser | null;

  if (!user) {
    return (
      <main className="flex min-h-screen">
        <h1>Discover (not signed in)</h1>
      </main>
    );
  }

  if (!user.publicMetadata.unlocked) {
    return (
      <main className="flex min-h-screen">
        <h1>Discover (not unlocked)</h1>
        <InviteForm />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen">
      <h1>Discover {JSON.stringify(user.publicMetadata.unlocked)}</h1>
    </main>
  );
}
