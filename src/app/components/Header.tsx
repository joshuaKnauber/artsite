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
    <header className="sticky left-0 top-0 z-40 flex h-header w-full flex-row items-center justify-between border-b border-b-white border-opacity-10 bg-bg-500 px-4 md:px-8">
      <div className="flex flex-row items-center gap-4">
        <Link href="/">Duet</Link>
        <span className="flex h-5 flex-col justify-center rounded-md border border-blue-500 bg-blue-800 bg-opacity-10 px-2 text-xs leading-none text-blue-500">
          BETA
        </span>
      </div>
      {user ? (
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/upload"
            className="flex h-8 flex-row items-center rounded-full border border-white border-opacity-0 px-5 text-sm font-medium leading-none transition-all"
          >
            Upload
          </Link>
          <Link href={`/user/${user.username}`}>
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
