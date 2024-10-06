import React from 'react'
import {Body, Button, Container, Head, Hr, Html, Preview, Section, Tailwind, Text,} from "@react-email/components";

interface IResetPassword {
    btn: string
    p1: string
    p2: string
    p3: string
    footer: string
    resetLink: string
    title: string
}

export const ResetPassword = ({btn, footer, p1, p2, p3, resetLink, title}: IResetPassword) => {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            brand: "#0d6dfc",
                        },
                    },
                },
            }}
        >
            <Html>
                <Head/>
                <Preview>{title}</Preview>
                <Body style={main}>
                    <Container className="mx-auto my-0 mb-16 rounded-lg bg-white px-0 pb-16 pt-5">
                        <Section className="px-12 py-0">
                            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                            <Text className="text-brand text-left font-mono text-lg font-bold" >Pulse</Text>
                            <Hr className="mx-0 my-5 border-slate-300"/>
                            <Text className="text-left text-base text-slate-700" >
                                {p1}
                            </Text>
                            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
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
                            <Text className="text-left text-base text-slate-700" >{footer}</Text>
                            <Hr className="mx-0 my-5 border-slate-300"/>
                            <Text className="text-xs text-slate-500">
                                Pulse, 354 Oyster Point Blvd, South San Francisco, CA 94080
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}

const main = {
    backgroundColor: "#d8edff",
    padding: "32px 0",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
