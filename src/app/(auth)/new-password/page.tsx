import React from 'react'
import {useTranslations} from "next-intl";
import AuthCardWrapper from "@/components/auth/authCardWrapper";

const Page = () => {
    const t = useTranslations('login')

    return (
        <AuthCardWrapper  title={t("title")} description={t("description")}>
            <div className="pb-5">
            </div>
        </AuthCardWrapper>
    )
}
export default Page
