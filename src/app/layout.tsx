import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import QueryProvider from "./components/QueryProvider";
import { Analytics } from "@vercel/analytics/react";

const outfit = localFont({
  src: "../fonts/Outfit-Variable.ttf",
});

export const metadata = {
  title: "Duet",
  description: "Share and discover digital art",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body
            className={`${outfit.className} overflow-x-hidden bg-bg-500 text-white`}
          >
            {children}
          </body>
          <Analytics />
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
