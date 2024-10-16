"use client";

import {Breadcrumb, Breadcrumbs} from "@/components/ui/breadcrumbs";
import {usePathname} from "next/navigation";
import {
    ArrowLeftRightIcon,
    CalendarIcon,
    FileCheckIcon,
    FileTextIcon,
    FolderIcon,
    HouseIcon,
    MessageCircleIcon, MousePointerClickIcon,
    SquareIcon, UserCircleIcon, Users2Icon, WorkflowIcon
} from "lucide-react";
import {cn} from "@/lib/utils";
import {badgeStyles} from "@/components/ui/badge";

const getLeadIcon = (link: string) => {
    switch (link) {
        case "/":
            return HouseIcon
        case "/tasks":
            return FileTextIcon
        case "/projects":
            return FolderIcon
        case "/docs":
            return FileCheckIcon
        case "/schedule":
            return CalendarIcon
        case "/chat":
            return MessageCircleIcon
        case "/payments":
            return ArrowLeftRightIcon
        case "/customers":
            return UserCircleIcon
        case "/automations":
            return MousePointerClickIcon
        case "/workflow":
            return WorkflowIcon
        case "/users":
            return Users2Icon
        default:
            return SquareIcon
    }
}

export const AppBreadcrumb = () => {
    const paths = usePathname()
    const pathNames = paths === '/' ? [''] : paths.split('/').filter(paths => paths)

    return (
        <nav aria-label="Breadcrumbs" className="w-full border-b-2 border-muted-fg/40 px-16 py-4 dark:border-muted">
            <Breadcrumbs>
                {pathNames.map((value, index, {length}) => {
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`

                    if (index == 0) {
                        const IconComponent = getLeadIcon(`/${value}`);

                        if (index + 1 == length) {
                            return (
                                <Breadcrumb key={`breadcrumb-${index}`} className={cn(badgeStyles({intent: "secondary", shape: "square"}))}>
                                    <IconComponent className='size-4'/>
                                </Breadcrumb>
                            )
                        }
                        return (
                            <Breadcrumb key={`breadcrumb-${index}`} href={href} >
                                <IconComponent className='size-4 cursor-pointer'/>
                            </Breadcrumb>
                        );
                    }

                    if (index + 1 == length) {
                        return (
                            <Breadcrumb key={`breadcrumb-${index}`} className={cn(badgeStyles({intent: "secondary", shape: "square"}))}>
                                {value}
                            </Breadcrumb>
                        )
                    }

                    return (
                        <Breadcrumb key={`breadcrumb-${index}`} href={href} >
                            {value}
                        </Breadcrumb>
                    );
                })}
            </Breadcrumbs>
        </nav>
    )
}
