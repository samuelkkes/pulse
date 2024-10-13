"use client";

import React, {useTransition} from 'react'
import {Menu} from "@/components/ui/menu";
import {Locales} from "@/i18n";

interface Props {
    localeCode: string,
    localeText: string,
}

export const NavbarLangSwitchSelect = ({localeCode, localeText}: Props) => {


    const [, startTransition] = useTransition();

    function onChange(value: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const lang = value as Locales;
        startTransition(() => {
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
