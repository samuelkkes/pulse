import {ReactNode} from 'react'
import Sidebar from "@/components/app/sidebar";

const Layout = ({children}: { children: ReactNode }) => {

    return (
        <div className="flex h-full">
            <Sidebar/>
            <main className="h-full flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
export default Layout
