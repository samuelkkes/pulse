"use client";

import React from 'react'
import {buttonStyles} from "@/components/ui/button";
import Logo from "@/components/app/logo";
import {
    ArrowLeftRightIcon,
    CalendarIcon,
    FileCheckIcon,
    FileTextIcon,
    FolderIcon,
    HouseIcon,
    MessageCircleIcon,
    MousePointerClickIcon,
    UserCircleIcon,
    UsersIcon,
    WorkflowIcon
} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/app/user-button";

const sidebarNavLinks = [
    {
        label: "Home",
        link: "/",
        icon: HouseIcon
    },
    {
        label: "Tasks",
        link: "/tasks",
        icon: FileTextIcon
    },
    {
        label: "Projects",
        link: "/projects",
        icon: FolderIcon
    },
    {
        label: "Docs",
        link: "/docs",
        icon: FileCheckIcon
    },
    {
        label: "Schedule",
        link: "/schedule",
        icon: CalendarIcon
    },
    {
        label: "Chat",
        link: "/chat",
        icon: MessageCircleIcon
    },
    {
        label: "Payments",
        link: "/payments",
        icon: ArrowLeftRightIcon
    },
    {
        label: "Customers",
        link: "/customers",
        icon: UserCircleIcon
    },
    {
        label: "Automations",
        link: "/automations",
        icon: MousePointerClickIcon
    },
    {
        label: "Workflow",
        link: "/workflow",
        icon: WorkflowIcon
    },
    {
        label: "Users management",
        link: "/users",
        icon: UsersIcon
    }
]

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <>
            <aside className="flex w-56 flex-col pl-2 pt-4">
                <div className="flex h-full flex-col">
                    <div className="flex flex-1 flex-col gap-y-4">
                        <div className="ml-3">
                            <Logo size={28} link="/"/>
                        </div>
                        <UserButton/>
                        <nav className="flex flex-1 flex-col gap-y-2">
                            {
                                sidebarNavLinks.map((item, index) => {
                                    return (
                                        <Link key={`navLink-${index}`} href={item.link} className={cn(buttonStyles({
                                            size: "extra-small",
                                            appearance: pathname === item.link ? "solid" : "plain",
                                            intent: pathname === item.link ? "primary" : "secondary"
                                        }), "flex w-full")}>
                                            <item.icon className="mr-1 size-4"/>
                                            <span className="flex-1">{item.label}</span>
                                        </Link>
                                    )
                                })
                            }
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    )
}
export default Sidebar
