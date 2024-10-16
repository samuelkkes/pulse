import {ReactNode} from "react";
import Sidebar from "@/components/app/sidebar";
import {AppBreadcrumb} from "@/components/app/app-breadcrumb";

const Layout = ({children}: { children: ReactNode }) => {

    return (
        <div className="flex h-full bg-muted dark:bg-bg">
            <Sidebar/>
            <div className="h-full flex-1 overflow-y-auto pl-2 pt-4">
                <main
                    className="flex h-full flex-col rounded-tl-3xl bg-bg ring-2 ring-muted-fg/40 dark:bg-overlay dark:ring-muted">
                    <AppBreadcrumb/>
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Layout
