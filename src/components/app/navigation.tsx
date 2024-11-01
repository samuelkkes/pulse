"use client";

import React, {ElementRef, useEffect, useRef, useState} from "react";
import {useMediaQuery} from "usehooks-ts";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {ChevronsLeft, MenuIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import { Popover } from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {IconChevronRight, IconTrophyFill} from "justd-icons";
import {signOut} from "next-auth/react";

const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");

    // const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse()
        }
    }, [isMobile, pathname]);

    /*const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }*/

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px",
            );

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("left", "0");
            navbarRef.current.style.setProperty("width", "100%");

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    return (
        <>
            <aside

                ref={sidebarRef}
                className={cn(
                    "overflow-x-hidden group/sidebar h-full overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div
                    role="button"
                    onClick={collapse}
                    className={cn(
                        "size-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 " +
                        "absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="size-6"/>
                </div>
                <div className="flex h-full flex-col">
                    <div className="flex-1"></div>
                    <Separator/>
                    <div className="p-1">
                        <Popover>
                            <Button className="group flex w-full bg-secondary text-secondary-fg" size="extra-small" appearance="plain">
                                <IconTrophyFill className="mr-2 group-hover:text-primary"/>
                                <span className="flex-1">Samuel Kougbam</span>
                                <IconChevronRight className="ml-2"/>
                            </Button>
                            <Popover.Content className="min-w-72" showArrow={false} placement="right">
                                <Popover.Header>
                                    <Popover.Title>Email</Popover.Title>
                                    <Popover.Description>We&apos;ll send you an email to log in.</Popover.Description>
                                </Popover.Header>
                                <Popover.Footer>
                                    <Button
                                        onPress={()=> signOut({
                                            redirect: true,
                                            redirectTo: "/home"
                                        })}
                                    >
                                        logout
                                    </Button>
                                </Popover.Footer>
                            </Popover.Content>
                        </Popover>
                    </div>
                </div>
                <div
                    /*onMouseDown={handleMouseDown}*/
                    onClick={resetWidth}
                    className="absolute right-0 top-0 h-full w-0.5 bg-muted-fg/30 opacity-50 transition group-hover/sidebar:opacity-100"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full",
                )}
            >
                <nav className="w-full bg-transparent px-3 py-2">
                    {isCollapsed &&
                        <MenuIcon onClick={resetWidth} role="button" className="size-6"/>}
                </nav>
            </div>
        </>
    )
}
export default Navigation
