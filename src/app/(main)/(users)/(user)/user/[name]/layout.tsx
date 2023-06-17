import Header from "@/app/components/Header/Header";
import { clerkClient } from "@clerk/nextjs";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const name = params.name;

  const [user] = await clerkClient.users.getUserList({ username: [name] });

  const title = user
    ? user.firstName || user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username
    : "Portfolio";

  return {
    title,
  };
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full flex-col">
      <Header />
      {children}
    </main>
  );
}
