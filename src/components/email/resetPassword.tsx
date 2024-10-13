import React from 'react'
import {Button, Hr, Text,} from "@react-email/components";
import Layout from "@/components/email/layout";

interface IResetPassword {
    btn: string
    p1: string
    p2: string
    p3: string
    resetLink: string
    title: string
}

export const ResetPassword = async ({btn, p1, p2, p3, resetLink, title}: IResetPassword) => {
    return (
        <Layout title={title}>
            <Text className="text-left text-base text-slate-700" >
                {p1}
            </Text>
            <Button className="bg-brand block w-full rounded-md p-2.5 text-center text-base font-bold text-white no-underline" href={resetLink}>
                {btn}
            </Button>
            <Hr className="mx-0 my-5 border-slate-300"/>
            <Text className="text-left text-base text-slate-700" >
                {p2}
            </Text>
            <Text className="text-left text-base text-slate-700" >
                {p3}
            </Text>
        </Layout>
    )
}
