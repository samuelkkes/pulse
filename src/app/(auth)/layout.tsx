import {ReactNode, Suspense} from 'react'
import NavbarThemeSwitch from "@/components/auth/navbar-theme-switch";
import NavbarLangSwitch from "@/components/auth/navbar-lang-switch";
import NavbarClock from "@/components/auth/navbar-clock";
import Particles from "@/components/global/particles";
import Logo from "@/components/app/logo";
import Loading from "@/components/global/loading";

export default function SubLayout({children}: { children: ReactNode }) {
    return (
        <main className="relative flex h-svh flex-col">
            <Particles quantity={500} className="absolute inset-0 -z-10"/>
            <nav className="fixed left-0 top-0 flex w-full items-center justify-between border-b-muted-fg bg-bg px-4 py-2 text-muted-fg">
                <Logo withText={false}/>
                <div className="flex items-center gap-x-2">
                    <NavbarThemeSwitch/>
                    <NavbarLangSwitch/>
                    <NavbarClock/>
                </div>
            </nav>
            <div className="flex flex-1 justify-center px-4 pt-20 md:items-center md:p-0">
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </div>
        </main>
    )
}