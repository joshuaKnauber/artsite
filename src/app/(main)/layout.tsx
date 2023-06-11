import "@uploadthing/react/styles.css";
import Header from "@/app/components/Header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full">{children}</main>
    </>
  );
}
