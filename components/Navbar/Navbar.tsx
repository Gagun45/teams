import Link from "next/link";
import { auth } from "@/lib/auth";
import LogoutButton from "@/app/auth/_components/LogoutButton";

const Navbar = async () => {
  const session = await auth();
  return (
    <header>
      <Link href={"/"} className="font-bold tracking-widest text-6xl">
        Teams
      </Link>
      <Link href={"/protected"}>Protected</Link>

      {session?.user ? (
        <LogoutButton />
      ) : (
        <Link href={"/auth/login"}>Login</Link>
      )}
    </header>
  );
};
export default Navbar;
