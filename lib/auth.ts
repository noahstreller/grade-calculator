import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";

export const config = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID || "",
      clientSecret: process.env.DISCORD_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.uid = token.sub as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  const session = getServerSession(...args, config);
  return session;
}