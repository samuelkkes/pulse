import React from 'react'
import Layout from "@/components/email/layout";
import {Button, Hr, Text} from "@react-email/components";

interface IWelcome {
    btn: string
    link: string
    p1: string
    p2: string
    p3: string
    p4: string
    p5: string
    title: string
}

const Welcome = ({btn, link, p1, p2, p3, p4, p5, title}: IWelcome) => {
    return (
        <Layout title={title}>
            <Text className="text-left text-base text-slate-700" >
                {p1}
            </Text>
            <Text className="text-left text-base text-slate-700" >
                {p2}
            </Text>
            <Text className="text-left text-base text-slate-700" >
                {p3}
            </Text>
            <Text className="text-left text-base text-slate-700" >
                {p4}
            </Text>
            <Button className="bg-brand block w-full rounded-md p-2.5 text-center text-base font-bold text-white no-underline" href={link}>
                {btn}
            </Button>
            <Hr className="mx-0 my-5 border-slate-300"/>
            <Text className="text-left text-base text-slate-700" >
                {p5}
            </Text>
        </Layout>
    )
}
export default Welcome
