"use client";

import React from 'react'
import {Card} from "@/components/ui/card";
import {Loader} from "@/components/ui/loader";

const Loading = () => {
    return (
        <Card className="h-fit w-full select-none rounded-3xl md:w-[360px]">
            <Card.Content className="px-6 py-5">
                <div className="flex size-full items-center justify-center">
                    <Loader intent="primary" size="medium" variant="spin"/>
                </div>
            </Card.Content>
        </Card>
    )
}
export default Loading
