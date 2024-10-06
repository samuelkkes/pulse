import {Resend} from "resend";
import {getTranslations} from "next-intl/server";
import {ResetPassword} from "@/components/email/resetPassword";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const t = await getTranslations('mail.resetPassword')
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    const props = {
        btn: t("btn"),
        footer: t("footer"),
        p1: t("p1"),
        p2: t("p2"),
        p3: t("p3"),
        resetLink,
        title: t("title")
}

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: t("title"),
        react: ResetPassword(props),
    })
}

