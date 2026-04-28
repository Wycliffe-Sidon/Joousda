import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import authConfig from "@/auth.config";
import { db } from "@/db";
import { ensureDatabase } from "@/db/init";
import { admins } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ensureDatabase();

        const email = String(credentials.email ?? "").trim().toLowerCase();
        const password = String(credentials.password ?? "");

        const admin = await db.query.admins.findFirst({
          where: eq(admins.email, email),
        });

        if (!admin) return null;

        const valid = bcrypt.compareSync(password, admin.passwordHash);
        if (!valid) return null;

        return {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
});
