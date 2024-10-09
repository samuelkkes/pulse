import {Resend} from "resend";
import {getTranslations} from "next-intl/server";
import {ResetPassword} from "@/components/email/resetPassword";
import Welcome from "@/components/email/welcome";
import Verification from "@/components/email/verification";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, name: string, token: string) => {
    const t = await getTranslations('mail.verification')
    const link = `${domain}/new-verification?token=${token}`;

    const props = {
        btn: t("btn"),
        p1: t("p1", {name}),
        p2: t("p2"),
        p3: t("p3"),
        link,
        title: t("title")
    }

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: t("title"),
        react: Verification(props)
    })
}

export const sendWelcomeEmail = async (email: string, mName: string, tName: string, token: string) => {
    const t = await getTranslations("mail.welcome");
    const link = `${domain}/new-user?token=${token}`;

    const props = {
        btn: t("btn"),
        p1: t("p1", {name: tName}),
        p2: t("p2", {name: mName}),
        p3: t("p3"),
        p4: t("p4"),
        p5: t("p5"),
        link,
        title: t("title")
    }

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: t("title"),
        react: Welcome(props),
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const t = await getTranslations('mail.resetPassword')
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    const props = {
        btn: t("btn"),
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

