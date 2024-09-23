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
import {useScopedI18n} from "@/locales/client";
import {IconBrandGoogle} from "justd-icons";
import {TextField} from "@/components/ui/text-field";
import {useSearchParams} from "next/navigation";
import login from "@/actions/login";
import {Note} from "@/components/ui/note"

const LoginForm = () => {
    const t = useScopedI18n('login')
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
            }).catch(() => setError("Something went wrong!"));
        });
    }

    return (
        <Card className="h-fit w-full select-none rounded-3xl md:w-[360px]">
            <Card.Header>
                <Card.Title className="text-2xl">{t("title")}</Card.Title>
                <Card.Description className="text-pretty">{t("description")}</Card.Description>
            </Card.Header>
            <Card.Content className="pb-4">
                <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        disabled={isPending}
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <TextField label="Email" type="email" className="w-full" validationBehavior="aria"
                                       placeholder="you@email.com" {...field} />
                        )}
                    />
                    <Controller
                        disabled={isPending}
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <TextField label={t("password")} type="password" className="w-full"
                                       validationBehavior="aria"
                                       placeholder="you@email.com" {...field} />
                        )}
                    />
                    <Button className="w-full">{t("mainBtn")}</Button>
                </Form>
                {success && (<Note intent="primary">{success}</Note>)}
                {(error || urlError) && (<Note intent="danger">{error || urlError}</Note>)}
            </Card.Content>
            <Separator/>
            <Card.Content className="flex flex-row items-center gap-x-4 p-4">
                <Button
                    className="flex-1"
                    appearance="outline">
                    <IconBrandGoogle className="mr-2 !size-5"/>
                    {t("googleBtn")}
                </Button>
            </Card.Content>
        </Card>
    )
}
export default LoginForm