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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimpleLoader } from "@/components/ui/loading-overlay";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FilterChip } from "../filter.chip";
import { IoLogoApple } from "react-icons/io5";
import { AiFillAndroid } from "react-icons/ai";

export default function SubscriptionsDataTables({
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

  const hasActiveFilters = filters.status || filters.plan || filters.platform;

  return (
    <div className="w-full space-y-4">
      {/* --- TOOLBAR SECTION --- */}
      <div className="flex flex-col gap-4 p-2 rounded-2xl">
        {/* --- MAIN ROW --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* 1. LEFT SIDE: Search Input (Flexible width) */}
          <div className="relative flex-1 min-w-[280px] max-w-md">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-9 pr-10 bg-white border-slate-200 h-11 shadow-sm focus-visible:ring-brand-aqua rounded-xl transition-all"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            {globalFilter && (
              <button
                onClick={() => setGlobalFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <IconX className="h-3 w-3 text-slate-600" />
              </button>
            )}
          </div>

          {/* 2. RIGHT SIDE: Filter Selects & Desktop Chips */}
          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 flex-[2]">
            {/* Desktop Chips (Visible from Tablet up) */}
            <div className="hidden md:flex flex-wrap items-center gap-2">
              <AnimatePresence mode="popLayout">
                {filters.status && (
                  <FilterChip
                    label="Status"
                    value={filters.status}
                    onClear={() => filters.setStatus("")}
                    colorClass="bg-indigo-50 border-indigo-300 text-indigo-700"
                  />
                )}
                {filters.plan && (
                  <FilterChip
                    label="Plan"
                    value={filters.plan}
                    onClear={() => filters.setPlan("")}
                    colorClass="bg-amber-50 border-amber-300 text-amber-700"
                  />
                )}
                {filters.platform && (
                  <FilterChip
                    label="Platform"
                    value={filters.platform}
                    onClear={() => filters.setPlatform("")}
                    colorClass="bg-cyan-50 border-cyan-300 text-cyan-700"
                  />
                )}
              </AnimatePresence>
            </div>

            {hasActiveFilters && (
              <div className="hidden lg:block w-px h-6 bg-slate-200 mx-1" />
            )}

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status Select */}
              <Select value={filters.status} onValueChange={filters.setStatus}>
                <SelectTrigger
                  className={cn(
                    "h-10 w-max bg-white",
                    filters.status && "border-indigo-500 ring-1 ring-indigo-500"
                  )}
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {["ACTIVE", "EXPIRED", "CANCELLED", "PENDING"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Plan Select */}
              <Select value={filters.plan} onValueChange={filters.setPlan}>
                <SelectTrigger
                  className={cn(
                    "h-10 w-max bg-white",
                    filters.plan && "border-amber-500 ring-1 ring-amber-500"
                  )}
                >
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  {["weekly", "monthly", "yearly", "lifetime"].map((p) => (
                    <SelectItem key={p} value={p} className="capitalize">
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Platform Select */}
              <Select
                value={filters.platform}
                onValueChange={filters.setPlatform}
              >
                <SelectTrigger
                  className={cn(
                    "h-10 w-max bg-white border-slate-200 transition-all",
                    filters.platform &&
                      "border-brand-aqua ring-1 ring-brand-aqua bg-brand-aqua/10"
                  )}
                >
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>

                {/*     <SelectTrigger
                className={cn(
                  "h-10 w-[110px] bg-white",
                  filters.platform && "border-cyan-500 ring-1 ring-cyan-500"
                )}
              > */}

                <SelectContent>
                  <SelectItem value="ios">
                    <div className="flex items-center gap-2">
                      <IoLogoApple className="w-4 h-4" />
                      <span>IOS</span>
                    </div>
                  </SelectItem>

                  <SelectItem value="android">
                    <div className="flex items-center gap-2">
                      <AiFillAndroid className="w-4 h-4 text-emerald-600" />
                      <span>Android</span>
                    </div>
                  </SelectItem>

                  {filters.platform && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        filters.setPlatform("");
                      }}
                      className="w-full px-2 py-1.5 text-xs text-red-500 hover:bg-red-50 font-bold border-t mt-1"
                    >
                      Clear Platform
                    </button>
                  )}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    filters.setStatus("");
                    filters.setPlan("");
                    filters.setPlatform("");
                  }}
                  className="h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50"
                >
                  <IconX size={18} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 3. MOBILE ONLY CHIPS: Shown below on very small screens */}
        <div className="flex md:hidden flex-wrap gap-2">
          <AnimatePresence>
            {filters.status && (
              <FilterChip
                label="Status"
                value={filters.status}
                onClear={() => filters.setStatus("")}
                colorClass="bg-indigo-50 text-indigo-700"
              />
            )}
            {filters.plan && (
              <FilterChip
                label="Plan"
                value={filters.plan}
                onClear={() => filters.setPlan("")}
                colorClass="bg-amber-50 text-amber-700"
              />
            )}
            {filters.platform && (
              <FilterChip
                label="OS"
                value={filters.platform}
                onClear={() => filters.setPlatform("")}
                colorClass="bg-cyan-50 text-cyan-700"
              />
            )}
          </AnimatePresence>
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
                    <TableCell key={cell.id} className="py-3 px-0">
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
