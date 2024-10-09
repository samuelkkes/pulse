"use client";

import React, {useState, useTransition} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {Button, buttonStyles} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSearchParams} from "next/navigation";
import {useTranslations} from "next-intl";
import AuthCardWrapper from "@/components/auth/authCardWrapper";
import {Card} from "@/components/ui/card";
import {Form} from "@/components/ui/form";
import {TextField} from "@/components/ui/text-field";
import {Note} from "@/components/ui/note";
import {newPasswordSchema} from "@/schema";
import {newPassword} from "@/actions/new-password";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {twMerge} from "tailwind-merge";

export const NewPasswordForm = () => {
    const t = useTranslations("newPassword")
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    }

    return (
        <AuthCardWrapper title={t('title')} description="">
            <Card.Content className="pb-5">
                <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        disabled={isPending}
                        control={form.control}
                        name="password"
                        render={({field, fieldState}) => (
                            <TextField
                                label={t("password")}
                                type="password"
                                className="w-full"
                                validationBehavior="aria"
                                isDisabled={isPending}
                                isRequired
                                errorMessage={fieldState.error?.message}
                                isInvalid={fieldState.invalid}
                                {...field}
                            />
                        )}
                    />
                    <Button isDisabled={isPending} type="submit" className="w-full">
                        {t("btn")}
                    </Button>
                    {success && (<Note intent="primary">{success}</Note>)}
                    {error && (<Note intent="danger">{error}</Note>)}
                </Form>
            </Card.Content>
            <Separator/>
            <Card.Content className="flex flex-row items-center p-5 px-6">
                <Link
                    href="/signin"
                    className={twMerge(buttonStyles({intent: "secondary"}), "items-center transition-colors duration-150 flex-1")}
                >
                    <span>{t("signInBtn")}</span>
                </Link>
            </Card.Content>
        </AuthCardWrapper>
    )
}
