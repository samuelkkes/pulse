import {auth} from "@/auth";

const Page = async () => {
    const session = await auth()
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div>
                {JSON.stringify(session)}
            </div>
        </div>
    )
}
export default Page
