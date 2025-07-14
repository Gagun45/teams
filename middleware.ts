import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { authRoutesPrefix, protectedRoutes } from "./lib/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const isLogged = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = pathname.startsWith(authRoutesPrefix);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isAuthRoute && isLogged)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  if (isProtectedRoute && !isLogged)
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
