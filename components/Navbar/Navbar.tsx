import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <Link href={"/"} className="font-bold tracking-widest text-6xl">
        Teams
      </Link>
      <Link href={'/protected'}>Protected</Link>
      <Link href={'/auth/login'}>Login</Link>
    </header>
  );
};
export default Navbar;
