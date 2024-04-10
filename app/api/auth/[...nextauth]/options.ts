import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/youtube.readonly',
                    access_type: 'offline',
                    response_type: 'code',
                    include_granted_scopes: 'true',
                    prompt: 'consent'
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Dave", password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',  // Ensure jwt strategy is used
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        jwt: async ({ token, account }) => {
            if (account) {
                // Set access_token and id_token to the token payload
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
            }

            return token;
        },
        session: async ({ session, token }) => {
            return { ...session, token: token.accessToken, idToken: token.idToken };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}