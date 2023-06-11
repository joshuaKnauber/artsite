import "./globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import Header from "@/components/Header";

const outfit = localFont({
  src: "../fonts/Outfit-Variable.ttf",
});

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
        <body className={`${outfit.className} bg-bg-500 text-white`}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
