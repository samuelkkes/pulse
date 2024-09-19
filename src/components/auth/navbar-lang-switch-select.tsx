import React, {useTransition} from 'react'
import {Menu} from "@/components/ui/menu";
import {useChangeLocale} from "@/locales/client";
import {Locales} from "@/locales";

interface Props {
    localeCode: string,
    localeText: string,
}

export const NavbarLangSwitchSelect = ({localeCode, localeText}: Props) => {
    const changeLocale = useChangeLocale();

    const [, startTransition] = useTransition();

    function onChange(value: string) {
        const lang = value as Locales;
        startTransition(() => {
            changeLocale(lang)
        });
    }

    return (
        <Menu.Checkbox
            className="gap-x-2"
            onAction={() => onChange(localeCode)}
        >
            <span className="shrink-0 text-sm capitalize">{localeCode}</span>
            <span className="">{localeText}</span>
        </Menu.Checkbox>
    )
}
