/* eslint-disable */
/* @ts-ignore */
// @ts-nocheck



import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";


declare module "next-auth" {
    interface Session {
        token?: string;
    }
}

export const handler: NextApiHandler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.ClientID || "",
            clientSecret: process.env.ClientKey || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/Login',
        signOut: '/Login',
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.access_token = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (typeof token.access_token === "string") {
                session.token = token.access_token;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST }
