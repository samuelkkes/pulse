"use client";

import {Menu} from "@/components/ui/menu";
import { buttonStyles} from "@/components/ui/button";
import { LogOutIcon, SettingsIcon, UserIcon, UserPlusIcon, UsersRoundIcon} from "lucide-react";
import {signOut} from "next-auth/react";
import {useCurrentUser} from "@/hooks/use-current-user";
import {Avatar} from "@/components/ui/avatar";
import {cn, getInitials} from "@/lib/utils";

export const UserButton = () => {
    const {user} = useCurrentUser();

    return (
        <Menu>
            <Menu.Trigger className={cn(buttonStyles({appearance:"solid", intent:"secondary"}),"flex w-full !px-1")}>
                <span className="flex flex-1 items-center gap-x-1">
                    <Avatar shape="square" initials={getInitials(user?.name)} alt="profile image" src={user?.image}/>
                    <span className="flex-1 truncate text-xs">{user?.name}</span>
                </span>
            </Menu.Trigger>
            <Menu.Content className="w-[216px]" showArrow={false} placement="bottom start" containerPadding={8}>
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
