import type {Metadata} from "next";
import {Inter} from "next/font/google"
import {GeistMono} from 'geist/font/mono';
import "./globals.css";
import {Providers} from "@/components/providers/providers";
import React from "react";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter-sans',
});

export const metadata: Metadata = {
    title: "Pulse",
    description: "Collaboration and project management SaaS",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning
              className={`${inter.variable} ${GeistMono.variable} antialiased`}>
        <body>
        <NextIntlClientProvider messages={messages}>
            <Providers>
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
