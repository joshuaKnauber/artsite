import Header from "@/app/components/Header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ProfileLayout({
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