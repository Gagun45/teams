import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware() {});
