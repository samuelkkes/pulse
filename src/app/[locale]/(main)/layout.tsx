import {ReactNode} from 'react'
import Navigation from "@/components/app/navigation";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex h-full">
            <Navigation/>
            <main className="h-full flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
export default Layout
