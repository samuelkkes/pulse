"use client";

import {Card} from "@/components/ui/card";
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
        <Card className="h-fit w-full select-none rounded-3xl md:w-[360px]">
            <Card.Content className="px-6 py-5">
                <div className="flex w-full items-center justify-center">
                    {!success && !error && (
                        <Loader intent="primary" size="medium" variant="spin"/>
                    )}
                    {success && (<Note className="my-0 w-full" intent="primary">{success}</Note>)}
                    {(error ) && (<Note className="my-0 w-full" intent="danger">{error}</Note>)}
                </div>
            </Card.Content>
            {(success || error) && (
                <>
                    {/*TODO: Add a slide down animation to the card content once the function on submit complete*/}
                    <Separator/>
                    <Card.Content className="flex flex-row items-center p-5 px-6">
                        <Link
                            href="/signin"
                            className={twMerge(buttonStyles({intent: "secondary"}), "items-center transition-colors duration-150 flex-1 group")}
                        >
                            <IconArrowLeft className="mr-1 size-6 transition-all duration-150 group-hover:!mr-1.5" />
                            <span>{t("btn")}</span>
                        </Link>
                    </Card.Content>
                </>
            )}
        </Card>
    )
}
export default NewVerificationForm
