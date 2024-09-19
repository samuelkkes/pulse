"use client";

import {LanguagesIcon} from "lucide-react";
import {Menu} from "@/components/ui/menu";
import {NavbarLangSwitchSelect} from "@/components/auth/navbar-lang-switch-select";
import {useState} from "react";
import {Placement} from "@react-types/overlays";
import {type Selection} from "@react-types/shared"
import {useCurrentLocale} from "@/locales/client";
import {buttonStyles} from "@/components/ui/button";

const opt = [
    {
        localeCode: "en",
        localeText: "English",
    },
    {
        localeCode: "fr",
        localeText: "Français",
    }
]

const NavbarLangSwitch = () => {
    const locale = useCurrentLocale();
    const [selected, setSelected] = useState<Selection>(new Set([locale]))
    return (
        <Menu>
            <Menu.Trigger className={`${buttonStyles({
                appearance: "plain",
                size: "extra-small"
            })} text-muted-fg hover:bg-secondary/20 hover:text-fg`}>
                <LanguagesIcon className="size-4 "/>
            </Menu.Trigger>
            <Menu.Content
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
                className="w-40"
            >
                {opt.map((option, i) => (
                    <NavbarLangSwitchSelect key={option.localeCode + i} localeCode={option.localeCode}
                                            localeText={option.localeText}/>
                ))}
            </Menu.Content>
        </Menu>
    )
}
export default NavbarLangSwitch;