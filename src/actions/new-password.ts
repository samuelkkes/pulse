"use server";

import {z} from "zod";
import {newPasswordSchema} from "@/schema";
import {getPasswordResetTokenByToken} from "@/data/password-reset-token";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import {getTranslations} from "next-intl/server";

export const newPassword = async (
    values: z.infer<typeof newPasswordSchema>,
    token?: string | null
) => {
    const t = await getTranslations("newVerification.server")
    if (!token) return {error:  t("exist")};

    const validateFields = newPasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: t('invalidFields')};
    }

    const {password} = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {error: t("invalidToken")};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {error: t("expired")};
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {error: t("email")};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            password: hashedPassword
        }
    });

    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    })

    return {success: t("passwordSuccess")};
}