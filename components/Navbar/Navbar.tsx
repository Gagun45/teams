import Link from "next/link";
import { auth } from "@/lib/auth";
import UserButton from "./UserButton/UserButton";

const Navbar = async () => {
  const session = await auth();
  return (
    <header>
      <Link href={"/"} className="font-bold tracking-widest text-6xl">
        Teams
      </Link>
      <Link href={"/all-teams"}>All</Link>
      <Link href={"/teams/new"}>CreateTeam</Link>
      <Link href={"/teams/own-teams"}>Own</Link>

      {session?.user ? <UserButton /> : <Link href={"/auth/login"}>Login</Link>}
    </header>
  );
};
export default Navbar;
