"use client";

import React from 'react'
import {Card} from "@/components/ui/card";

interface IAuthCardProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

const AuthCardWrapper = ({children, title, description}:IAuthCardProps) => {
    return (
        <Card className="h-fit w-full select-none rounded-3xl md:w-[360px]">
            <Card.Header>
                <Card.Title className="text-2xl">{title}</Card.Title>
                <Card.Description className="text-pretty">{description}</Card.Description>
            </Card.Header>
            {children}
        </Card>
    )
}
export default AuthCardWrapper
