import React from 'react'
import {getLocale} from "next-intl/server";

const Page = async () => {
    const locale = await getLocale()
    return (
        <div>{locale}</div>
    )
}
export default Page
