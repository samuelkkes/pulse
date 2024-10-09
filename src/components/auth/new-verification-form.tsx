"use client";

import {Card} from "@/components/ui/card";
import AuthCardWrapper from "@/components/auth/authCardWrapper";
import React, {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {newVerification} from "@/actions/new-verification";
import {Note} from "@/components/ui/note";
import {Loader} from "@/components/ui/loader";
import { buttonStyles} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {twMerge} from "tailwind-merge";
import {useTranslations} from "next-intl";
import {IconArrowLeft} from "justd-icons";

const NewVerificationForm = () => {
    const t = useTranslations("newVerification")
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError(t("missing"));
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data?.succes);
                setError(data?.error);
            })
            .catch(() => {
                setError(t("error"));
            });
    }, [t, token]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit]);
    
    return (
        <AuthCardWrapper title={t("title")} description={t("description")}>
            <Card.Content className="pb-5">
                <div className="flex w-full items-center justify-center">
                    {!success && !error && (
                        <Loader />
                    )}
                    {success && (<Note className="w-full" intent="primary">{success}</Note>)}
                    {(error ) && (<Note className="w-full" intent="danger">{error}</Note>)}
                </div>
            </Card.Content>
            <Separator/>
            <Card.Content className="flex flex-row items-center p-5 px-6">
                <Link
                    href="/signin"
                    className={twMerge(buttonStyles({intent: "secondary"}), "flex-1 transition-colors duration-150 group")}
                >
                    <IconArrowLeft className="ml-2 size-6 transition-all duration-150 group-hover:!mr-2.5" />
                    <span>{t("btn")}</span>
                </Link>
            </Card.Content>
        </AuthCardWrapper>
    )
}
export default NewVerificationForm
