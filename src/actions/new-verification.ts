"use server";

import {getVerificationTokenByToken} from "@/data/verification-token";
import {getUserByEmail} from "@/data/user";
import {db} from "@/lib/db";
import {getTranslations} from "next-intl/server";

export const newVerification = async (token: string) => {
    const t = await getTranslations("newVerification.server")
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {error: t("exist")}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {error: t("expired")}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {error: t("email")};
    }

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where:  {id: existingToken.id}
    });

    return {succes: t("verificationSuccess")};
}
