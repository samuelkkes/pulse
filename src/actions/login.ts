"use server";

import {loginSchema} from "@/schema";
import {z} from "zod";
import {getUserByEmail} from "@/data/user";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/../route";
import {AuthError} from "next-auth";
import {getTranslations} from "next-intl/server";
import {generatePasswordResetToken, generateVerificationToken} from "@/lib/token";
import {sendPasswordResetEmail, sendVerificationEmail} from "@/lib/mail";

const login = async (values: z.infer<typeof loginSchema>, callbackUrl?: string | null) => {
    const validateFields = loginSchema.safeParse(values);
    const t = await getTranslations('login.form.message')

    if (!validateFields.success) {
        return {error: t("invalid")};
    }

    const {email, password} = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return {error: t("ntExtUser")};
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            existingUser.name!,
            verificationToken.token,
        );

        return {success: t("cfEmail")};
    }

    if (existingUser && existingUser.email && !existingUser.password) {
        const passwordResetToken = await generatePasswordResetToken(email);

        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token
        )

        return {success: t("passEmail")};
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
                    return {error: t("invalidCr")};
                default:
                    return {error: t("error")};
            }
        }
        throw error;
    }

}

export default login;