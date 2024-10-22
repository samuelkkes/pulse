import {Heading} from "@/components/ui/heading";
import DataTable from "@/components/ui/data-table";
import {Payment, paymentColumns} from "@/data/columns";

const data: Payment[] = [
    {
        id: "1",
        amount: 100,
        status: "pending",
        email: "email",
    },
    {
        id: "2",
        amount: 50,
        status: "processing",
        email: "email",
    },
    {
        id: "3",
        amount: 210,
        status: "success",
        email: "email",
    },
    {
        id: "4",
        amount: 15,
        status: "failed",
        email: "email",
    },
    {
        id: "5",
        amount: 100,
        status: "pending",
        email: "email",
    },
    {
        id: "6",
        amount: 50,
        status: "processing",
        email: "email",
    },
    {
        id: "7",
        amount: 210,
        status: "success",
        email: "email",
    },
    {
        id: "8",
        amount: 15,
        status: "failed",
        email: "email",
    },
    {
        id: "9",
        amount: 210,
        status: "success",
        email: "email",
    },
    {
        id: "10",
        amount: 15,
        status: "failed",
        email: "email",
    }
]

const Page = () => {
    return (
        <div className="flex flex-col gap-y-8 px-8 py-4">
            <div>
                <Heading>Users</Heading>
            </div>
            <div>
                <DataTable data={data} columns={paymentColumns}/>
            </div>
        </div>
    )
}
export default Page
