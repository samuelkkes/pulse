"use client";

import React from 'react'
import {Separator} from "@/components/ui/separator";
import {Popover} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {IconChevronRight, IconCirclePersonFill} from "justd-icons";
import {Card} from "@/components/ui/card";

const Sidebar = () => {
    return (
        <>
            <aside className="flex w-60 flex-col p-2">
                <Card className="flex h-full flex-col shadow drop-shadow">
                    <div className="flex-1">
                        <div className="w-full p-2 text-left text-lg">
                            Nexus
                        </div>
                        <Separator/>

                    </div>
                    <Separator/>
                    <div className="p-1">
                        <Popover>
                            <Button className="group flex w-full bg-secondary text-secondary-fg" size="extra-small"
                                    appearance="plain">
                                <IconCirclePersonFill className="mr-2 group-hover:text-primary"/>
                                <span className="flex-1">Samuel Kougbam</span>
                                <IconChevronRight className="ml-2"/>
                            </Button>
                            <Popover.Content className="min-w-80 drop-shadow-xl" showArrow={false} placement="right">
                                <Popover.Header>
                                    <Popover.Title>Email</Popover.Title>
                                    <Popover.Description>We&apos;ll send you an email to log in.</Popover.Description>
                                </Popover.Header>
                                <Popover.Footer>
                                    <Button>Send Login Link</Button>
                                </Popover.Footer>
                            </Popover.Content>
                        </Popover>
                    </div>
                </Card>
            </aside>
        </>
    )
}
export default Sidebar
