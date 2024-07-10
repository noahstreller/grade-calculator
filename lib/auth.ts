import { db } from "@/db";
import {
  getRefreshTokenFromDb,
  saveRefreshTokenIntoDb,
} from "@/lib/repositories/user-repo";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession, NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";

export const config = {
  adapter: DrizzleAdapter(db) as Adapter,
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    verifyRequest: "/login/sent",
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID || "",
      clientSecret: process.env.DISCORD_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    EmailProvider({
      server: process.env.SMTP_SERVER || "",
      from: process.env.SMTP_FROM || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    {
      id: "local",
      name: "Local",
      type: "oauth",
      wellKnown:
        process.env.NEXT_PUBLIC_MOCK_OAUTH_WELLKNOWN_URL ||
        "http://localhost:8080/default/.well-known/openid-configuration",
      clientId: "mock",
      clientSecret: "mock",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          email: `${profile.sub}@nstr.dev`,
          image: undefined,
        };
      },
    },
    ...(process.env.NEXT_PUBLIC_CUSTOM_OAUTH_NAME &&
    process.env.CUSTOM_OAUTH_SECRET &&
    process.env.CUSTOM_OAUTH_CLIENT_ID &&
    process.env.CUSTOM_OAUTH_WELLKNOWN_URL
      ? [
          {
            id: "custom",
            name: process.env.NEXT_PUBLIC_CUSTOM_OAUTH_NAME,
            type: "oauth",
            wellKnown: process.env.CUSTOM_OAUTH_WELLKNOWN_URL,
            clientId: process.env.CUSTOM_OAUTH_CLIENT_ID,
            clientSecret: process.env.CUSTOM_OAUTH_SECRET,
            profile(profile) {
              console.log(profile);
              return {
                id: profile.sub,
                name: profile.name ?? profile.sub,
                email: profile.email ?? `${profile.sub}@nstr.local`,
                image: undefined,
              };
            },
          } as Provider,
        ]
      : []),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.uid = token.sub as string;
      }
      return session;
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        token.uid = user.id;
      }

      if (account && user) {
        if (account.refresh_token) {
          token.refreshToken = account.refresh_token;
          await saveRefreshTokenIntoDb(
            user.id,
            account.refresh_token as string
          );
        }
      } else {
        const refreshToken = await getRefreshTokenFromDb(token.sub as string);
        if (refreshToken) token.refreshToken = refreshToken;
      }

      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
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
