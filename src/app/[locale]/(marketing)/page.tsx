import React from 'react'

const Page = async ({params: {locale}}: { params: { locale: string } }) => {

    return (
        <div>{locale}</div>
    )
}
export default Page
