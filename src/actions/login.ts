"use server";

import {loginSchema} from "@/schema";
import {z} from "zod";
import {getUserByEmail} from "@/data/user";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/../route";
import {AuthError} from "next-auth";
import {generateVerificationToken} from "@/lib/token";

const Login = async (values: z.infer<typeof loginSchema>, callbackUrl?: string | null) => {
    const validateFields = loginSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {email, password} = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "User does not exist!"};
    }

    if (!existingUser.emailVerified) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        /*await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );*/

        return {success: "Confirmation email sent!"};
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"};
                default:
                    return {error: "Something went wrong, please try again!"};
            }
        }
        throw error;
    }

}

export default Login;