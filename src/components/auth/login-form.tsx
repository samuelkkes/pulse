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
import {InputOTP} from "@/components/ui/input-otp";
import {useScopedI18n} from "@/locales/client";
import {IconBrandGoogle} from "justd-icons";
import {TextField} from "@/components/ui/text-field";

const LoginForm = () => {
    const t = useScopedI18n('login')

    const [isPending, startTransition] = useTransition();
    const [showTwoFactor, ] = useState(false);
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = () => {
        startTransition(() => {
        })
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
                            <TextField label="Email" type="email"  className="w-full" placeholder="you@email.com" {...field} />
                        )}
                    />
                    {showTwoFactor && (
                        <Controller
                            disabled={isPending}
                            control={form.control}
                            name="code"
                            render={({field}) => (
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTP.Group className="flex-1">
                                        <InputOTP.Slot className="flex-1" index={0}/>
                                        <InputOTP.Slot className="flex-1" index={1}/>
                                        <InputOTP.Slot className="flex-1" index={2}/>
                                    </InputOTP.Group>
                                    <InputOTP.Separator/>
                                    <InputOTP.Group className="flex-1">
                                        <InputOTP.Slot className="flex-1" index={3}/>
                                        <InputOTP.Slot className="flex-1" index={4}/>
                                        <InputOTP.Slot className="flex-1" index={5}/>
                                    </InputOTP.Group>
                                </InputOTP>
                            )}
                        />
                    )}
                    <Button className="w-full" size="small">{t("mainBtn")}</Button>
                </Form>
            </Card.Content>
            <Separator />
            <Card.Content className="flex flex-row items-center gap-x-4 p-4">
                <Button
                    className="flex-1"
                    size="small"
                    appearance="outline">
                    <IconBrandGoogle className="mr-2 size-4"/>
                    {t("googleBtn")}
                </Button>
            </Card.Content>
        </Card>
    )
}
export default LoginForm