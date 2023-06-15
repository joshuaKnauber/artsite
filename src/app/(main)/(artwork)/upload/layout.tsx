import Header from "@/app/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload | Duet",
  robots: "noindex, nofollow",
};

export default function UploadLayout({
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
