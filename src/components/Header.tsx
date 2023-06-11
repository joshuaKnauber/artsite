import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserProfile,
  UserButton,
  clerkClient,
  currentUser,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="sticky left-0 top-0 flex h-16 w-full flex-row items-center justify-between border-b border-b-white border-opacity-10 bg-bg-500">
      <Link href="/">D</Link>
      {user ? (
        <div className="flex flex-row items-center gap-4">
          <Link href="/upload">Upload</Link>
          <Link href="/profile">
            <img src={user.profileImageUrl} className="h-8 w-8 rounded-full" />
          </Link>
        </div>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
    </header>
  );
};

export default Header;
