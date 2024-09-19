import {ReactElement} from 'react'
import {I18nProviderClient} from "@/locales/client";
import NavbarThemeSwitch from "@/components/auth/navbar-theme-switch";
import NavbarLangSwitch from "@/components/auth/navbar-lang-switch";
import NavbarClock from "@/components/auth/navbar-clock";
import Particles from "@/components/global/particles";

export default function SubLayout({params: {locale}, children}: {
    params: { locale: string },
    children: ReactElement
}) {
    return (
        <I18nProviderClient locale={locale}>
            <main className="relative flex h-svh flex-col">
                <Particles quantity={500} className="absolute inset-0 -z-10"/>
                <nav className="flex items-center justify-between bg-bg px-4 py-2 text-muted-fg border-b-muted-fg">
                    <span className="cursor-pointer select-none font-mono text-base font-bold
                        transition-colors duration-300 ease-in-out hover:text-fg">
                        Nexus
                    </span>
                    <div className="flex items-center gap-x-2">
                        <NavbarThemeSwitch/>
                        <NavbarLangSwitch/>
                        <NavbarClock/>
                    </div>
                </nav>
                <div className="flex flex-1 justify-center px-4 pt-20 md:items-center md:p-0">
                    {children}
                </div>
            </main>
        </I18nProviderClient>
    )
}