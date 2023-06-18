import UserPage from "../../components/UserPage/UserPage";
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

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;

  return <UserPage name={name} />;
}
