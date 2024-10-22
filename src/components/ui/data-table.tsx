"use client"

import {ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "@/components/ui/table";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

interface IDateTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]

}

const DataTable = <TData, TValue>({columns, data}: IDateTableProps<TData, TValue>) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <div className="flex flex-col">
            <Card>
                <Table>
                    <Table.Header>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Table.Column key={header.id} isRowHeader>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </Table.Column>
                                    )
                                })}
                            </Table.Row>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Table.Row
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <Table.Cell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell className="h-24 text-center">
                                    No results.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    appearance="outline"
                    size="extra-small"
                    onPress={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    appearance="outline"
                    size="extra-small"
                    onPress={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default DataTable;