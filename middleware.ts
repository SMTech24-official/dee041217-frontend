/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { varifyToken } from "./utils/verifyToken";
import { TUser } from "./redux/features/auth/authSlice";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token: any = cookieStore.get("token")?.value;
  const currentPath = request.nextUrl.pathname;

  // Allow access to the login page without authentication
  if (currentPath === "/login") {
    return NextResponse.next();
  }

  // Redirect to login if token is not present
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

const user = varifyToken(token) as TUser;

if (user.role === "USER" && currentPath.startsWith("/admin")) {
  return NextResponse.redirect(new URL("/not-authorized", request.url));
}

  if (user.role === "ADMIN" && currentPath.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }


  return NextResponse.next();
}

// "Matching Paths"
export const config = {
  matcher: ["/((?!login|forget-password|_next|api).*)"],
};
