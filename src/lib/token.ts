"use server";

import {v4 as uuidV4} from "uuid";
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";
import {getPasswordResetTokenByEmail} from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); //1 hour

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    return db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });
}

export const generatePasswordResetToken = async (email:string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 600 * 1000); //10 minutes

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    return db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
}