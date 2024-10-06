import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import Credentials from "@auth/core/providers/credentials";
import {db} from "@/lib/db";
import {loginSchema} from "@/schema";
import {getUserByEmail, getUserById} from "@/data/user";
import Google from "@auth/core/providers/google";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";

export const {
    handlers,
    auth,
    signIn,
    signOut,
    unstable_update
} = NextAuth({
    adapter: PrismaAdapter(db),
    callbacks: {
        async signIn({user, account}) {
            // Allow OAuth without email verification.
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            //Prevent SignIn without email verification.
            if (!existingUser?.emailVerified) {
                return false
            }

            /**/

            return true;
        },
        async session({session}) {
            if (!session.user) return session

            session.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                emailVerified: session.user.emailVerified,
                image: session.user.image,
                role: session.user.role
            }
            return session;
        },
        async jwt({ account, user, token }) {
            if (account?.provider === 'credentials') {
                const sessionToken = uuidv4()
                const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000)

                const session = await PrismaAdapter(db).createSession!({
                    userId: user.id!,
                    sessionToken,
                    expires,
                })
                token.sessionId = session.sessionToken
            }
            return token
        },
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            });
        },
        async signOut(message) {
            if ('session' in message && message.session?.sessionToken) {
                await db.session.deleteMany({
                    where: {
                        sessionToken: message.session.sessionToken,
                    },
                })
            }
        }
    },
    jwt: {
        async encode({ token }) {
            return token?.sessionId as unknown as string
        },
    },
    pages: {
        error: "/error",
        signIn: "/signin",
        signOut: '/home'
    },
    providers: [
        Google,
        Credentials({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(credentials) {
                const validateFields = loginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const {email, password} = validateFields.data;
                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordMatch) return user;
                }

                return null;
            }
        })
    ],
    session: {
        strategy: "database",
    },
    trustHost: true
})