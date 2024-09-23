import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import Credentials from "@auth/core/providers/credentials";
import {db} from "@/lib/db";
import {loginSchema} from "@/schema";
import {getUserByEmail, getUserById, isUserAManager} from "@/data/user";
import Google from "@auth/core/providers/google";
import bcrypt from "bcryptjs";

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
            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async session({session, user}) {

            if (session.user) {
                session.user.id = user.id
                session.user.name = user.name;
                session.user.email = user.email!;
            }

            const isManager = await isUserAManager(user.id);

            if(isManager) {
                session.user.isManager = isManager;
            }

            return session;
        },
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            });
        }
    },
    pages: {
        signIn: "/signin",
        error: "/error"
    },
    providers: [
        Google,
        Credentials({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(credentials, req) {
                const validateFields = loginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const {email, password} = validateFields.data;
                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!passwordMatch) return user;
                }

                return null;
            }
        })
    ],
    session: {
        strategy: "database",
    }
})