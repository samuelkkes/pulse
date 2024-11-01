"use client";

import {Popover} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";
import {useRef, useState} from "react";
import {IconCheck, IconCircleHalf} from "justd-icons";
import {useTranslations} from "next-intl";

const NavbarThemeSwitch = () => {
    const t = useTranslations('theme');
    const [open, setOpen] = useState(false);
    const {theme, setTheme} = useTheme();
    const triggerRef = useRef(null);

    const changeTheme = (newTheme: "light" | "dark" | "system") => {
        setTheme(newTheme);
        setTimeout(() => setOpen(false), 300);
    }

    return (
        <Popover>
            <Button ref={triggerRef} onPress={() => setOpen(true)} size="square-petite" appearance="plain"
                    className="text-muted-fg hover:bg-secondary/20 hover:text-fg">
                <IconCircleHalf className="size-4"/>
            </Button>
            <Popover.Content
                showArrow={false}
                isOpen={open}
                onOpenChange={setOpen}
                placement="bottom"
                triggerRef={triggerRef}
                className="border-muted-fg/20 bg-bg/50">
                <div className="flex w-full flex-row justify-between gap-x-2 py-2 text-muted-fg">
                    <div role="button" onClick={() => changeTheme("light")}
                         className="group flex cursor-pointer flex-col items-center space-y-2">
                        <div
                            className={cn("relative pt-4 pl-4 bg-white w-20 h-14 rounded-md overflow-hidden border", theme === "light" && "ring-2 ring-offset-2 ring-offset-bg ring-primary")}>
                            <div className="relative h-14 w-20 rounded border-2 border-muted-fg/50">
                                <span className="absolute left-1.5 top-1 font-mono text-xs text-black">Aa</span>
                            </div>
                            {theme === "light" && (
                                <div className="absolute bottom-1 right-1 rounded-full bg-primary p-px">
                                    <IconCheck className="size-3 text-primary-fg"/>
                                </div>
                            )}
                        </div>
                        <span
                            className="text-xs transition-colors duration-300 ease-in-out group-hover:text-fg">{t("light")}</span>
                    </div>
                    <div role="button" onClick={() => changeTheme("dark")}
                         className="group flex cursor-pointer flex-col items-center space-y-2">
                        <div
                            className={cn("relative pt-4 pl-4 bg-stone-600 w-20 h-14 rounded-md overflow-hidden border", theme === "dark" && "ring-2 ring-offset-2 ring-offset-bg ring-primary")}>
                            <div className="relative h-14 w-20 rounded bg-stone-950">
                                <span className="absolute left-1.5 top-1 font-mono text-xs text-white">Aa</span>
                            </div>
                            {theme === "dark" && (
                                <div className="absolute bottom-1 right-1 rounded-full bg-primary p-px">
                                    <IconCheck className="size-3 text-primary-fg"/>
                                </div>
                            )}
                        </div>
                        <span
                            className="text-xs transition-colors duration-300 ease-in-out group-hover:text-fg">{t("dark")}</span>
                    </div>
                    <div role="button" onClick={() => changeTheme("system")}
                         className="group flex cursor-pointer flex-col items-center space-y-2">
                        <div
                            className={cn("relative w-20 h-14 rounded-md overflow-hidden border flex flex-row", theme === "system" && "ring-2 ring-offset-2 ring-offset-bg ring-primary")}>
                            <div className="h-14 w-20 flex-1 overflow-hidden bg-white pl-2 pt-4">
                                <div className="relative h-16 w-20 rounded border-2 border-muted-fg/50">
                                    <span className="absolute left-1.5 top-1 font-mono text-xs text-black">Aa</span>
                                </div>
                            </div>
                            <div className="h-16 flex-1 overflow-hidden bg-stone-600 pl-2 pt-4">
                                <div className="relative h-16 w-20 rounded bg-stone-950">
                                    <span className="absolute left-[8px] top-1 font-mono text-xs text-white">Aa</span>
                                </div>
                            </div>
                            {theme === "system" && (
                                <div className="absolute bottom-1 right-1 rounded-full bg-primary p-px">
                                    <IconCheck className="size-3 text-primary-fg"/>
                                </div>
                            )}
                        </div>
                        <span
                            className="text-xs transition-colors duration-300 ease-in-out group-hover:text-fg">{t("system")}</span>
                    </div>
                </div>
            </Popover.Content>
        </Popover>
    )
}
export default NavbarThemeSwitch;