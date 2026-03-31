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
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TableLoader } from "@/app/loader/table.loader";
import { DataNotFound } from "@/modules/not-found/components/data.not-found";
import { GENDER_OPTIONS } from "@/constants/gender.options";

export default function UserDataTables({
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
    filters.accountStatus ||
    filters.isPremium !== undefined ||
    filters.last24HR !== undefined ||
    filters.isDeactivated !== undefined ||
    filters.isScheduledForDeletion !== undefined ||
    filters.gender;

  return (
    <div className="w-full space-y-4">
      {/* --- TOOLBAR SECTION --- */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row lg:items-center justify-between gap-3 p-0 rounded-2xl">
          {/* 1. LEFT SIDE: Search Input */}
          <div className="relative w-80 lg:w-96 order-1">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 z-10" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-9 pr-10 bg-white border-slate-200 h-10 placeholder:text-slate-400 shadow-sm focus-visible:ring-brand-aqua rounded-lg"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            {globalFilter && (
              <button
                onClick={() => setGlobalFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full p-1 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <IconX className="h-3.5 w-3.5 text-slate-500" />
              </button>
            )}
          </div>

          {/* 2. RIGHT SIDE CONTAINER: Chips + Divider + Filter Button */}
          <div className="flex items-center justify-end gap-3 min-w-0 flex-1 ml-4 order-2">
            {/* Desktop Chips (Hidden on Mobile) */}
            <div className="hidden sm:flex flex-1 flex-wrap items-center justify-end gap-1.5 overflow-x-hidden min-w-0">
              <AnimatePresence mode="popLayout">
                {/* 1. GENDER CHIP */}
                {filters.gender && (
                  <motion.div
                    key="chip-gender"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0"
                  >
                    <Badge
                      variant="outline"
                      // className="h-6 px-2 gap-1 bg-purple-50 border-purple-300 text-purple-700 whitespace-nowrap"
                      className="h-6 px-2 gap-1 bg-sky-50 border-sky-300 text-sky-700 whitespace-nowrap"
                    >
                      {/* <span className="text-[10px] font-bold uppercase opacity-60">
                        Gender:
                      </span> */}
                      <span className="capitalize text-[10px] font-semibold">
                        {filters.gender}
                      </span>
                      <button
                        onClick={() => filters.setGender("")}
                        className="ml-0.5 p-0.5 rounded-full hover:bg-purple-200 transition-colors"
                      >
                        <IconX size={9} />
                      </button>
                    </Badge>
                  </motion.div>
                )}

                {/* 2. ACCOUNT STATUS CHIP */}
                {filters.accountStatus && (
                  <motion.div
                    key="chip-status"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0"
                  >
                    <Badge
                      variant="outline"
                      // className="h-6 px-2 gap-1 bg-indigo-50 border-indigo-300 text-indigo-700 whitespace-nowrap"
                      className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                    >
                      {/* <span className="text-[10px] font-bold uppercase opacity-60">
                        Status:
                      </span> */}
                      <span className="capitalize text-[10px] font-semibold">
                        {filters.accountStatus}
                      </span>
                      <button
                        onClick={() => filters.setAccountStatus("")}
                        // className="ml-0.5 p-0.5 rounded-full hover:bg-indigo-200 transition-colors"
                        className="ml-0.5 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                      >
                        <IconX size={9} />
                      </button>
                    </Badge>
                  </motion.div>
                )}

                {/* 3. PREMIUM CHIP */}
                {filters.isPremium !== undefined && (
                  <motion.div
                    key="chip-premium"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0"
                  >
                    <Badge
                      variant="outline"
                      // className="h-6 px-2 gap-1 bg-amber-50 border-amber-300 text-amber-700 whitespace-nowrap"
                      className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                    >
                      {/* <span className="text-[10px] font-bold uppercase opacity-60">
                        Plan:
                      </span> */}
                      <span className="text-[10px] font-semibold">
                        {filters.isPremium ? "Premium" : "Free"}
                      </span>
                      <button
                        onClick={() => filters.setIsPremium(undefined)}
                        // className="ml-0.5 p-0.5 rounded-full hover:bg-amber-200 transition-colors"
                        className="ml-0.5 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                      >
                        <IconX size={9} />
                      </button>
                    </Badge>
                  </motion.div>
                )}

                {/* 4. LAST 24HR CHIP */}
                {filters.last24HR !== undefined && (
                  <motion.div
                    key="last24hr-chip"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0"
                  >
                    <Badge
                      variant="outline"
                      // className="h-6 px-2 gap-1 bg-sky-50 border-sky-300 text-sky-700 whitespace-nowrap"
                      className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                    >
                      {/* <span className="text-[10px] font-bold uppercase opacity-60">
                        Login:
                      </span> */}
                      <span className="text-[10px] font-semibold">
                        Last 24H
                      </span>
                      <button
                        onClick={() => filters.setLast24HR(undefined)}
                        // className="ml-0.5 p-0.5 rounded-full hover:bg-sky-200 transition-colors"
                        className="ml-0.5 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                      >
                        <IconX size={9} />
                      </button>
                    </Badge>
                  </motion.div>
                )}

                {/* 5. DEACTIVATED CHIP */}
                {filters.isDeactivated === true && (
                  <motion.div
                    key="chip-deactivated"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0"
                  >
                    <Badge
                      variant="outline"
                      className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                    >
                      {/* <span className="text-[10px] font-bold uppercase opacity-60">
                        User:
                      </span> */}
                      <span className="text-[10px] font-semibold">
                        Deactivated
                      </span>
                      <button
                        onClick={() => filters.setIsDeactivated(undefined)}
                        // className="ml-0.5 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                        className="ml-0.5 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                      >
                        <IconX size={9} />
                      </button>
                    </Badge>
                  </motion.div>
                )}

                {/* 6. DELETION CHIP */}
                {filters.isScheduledForDeletion === true && (
                  <motion.div
                    key="chip-deletion"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="shrink-0"
                  >
                    <Badge
                      variant="outline"
                      // className="h-6 px-2 gap-1 bg-red-50 border-red-300 text-red-700 whitespace-nowrap"
                      className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                    >
                      {/* <span className="text-[10px] font-bold uppercase opacity-60">
                        Account:
                      </span> */}
                      <span className="text-[10px] font-semibold">
                        Deletion
                      </span>
                      <button
                        onClick={() =>
                          filters.setIsScheduledForDeletion(undefined)
                        }
                        // className="ml-0.5 p-0.5 rounded-full hover:bg-red-200 transition-colors"
                        className="ml-0.5 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                      >
                        <IconX size={10} />
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

            {/* --- SEPARATE DROPDOWNS --- */}
            <div className="flex items-center gap-2">
              {/* DROPDOWN 1: GENDER */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-9 group shadow-sm bg-white hover:bg-brand-aqua text-sm font-normal hover:font-medium text-slate-500 hover:text-white whitespace-nowrap transition-all duration-300",
                      filters.gender &&
                        "border-brand-aqua ring-[0.1px] ring-brand-aqua focus-visible:ring-0",
                    )}
                  >
                    <IconFilter
                      strokeWidth={2}
                      className={cn(
                        "h-6 w-6",
                        filters.gender
                          ? "text-brand-aqua group-hover:text-white"
                          : "text-slate-500/80 group-hover:text-white",
                      )}
                    />
                    Gender
                    {filters.gender && (
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-aqua/80 group-hover:bg-white text-[8px] text-white group-hover:text-brand-aqua font-bold">
                        1
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 p-2 shadow-xl border-slate-200"
                >
                  <DropdownMenuLabel className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-2 py-1.5">
                    Select Gender
                  </DropdownMenuLabel>
                  {GENDER_OPTIONS.map((g) => (
                    <DropdownMenuCheckboxItem
                      key={g}
                      className="capitalize"
                      checked={filters.gender === g}
                      onCheckedChange={() =>
                        filters.setGender(filters.gender === g ? "" : g)
                      }
                    >
                      {g.replace("-", " ")}
                    </DropdownMenuCheckboxItem>
                  ))}

                  <DropdownMenuSeparator />
                  {hasActiveFilters && (
                    <DropdownMenuItem
                      className="text-red-600 justify-center text-xs font-bold cursor-pointer"
                      onClick={() => filters.setGender("")}
                    >
                      Clear Gender
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-9 group shadow-sm bg-white hover:bg-brand-aqua text-sm font-normal hover:font-medium text-slate-500 hover:text-white whitespace-nowrap transition-all duration-300",
                      hasActiveFilters &&
                        "border-brand-aqua ring-[0.1px] ring-brand-aqua focus-visible:ring-0",
                    )}
                  >
                    <IconFilter
                      strokeWidth={2}
                      className={cn(
                        "h-6 w-6",
                        hasActiveFilters
                          ? "text-brand-aqua group-hover:text-white"
                          : "text-slate-500/80 group-hover:text-white",
                      )}
                    />
                    Filters
                    {/* {filters.accountStatus ||
                      filters.isPremium ||
                      filters.last24HR ||
                      filters.isDeactivated ||
                      (filters.isScheduledForDeletion && ( */}
                    {hasActiveFilters && (
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-aqua group-hover:bg-white text-[8px] text-white group-hover:text-brand-aqua font-bold">
                        {Number(!!filters.accountStatus) +
                          Number(filters.isPremium !== undefined) +
                          Number(filters.last24HR !== undefined) +
                          Number(filters.isDeactivated !== undefined) +
                          Number(filters.isScheduledForDeletion !== undefined)}
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
                  <DropdownMenuCheckboxItem
                    checked={filters.last24HR === true}
                    onCheckedChange={() => filters.setLast24HR(true)}
                  >
                    Last 24 Hours
                  </DropdownMenuCheckboxItem>

                  {/* 🔥 NEW: Deactivation Filter */}
                  <DropdownMenuCheckboxItem
                    checked={filters.isDeactivated === true}
                    onCheckedChange={() => filters.setIsDeactivated(true)}
                  >
                    Deactivated Users
                  </DropdownMenuCheckboxItem>

                  {/* 🔥 NEW: Deletion Filter */}
                  <DropdownMenuCheckboxItem
                    checked={filters.isScheduledForDeletion === true}
                    onCheckedChange={() =>
                      filters.setIsScheduledForDeletion(true)
                    }
                  >
                    Deletion
                  </DropdownMenuCheckboxItem>

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

                  <DropdownMenuSeparator />

                  {hasActiveFilters && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 justify-center font-medium focus:bg-red-50 focus:text-red-700 cursor-pointer"
                        onClick={() => {
                          filters.setAccountStatus("");
                          filters.setIsPremium(undefined);
                          filters.setIsDeactivated(undefined); // Reset
                          filters.setIsScheduledForDeletion(undefined); // Reset
                          filters.setLast24HR(undefined);
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

        {/* 3. MOBILE ONLY CHIPS: All filter chips shown below toolbar */}
        <div className="flex sm:hidden flex-wrap gap-1.5 px-1">
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap items-center gap-1.5"
              >
                {filters.gender && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 gap-1 bg-purple-50 border-purple-300 text-purple-700"
                  >
                    <span className="text-[10px] opacity-60">Gender:</span>
                    <span className="capitalize text-[10px] font-semibold">
                      {filters.gender}
                    </span>
                    <button
                      onClick={() => filters.setGender("")}
                      className="ml-0.5"
                    >
                      <IconX size={9} />
                    </button>
                  </Badge>
                )}
                {filters.accountStatus && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 gap-1 bg-indigo-50 border-indigo-300 text-indigo-700"
                  >
                    <span className="text-[10px] opacity-60">Status:</span>
                    <span className="capitalize text-[10px] font-semibold">
                      {filters.accountStatus}
                    </span>
                    <button
                      onClick={() => filters.setAccountStatus("")}
                      className="ml-0.5"
                    >
                      <IconX size={9} />
                    </button>
                  </Badge>
                )}
                {filters.isPremium !== undefined && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 gap-1 bg-amber-50 border-amber-300 text-amber-700"
                  >
                    <span className="text-[10px] opacity-60">Plan:</span>
                    <span className="text-[10px] font-semibold">
                      {filters.isPremium ? "Premium" : "Free"}
                    </span>
                    <button
                      onClick={() => filters.setIsPremium(undefined)}
                      className="ml-0.5"
                    >
                      <IconX size={9} />
                    </button>
                  </Badge>
                )}
                {filters.last24HR !== undefined && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 gap-1 bg-sky-50 border-sky-300 text-sky-700"
                  >
                    <span className="text-[10px] font-semibold">Last 24H</span>
                    <button
                      onClick={() => filters.setLast24HR(undefined)}
                      className="ml-0.5"
                    >
                      <IconX size={9} />
                    </button>
                  </Badge>
                )}
                {filters.isDeactivated === true && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600"
                  >
                    <span className="text-[10px] font-semibold">
                      Deactivated
                    </span>
                    <button
                      onClick={() => filters.setIsDeactivated(undefined)}
                      className="ml-0.5"
                    >
                      <IconX size={9} />
                    </button>
                  </Badge>
                )}
                {filters.isScheduledForDeletion === true && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 gap-1 bg-red-50 border-red-300 text-red-700"
                  >
                    <span className="text-[10px] font-semibold">Deletion</span>
                    <button
                      onClick={() =>
                        filters.setIsScheduledForDeletion(undefined)
                      }
                      className="ml-0.5"
                    >
                      <IconX size={9} />
                    </button>
                  </Badge>
                )}
              </motion.div>
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
                    className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            className={cn(
              isLoading && "opacity-50 pointer-events-none transition-opacity",
            )}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                    <TableLoader text="Fetching Users..." />
                  ) : (
                    <DataNotFound message="No users found" />
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
