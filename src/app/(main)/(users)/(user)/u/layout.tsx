import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full">{children}</main>
  );
}
