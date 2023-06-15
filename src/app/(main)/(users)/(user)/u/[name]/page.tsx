import { Suspense } from "react";
import UserPage from "../../../components/UserPage/UserPage";
import UserPageFallback from "../../../components/UserPage/UserPageFallback";

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <Suspense fallback={<UserPageFallback />}>
      <UserPage name={name} minimal={true} />
    </Suspense>
  );
}
