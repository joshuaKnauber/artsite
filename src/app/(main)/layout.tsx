import Header from "../components/Header/Header";

export const metadata = {
  title: "Home | Duet",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex w-full flex-col">{children}</main>
    </>
  );
}
