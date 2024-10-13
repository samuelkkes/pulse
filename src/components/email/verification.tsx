import React from 'react'
import Layout from "@/components/email/layout";
import {Button, Text} from "@react-email/components";

interface IVerification {
    btn: string
    link: string
    p1: string
    p2: string
    p3: string
    title: string
}

const Verification = ({btn, link, p1, p2, p3,title}: IVerification) => {
    return (
        <Layout title={title}>
            <Text className="text-left text-base text-slate-700" >
                {p1}
            </Text>
            <Text className="text-left text-base text-slate-700" >
                {p2}
            </Text>
            <Button className="bg-brand block w-full rounded-md p-2.5 text-center text-base font-bold text-white no-underline" href={link}>
                {btn}
            </Button>
            <Text className="text-left text-base text-slate-700" >
                {p3}
            </Text>
        </Layout>
    )
}
export default Verification
