import UserPage from "../../../components/UserPage/UserPage";

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;

  return <UserPage name={name} minimal={true} />;
}
