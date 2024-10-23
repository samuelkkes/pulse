"use client";

import {Menu} from "@/components/ui/menu";
import { buttonStyles} from "@/components/ui/button";
import {ChevronsUpDownIcon, LogOutIcon, SettingsIcon, UserIcon, UserPlusIcon, UsersRoundIcon} from "lucide-react";
import {signOut} from "next-auth/react";
import {useCurrentUser} from "@/hooks/use-current-user"
import {cn} from "@/lib/utils";
import {Loader} from "@/components/ui/loader";
import {Logo} from "@/components/app/logo";

export const UserButton = () => {
    const {user, status} = useCurrentUser();

    if (status == "loading") {
        return (
            <div className={cn(buttonStyles({appearance:"solid", intent:"secondary"}),"flex w-full !px-1")}>
                <Loader variant="spin"/>
            </div>
        )
    }

    return (
        <Menu>
            <Menu.Trigger className={cn(buttonStyles({appearance:"solid", intent:"secondary", size: "large"}),"flex w-full")}>
                <span className="flex flex-1 gap-x-1">
                    <Logo/>
                    <span className="flex flex-col justify-center gap-y-0.5 text-xs">
                        <span className="truncate font-mono text-sm font-semibold">Pulse</span>
                        <span className="truncate text-xs text-muted-fg/30">Enterprise</span>
                    </span>
                </span>
                <ChevronsUpDownIcon className="ml-2 size-4"/>
            </Menu.Trigger>
            <Menu.Content className="w-[216px]" showArrow={false} placement="bottom start" containerPadding={8}>
                <Menu.Section>
                    <Menu.Header separator>
                        <div className="block truncate">{user?.name}</div>
                        <div className="truncate font-normal text-muted-fg">{user?.email}</div>
                    </Menu.Header>
                </Menu.Section>
                <Menu.Item>
                    <UserIcon className="size-4"/>
                    <span className="text-xs">View Profile</span>
                    <Menu.Keyboard keys="⌘P"/>
                </Menu.Item>
                <Menu.Item>
                    <SettingsIcon className="size-4"/>
                    <span className="text-xs">Account setting</span>
                    <Menu.Keyboard keys="⌘A"/>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item>
                    <UsersRoundIcon className="size-4"/>
                    <span className="text-xs">Teams</span>
                    <Menu.Keyboard keys="⌘T"/>
                </Menu.Item>
                <Menu.Item>
                    <UserPlusIcon className="size-4"/>
                    <span className="text-xs">Invite colleagues</span>
                    <Menu.Keyboard keys="⌘I"/>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item onAction={() => signOut({
                    redirect: true,
                    redirectTo: "/home"
                })}
                >
                    <LogOutIcon className="size-4"/>
                    <span className="text-xs">Logout</span>
                    <Menu.Keyboard keys="⌘L"/>
                </Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
