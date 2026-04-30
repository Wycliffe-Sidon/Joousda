import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Force Node.js runtime instead of Edge
export const runtime = "nodejs";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
