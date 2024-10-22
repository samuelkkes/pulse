"use client"

import {ColumnDef} from "@tanstack/react-table";
import {Menu} from "@/components/ui/menu"
import {IconDotsVertical} from "justd-icons";
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string,
}

export const paymentColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        id: "actions",
        cell: ({}) => {

            return (
                <div className="flex justify-end">
                    <Menu>
                        <Menu.Trigger>
                            <IconDotsVertical/>
                        </Menu.Trigger>
                        <Menu.Content aria-label="Actions" placement="bottom end">
                            <Menu.Item>View</Menu.Item>
                            <Menu.Item>Edit</Menu.Item>
                            <Menu.Separator/>
                            <Menu.Item isDanger>
                                <Menu.ItemDetails label="Delete" description="Cannot be undone" />
                            </Menu.Item>
                        </Menu.Content>
                    </Menu>
                </div>
            )
        },
    },
]