import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
require('dot-env')

declare module "next-auth" {
    interface Session {
        token?: string;
    }
}

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.ClientID || "",
            clientSecret: process.env.ClientKey || "",
        }),
    ],
    pages: {
        signIn: '/Login',
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            if (typeof token.accessToken === "string") {
                session.token = token.accessToken;

            }
            return session
        }

    }
});

export { handler as GET, handler as POST };


