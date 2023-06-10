import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="sticky left-0 top-0 flex w-full flex-row items-center justify-between bg-slate-300">
            <Link href="/">Duet Art</Link>
            <UserButton afterSignOutUrl="/" />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
