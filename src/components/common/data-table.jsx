import { React, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  IconFilter,
  IconInbox,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SimpleLoader } from "../ui/loading-overlay";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function DataTable({
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
  searchPlaceholder = "Search...",
  globalFilter,
  setGlobalFilter,
  isLoading,
  meta,
  filters, // Destructure the new filters prop
}) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    rowCount,
    onSortingChange: setSorting,
    manualSorting: false, // 4. Tell TanStack you'll handle it via API
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: { sorting, pagination, globalFilter },
    meta: meta,
  });

  const hasActiveFilters =
    filters.accountStatus || filters.isPremium !== undefined;

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

          {/* 2. RIGHT SIDE CONTAINER: Chips + Divider + Filter Button */}
          <div className="flex items-center justify-end gap-3 min-w-0 flex-1 ml-4">
            {/* Desktop Chips (Hidden on Mobile) */}
            <div className="hidden sm:flex flex-1 items-center justify-end gap-2 overflow-x-hidden min-w-0">
              <AnimatePresence mode="popLayout">
                {filters.accountStatus && (
                  <motion.div
                    key="status-chip"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0" // Prevents the chip itself from squeezing
                  >
                    <Badge
                      variant="secondary"
                      className="p-2 gap-1 bg-indigo-100 border-dashed border-indigo-400 text-indigo-700 shadow-sm whitespace-nowrap"
                    >
                      <span className="text-[10px] font-bold uppercase opacity-50">
                        Status:
                      </span>
                      <span className="capitalize text-xs">
                        {filters.accountStatus}
                      </span>
                      <button
                        onClick={() => filters.setAccountStatus("")}
                        className="ml-1 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
                      >
                        <IconX size={12} />
                      </button>
                    </Badge>
                  </motion.div>
                )}

                {filters.isPremium !== undefined && (
                  <motion.div
                    key="premium-chip"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0"
                  >
                    <Badge
                      variant="secondary"
                      className="p-2 gap-1 bg-amber-100 border-dashed border-amber-400 text-amber-700 shadow-sm whitespace-nowrap"
                    >
                      <span className="text-[10px] font-bold uppercase opacity-50">
                        Plan:
                      </span>
                      <span className="text-xs">
                        {filters.isPremium ? "Premium" : "Free"}
                      </span>
                      <button
                        onClick={() => filters.setIsPremium(undefined)}
                        className="ml-1 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
                      >
                        <IconX size={12} />
                      </button>
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vertical Divider */}
            {hasActiveFilters && (
              <div className="hidden sm:block w-0.5 h-6 bg-slate-200 shrink-0" />
            )}

            {/* Filter Trigger Button */}
            <div className="shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 border-brand-aqua/80 shadow-sm bg-brand-aqua/5 transition-all whitespace-nowrap",
                      hasActiveFilters &&
                        "border-brand-aqua ring-1 ring-brand-aqua"
                    )}
                  >
                    <IconFilter
                      className={cn(
                        "h-4 w-4 mr-2",
                        hasActiveFilters
                          ? "text-brand-aqua"
                          : "text-brand-aqua/50"
                      )}
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Filters
                    </span>
                    {hasActiveFilters && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-aqua text-[10px] text-white font-bold">
                        {Number(!!filters.accountStatus) +
                          Number(filters.isPremium !== undefined)}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 shadow-xl border-slate-200"
                >
                  <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Account Status
                  </DropdownMenuLabel>
                  {["active", "banned", "suspended"].map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      className="capitalize"
                      checked={filters.accountStatus === status}
                      onCheckedChange={() => filters.setAccountStatus(status)}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Plan Type
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.isPremium === true}
                    onCheckedChange={() => filters.setIsPremium(true)}
                  >
                    Premium Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.isPremium === false}
                    onCheckedChange={() => filters.setIsPremium(false)}
                  >
                    Free Only
                  </DropdownMenuCheckboxItem>

                  {hasActiveFilters && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 justify-center font-medium focus:bg-red-50 focus:text-red-700 cursor-pointer"
                        onClick={() => {
                          filters.setAccountStatus("");
                          filters.setIsPremium(undefined);
                        }}
                      >
                        Clear All Filters
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* 3. MOBILE ONLY CHIPS: Shown below the main bar for better UX on small screens */}
        <div className="flex justify-end sm:hidden flex-wrap gap-2 px-1">
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap items-center gap-2"
              >
                {filters.accountStatus && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-700 border-indigo-100 py-1"
                  >
                    Status:{" "}
                    <span className="capitalize ml-1">
                      {filters.accountStatus}
                    </span>
                    <button
                      onClick={() => filters.setAccountStatus("")}
                      className="ml-1"
                    >
                      <IconX size={12} />
                    </button>
                  </Badge>
                )}
                {filters.isPremium !== undefined && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-50 text-amber-700 border-amber-100 py-1"
                  >
                    Plan:{" "}
                    <span className="ml-1">
                      {filters.isPremium ? "Premium" : "Free"}
                    </span>
                    <button
                      onClick={() => filters.setIsPremium(undefined)}
                      className="ml-1"
                    >
                      <IconX size={12} />
                    </button>
                  </Badge>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- DATA AREA (RESPONSIBLE) --- */}

      {/* 2. Desktop View: Standard Table (Hidden on Mobile) */}
      <div className="block rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-700 font-semibold h-10 bg-slate-100 text-xs"
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
                    <TableCell key={cell.id} className="py-3">
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
                    <SimpleLoader text="Fetching data..." />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 space-y-2">
                      <IconInbox size={48} stroke={1} />
                      <p className="text-sm font-medium">
                        No results found for your search
                      </p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
            {/*  ))} */}
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
