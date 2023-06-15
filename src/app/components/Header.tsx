import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="sticky left-0 top-0 z-40 flex h-header w-full flex-row items-center justify-between border-b border-b-white border-opacity-10 bg-bg-500 px-4 md:px-8">
      <div className="flex flex-row items-center gap-4">
        <Link className="font-semibold leading-none" href="/">
          Duet
        </Link>
        <span className="flex h-5 flex-col justify-center rounded-md border border-blue-200 bg-blue-800 bg-opacity-10 px-2 text-xs leading-none text-blue-200">
          BETA
        </span>
      </div>
      {user ? (
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/upload"
            className="flex h-8 flex-row items-center rounded-full border border-blue-400 bg-blue-900 bg-opacity-10 px-5 text-sm font-medium leading-none text-blue-400 transition-all md:hover:bg-opacity-30"
          >
            Upload
          </Link>
          <Link href={`/user/${user.username}`}>
            <img src={user.profileImageUrl} className="h-8 w-8 rounded-full" />
          </Link>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className="flex h-8 flex-row items-center rounded-full border border-zinc-200 bg-zinc-600 bg-opacity-10 px-5 text-sm font-medium leading-none text-zinc-200 transition-all md:hover:bg-opacity-30"
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
