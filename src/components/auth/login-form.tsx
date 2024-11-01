"use client";

import React, {useState, useTransition} from 'react'
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/schema";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Card} from "@/components/ui/card";
import {IconBrandGoogle} from "justd-icons";
import {TextField} from "@/components/ui/text-field";
import {useSearchParams} from "next/navigation";
import login from "@/actions/login";
import {Note} from "@/components/ui/note"
import {signIn} from "next-auth/react";
import {useTranslations} from "next-intl";
import AuthCardWrapper from "@/components/auth/authCardWrapper";
import { Loader } from "@/components/ui/loader"

const LoginForm = () => {
    const t = useTranslations('login')
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
            }).catch(() => setError(t("form.message.error")));
        });
    }

    return (
        <AuthCardWrapper title={t("title")} description={t("description")}>
            <Card.Content className="pb-5">
                <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        control={form.control}
                        name="email"
                        disabled={isPending}
                        render={({field, fieldState}) => (
                            <TextField
                                label="Email"
                                type="email"
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
                        {isPending && <Loader className="mr-4" variant="spin" />}
                        <span>{isPending ? t("mainBtn.loading") : t("mainBtn.default")}</span>
                    </Button>
                </Form>
                {success && (<Note intent="primary">{success}</Note>)}
                {(error || urlError) && (<Note intent="danger">{error || urlError}</Note>)}
            </Card.Content>
            <Separator/>
            <Card.Content className="flex flex-row items-center p-5 px-6">
                <Button
                    isDisabled={isPending}
                    onPress={() => signIn('google')}
                    className="flex-1 transition-colors duration-150"
                    intent="secondary">
                    <IconBrandGoogle className="mr-2 !size-5 transition-colors duration-150"/>
                    {t("googleBtn")}
                </Button>
            </Card.Content>
        </AuthCardWrapper>
    )
}
export default LoginForm