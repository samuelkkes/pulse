import React from 'react'
import {Body, Container, Head, Hr, Html, Preview, Section, Tailwind, Text} from "@react-email/components";
import {getTranslations} from "next-intl/server";

interface ILayout {
    title: string;
    children: React.ReactNode;
}

const Layout = async ({title, children}: ILayout) => {
    const t = await getTranslations("mail");
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
                            <Text className="text-brand text-left font-mono text-lg font-bold">Pulse</Text>
                            <Hr className="mx-0 my-5 border-slate-300"/>
                            {children}
                            <Hr className="mx-0 my-5 border-slate-300"/>
                            <Text className="text-xs text-slate-500">
                                {t("footer")}
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}
export default Layout;

const main = {
    backgroundColor: "#d8edff",
    padding: "32px 0",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
