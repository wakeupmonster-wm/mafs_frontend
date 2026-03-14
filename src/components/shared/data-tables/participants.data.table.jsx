import { React, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TableLoader } from "@/app/loader/table.loader";
import { DataNotFound } from "@/modules/not-found/components/data.not-found";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function ParticipantsDataTables({
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
  searchPlaceholder = "Search...",
  globalFilter,
  setGlobalFilter,
  isLoading,
  filters, // Destructure the new filters prop
}) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    rowCount,
    state: { sorting, pagination, globalFilter },
    onSortingChange: setSorting, // Keep this
    onPaginationChange,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // This allows the UI to sort the data provided
    manualPagination: true,
    manualFiltering: true,
    manualSorting: false, // Correct: we sort the local "data" slice
  });

  return (
    <div className="w-full space-y-4">
      {/* --- TOOLBAR SECTION --- */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row md:items-center justify-between gap-4 bg-slate-50/50 p-2 rounded-xl">
          {/* 1. LEFT SIDE: Search Input */}
          <div className="relative w-3/5 md:w-1/3">
            {/* Search Icon (Left) */}
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />

            <Input
              placeholder={searchPlaceholder}
              className="pl-9 pr-10 bg-white border-slate-200 h-10 shadow-md focus-visible:ring-brand-aqua rounded-lg"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />

            {/* Clear Cross Icon (Right) */}
            {globalFilter && (
              <button
                onClick={() => setGlobalFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full p-1 bg-brand-aqua/30 hover:bg-brand-aqua transition-colors duration-200"
                aria-label="Clear search"
              >
                <IconX className="h-4 w-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
              </button>
            )}
          </div>

          {/* 2. DATE PICKER (Right) - Replacing the Filter Button */}
          <div className="flex items-center gap-2">
            {filters.date && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => filters.setDate(null)}
                className="h-8 px-2 text-slate-500 hover:text-red-600"
              >
                Clear Date
              </Button>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-max justify-start text-left font-normal border-brand-aqua/50 shadow-sm",
                    !filters.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-brand-aqua" />
                  {filters.date ? (
                    format(filters.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={filters.date}
                  onSelect={filters.setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* --- DATA AREA (RESPONSIBLE) --- */}
      <div className="block rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-700 w-max pl-10 font-semibold h-10 bg-slate-100 text-xs"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            className={cn(
              isLoading && "opacity-50 pointer-events-none transition-opacity"
            )}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 pl-10">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center"
                >
                  {isLoading ? (
                    <TableLoader text="Fetching Campaigns..." />
                  ) : (
                    <DataNotFound message="No campaigns found" />
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- PAGINATION SECTION --- */}
      <div className="flex flex-row items-center justify-between gap-4 py-2 border-t border-slate-100 mt-4 px-5 md:px-0">
        <div className="text-xs font-medium text-slate-500">
          Showing {data.length} of {rowCount} results
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2">
            <Label className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase">
              Rows
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft size={16} />
            </Button>
            <div className="text-xs font-semibold px-2">
              {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
