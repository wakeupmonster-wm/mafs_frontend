import React from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Inbox, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DataTable({
    columns,
    data,
    loading,
    pagination,
    onPaginationChange,
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: pagination?.total || 0,
        state: {
            pagination: {
                pageIndex: (pagination?.page || 1) - 1,
                pageSize: pagination?.limit || 15,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const nextState = updater({
                    pageIndex: (pagination?.page || 1) - 1,
                    pageSize: pagination?.limit || 15,
                });
                onPaginationChange(nextState);
            }
        },
    });

    return (
        <div className="w-full">
            <div className="relative">
                <Table>
                    <TableHeader className="bg-slate-50/50 border-b border-slate-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="h-12 px-4">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Loader2 className="w-8 h-8 text-brand-aqua animate-spin" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Ledger...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-slate-50 hover:bg-slate-50/50 transition-colors group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-4 py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3 opacity-20">
                                        <Inbox className="w-12 h-12" />
                                        <p className="text-sm font-black uppercase tracking-widest text-slate-900">No Subscriber Records</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50/30 border-t border-slate-50">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Showing {data.length} of {pagination?.total || 0} Entries
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Page</span>
                        <span className="text-xs font-black text-slate-700">{pagination?.page || 1} / {pagination?.totalPages || 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-xl border-slate-200 bg-white"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage() || loading}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-xl border-slate-200 bg-white"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage() || loading}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
