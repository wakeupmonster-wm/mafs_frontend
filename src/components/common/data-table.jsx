/* eslint-disable no-unused-vars */
// import * as React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel, // Important
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { ChevronDown } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   IconChevronDown,
//   IconChevronLeft,
//   IconChevronRight,
//   IconChevronsLeft,
//   IconChevronsRight,
//   IconFilter,
//   IconLayoutColumns,
//   IconLoader,
//   IconSearch,
// } from "@tabler/icons-react";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

// // export function DataTable({
// //   // columns,
// //   // data,
// //   // searchPlaceholder = "Search all columns...",
// //   // globalFilter,
// //   // setGlobalFilter,
// //   columns,
// //   data,
// //   rowCount, // Total count from API
// //   pagination, // { pageIndex, pageSize }
// //   onPaginationChange,
// //   searchPlaceholder = "Search all columns...",
// //   globalFilter,
// //   setGlobalFilter,
// //   isLoading,
// //   meta,
// // }) {
// //   const [sorting, setSorting] = React.useState([]);
// //   const [columnVisibility, setColumnVisibility] = React.useState({});
// //   const [rowSelection, setRowSelection] = React.useState({});
// //   const [columnFilters, setColumnFilters] = React.useState([
// //     { id: "status", value: "active" },
// //   ]);

// //   // const table = useReactTable({
// //   //   data,
// //   //   columns,
// //   //   onSortingChange: setSorting,
// //   //   onGlobalFilterChange: setGlobalFilter, // Update global filter
// //   //   getCoreRowModel: getCoreRowModel(),
// //   //   getPaginationRowModel: getPaginationRowModel(),
// //   //   getSortedRowModel: getSortedRowModel(),
// //   //   getFilteredRowModel: getFilteredRowModel(), // Required for filtering
// //   //   onColumnVisibilityChange: setColumnVisibility,
// //   //   onRowSelectionChange: setRowSelection,
// //   //   state: {
// //   //     sorting,
// //   //     globalFilter, // Bind state
// //   //     columnVisibility,
// //   //     rowSelection,
// //   //   },
// //   // });

// //   const table = useReactTable({
// //     data,
// //     columns,
// //     rowCount,
// //     manualPagination: true, // 3️⃣ Disable client-side pagination
// //     state: {
// //       pagination,
// //       globalFilter,
// //     },
// //     onPaginationChange, // 4️⃣ Capture page changes
// //     onGlobalFilterChange: setGlobalFilter,
// //     getCoreRowModel: getCoreRowModel(),
// //     // getPaginationRowModel: getPaginationRowModel(), // 5️⃣ Remove this
// //     manualFiltering: true, // Enable manual filtering for API search
// //     meta: meta,
// //   });

// //   return (
// //     <div className="w-full space-y-6">
// //       {/* SEARCH TOOLBAR */}
// //       <div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border">
// //         <div className="relative flex-1 max-w-sm">
// //           <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //           <Input
// //             placeholder={searchPlaceholder}
// //             className="pl-9 bg-background"
// //             value={globalFilter ?? ""}
// //             onChange={(e) => setGlobalFilter(e.target.value)}
// //           />
// //         </div>

// //         <div className="flex items-center gap-2 ml-auto">
// //           {/* --- NEW STATUS FILTER DROPDOWN --- */}
// //           <DropdownMenu>
// //             <DropdownMenuTrigger asChild>
// //               <Button variant="outline">
// //                 <IconFilter className="h-4 w-4 mr-2" /> Filters
// //               </Button>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent align="end" className="w-48">
// //               <DropdownMenuLabel>Status</DropdownMenuLabel>
// //               <DropdownMenuSeparator />
// //               {/* You can manage this state via table.getColumn("status").setFilterValue() */}
// //               <DropdownMenuCheckboxItem
// //                 checked={
// //                   table.getColumn("status")?.getFilterValue() === "active"
// //                 }
// //                 onCheckedChange={() =>
// //                   table.getColumn("status")?.setFilterValue("active")
// //                 }
// //               >
// //                 Active
// //               </DropdownMenuCheckboxItem>
// //               <DropdownMenuCheckboxItem
// //                 checked={
// //                   table.getColumn("status")?.getFilterValue() === "banned"
// //                 }
// //                 onCheckedChange={() =>
// //                   table.getColumn("status")?.setFilterValue("banned")
// //                 }
// //               >
// //                 Banned
// //               </DropdownMenuCheckboxItem>
// //               <DropdownMenuCheckboxItem
// //                 checked={
// //                   table.getColumn("status")?.getFilterValue() === "suspended"
// //                 }
// //                 onCheckedChange={() =>
// //                   table.getColumn("status")?.setFilterValue("suspended")
// //                 }
// //               >
// //                 Suspended
// //               </DropdownMenuCheckboxItem>
// //               <DropdownMenuSeparator />
// //               <DropdownMenuItem
// //                 onClick={() =>
// //                   table.getColumn("status")?.setFilterValue(undefined)
// //                 }
// //               >
// //                 Clear Filter
// //               </DropdownMenuItem>
// //             </DropdownMenuContent>
// //           </DropdownMenu>

// //           {/* --- EXISTING COLUMN CUSTOMIZATION --- */}
// //           <DropdownMenu>
// //             <DropdownMenuTrigger asChild>
// //               <Button variant="outline">
// //                 <IconLayoutColumns className="h-4 w-4 mr-2" />
// //                 <span className="hidden lg:inline">Customize Columns</span>
// //                 <span className="lg:hidden">Columns</span>
// //                 <IconChevronDown className="ml-2 h-4 w-4" />
// //               </Button>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent align="end">
// //               {table
// //                 .getAllColumns()
// //                 .filter((column) => column.getCanHide())
// //                 .map((column) => {
// //                   const header = column.columnDef.header;
// //                   const title = typeof header === "string" ? header : column.id;

// //                   return (
// //                     <DropdownMenuCheckboxItem
// //                       key={column.id}
// //                       className="capitalize"
// //                       checked={column.getIsVisible()}
// //                       onCheckedChange={(value) =>
// //                         column.toggleVisibility(!!value)
// //                       }
// //                     >
// //                       {title}
// //                     </DropdownMenuCheckboxItem>
// //                   );
// //                 })}
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //         </div>
// //       </div>

// //       <div className="rounded-md border relative">
// //         {isLoading && (
// //           <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
// //             <IconLoader className="animate-spin text-blue-600" />
// //           </div>
// //         )}

// //         <Table>
// //           <TableHeader>
// //             {table.getHeaderGroups().map((headerGroup) => (
// //               <TableRow key={headerGroup.id}>
// //                 {headerGroup.headers.map((header) => (
// //                   <TableHead key={header.id}>
// //                     {header.isPlaceholder
// //                       ? null
// //                       : flexRender(
// //                           header.column.columnDef.header,
// //                           header.getContext()
// //                         )}
// //                   </TableHead>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableHeader>
// //           <TableBody>
// //             {table.getRowModel().rows?.length ? (
// //               table.getRowModel().rows.map((row) => (
// //                 <TableRow
// //                   key={row.id}
// //                   data-state={row.getIsSelected() && "selected"}
// //                 >
// //                   {row.getVisibleCells().map((cell) => (
// //                     <TableCell key={cell.id}>
// //                       {flexRender(
// //                         cell.column.columnDef.cell,
// //                         cell.getContext()
// //                       )}
// //                     </TableCell>
// //                   ))}
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell
// //                   colSpan={columns.length}
// //                   className="h-24 text-center"
// //                 >
// //                   No results.
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </div>

// //       <div className="flex items-center justify-between px-4">
// //         <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
// //           {table.getFilteredSelectedRowModel().rows.length} of{" "}
// //           {table.getFilteredRowModel().rows.length} row(s) selected.
// //         </div>
// //         <div className="flex w-full items-center gap-8 lg:w-fit">
// //           <div className="hidden items-center gap-2 lg:flex">
// //             <Label htmlFor="rows-per-page" className="text-sm font-medium">
// //               Rows per page
// //             </Label>
// //             <Select
// //               value={`${table.getState().pagination.pageSize}`}
// //               onValueChange={(value) => {
// //                 table.setPageSize(Number(value));
// //               }}
// //             >
// //               <SelectTrigger size="sm" className="w-20" id="rows-per-page">
// //                 <SelectValue
// //                   placeholder={table.getState().pagination.pageSize}
// //                 />
// //               </SelectTrigger>
// //               <SelectContent side="top">
// //                 {[10, 20, 30, 40, 50].map((pageSize) => (
// //                   <SelectItem key={pageSize} value={`${pageSize}`}>
// //                     {pageSize}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="flex w-fit items-center justify-center text-sm font-medium">
// //             Page {table.getState().pagination.pageIndex + 1} of{" "}
// //             {table.getPageCount()}
// //           </div>
// //           <div className="ml-auto flex items-center gap-2 lg:ml-0">
// //             <Button
// //               variant="outline"
// //               className="hidden h-8 w-8 p-0 lg:flex"
// //               onClick={() => table.setPageIndex(0)}
// //               disabled={!table.getCanPreviousPage()}
// //             >
// //               <span className="sr-only">Go to first page</span>
// //               <IconChevronsLeft />
// //             </Button>
// //             <Button
// //               variant="outline"
// //               className="size-8"
// //               size="icon"
// //               onClick={() => table.previousPage()}
// //               disabled={!table.getCanPreviousPage()}
// //             >
// //               <span className="sr-only">Go to previous page</span>
// //               <IconChevronLeft />
// //             </Button>
// //             <Button
// //               variant="outline"
// //               className="size-8"
// //               size="icon"
// //               onClick={() => table.nextPage()}
// //               disabled={!table.getCanNextPage()}
// //             >
// //               <span className="sr-only">Go to next page</span>
// //               <IconChevronRight />
// //             </Button>
// //             <Button
// //               variant="outline"
// //               className="hidden size-8 lg:flex"
// //               size="icon"
// //               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
// //               disabled={!table.getCanNextPage()}
// //             >
// //               <span className="sr-only">Go to last page</span>
// //               <IconChevronsRight />
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Pagination Controls */}
// //       <div className="flex items-center justify-between px-4">
// //         <div className="flex w-full items-center gap-8 lg:w-fit">
// //           <div className="flex items-center gap-2">
// //             <p className="text-sm font-medium">Rows per page</p>
// //             <Select
// //               value={`${pagination.pageSize}`}
// //               onValueChange={(value) => table.setPageSize(Number(value))}
// //             >
// //               <SelectTrigger className="h-8 w-[70px]">
// //                 <SelectValue placeholder={pagination.pageSize} />
// //               </SelectTrigger>
// //               <SelectContent side="top">
// //                 {[10, 20, 30, 40, 50].map((size) => (
// //                   <SelectItem key={size} value={`${size}`}>
// //                     {size}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="text-sm font-medium">
// //             Page {pagination.pageIndex + 1} of {table.getPageCount()}
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <Button
// //               variant="outline"
// //               size="icon"
// //               onClick={() => table.previousPage()}
// //               disabled={!table.getCanPreviousPage()}
// //             >
// //               <IconChevronLeft />
// //             </Button>
// //             <Button
// //               variant="outline"
// //               size="icon"
// //               onClick={() => table.nextPage()}
// //               disabled={!table.getCanNextPage()}
// //             >
// //               <IconChevronRight />
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// export function DataTable({
//   columns,
//   data,
//   rowCount,
//   pagination,
//   onPaginationChange,
//   searchPlaceholder = "Search...",
//   globalFilter,
//   setGlobalFilter,
//   isLoading,
//   meta,
//   filters, // Destructure the new filters prop
// }) {
//   const table = useReactTable({
//     data,
//     columns,
//     rowCount,
//     manualPagination: true,
//     manualFiltering: true,
//     state: { pagination, globalFilter },
//     onPaginationChange,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     meta: meta,
//   });

//   console.log("globalFilter: ", globalFilter);
//   console.log("pagination: ", pagination);

//   return (
//     <div className="w-full space-y-6">
//       <div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border">
//         {/* Search Input */}
//         <div className="relative flex-1 max-w-sm">
//           <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder={searchPlaceholder}
//             className="pl-9 bg-background"
//             value={globalFilter ?? ""}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center gap-2 ml-auto">
//           {/* ACCOUNT STATUS FILTER */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="min-w-[85px] justify-between capitalize"
//               >
//                 <div className="flex items-center">
//                   <IconFilter className="h-4 w-4 mr-2" />
//                   Status: {filters.accountStatus || "All"}
//                 </div>
//                 <IconChevronDown className="h-4 w-4 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-48">
//               <DropdownMenuLabel>Account Status</DropdownMenuLabel>

//               {["active", "banned", "suspended"].map((status) => (
//                 <DropdownMenuCheckboxItem
//                   key={status}
//                   className="capitalize"
//                   // This ensures the checkmark appears when this status is selected
//                   checked={filters.accountStatus === status}
//                   onCheckedChange={() => filters.setAccountStatus(status)}
//                 >
//                   {status}
//                 </DropdownMenuCheckboxItem>
//               ))}

//               <DropdownMenuSeparator />

//               <DropdownMenuCheckboxItem
//                 // Shows checked if no specific status is filtered (the "All" state)
//                 checked={!filters.accountStatus || filters.accountStatus === ""}
//                 onCheckedChange={() => filters.setAccountStatus("")}
//               >
//                 All User
//               </DropdownMenuCheckboxItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* PREMIUM FILTER */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="min-w-[120px] justify-between"
//               >
//                 <div className="flex items-center">
//                   <IconFilter className="h-4 w-4 mr-2" />
//                   User Type:{" "}
//                   {filters.isPremium === true
//                     ? "Premium"
//                     : filters.isPremium === false
//                     ? "Free"
//                     : "All"}
//                 </div>
//                 <IconChevronDown className="h-4 w-4 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-48">
//               <DropdownMenuLabel>Membership</DropdownMenuLabel>

//               {/* Using DropdownMenuCheckboxItem for the checkmark effect */}
//               <DropdownMenuCheckboxItem
//                 checked={filters.isPremium === true}
//                 onCheckedChange={() => filters.setIsPremium(true)}
//               >
//                 Premium Only
//               </DropdownMenuCheckboxItem>

//               <DropdownMenuCheckboxItem
//                 checked={filters.isPremium === false}
//                 onCheckedChange={() => filters.setIsPremium(false)}
//               >
//                 Free Only
//               </DropdownMenuCheckboxItem>

//               <DropdownMenuSeparator />

//               <DropdownMenuCheckboxItem
//                 checked={filters.isPremium === undefined}
//                 onCheckedChange={() => filters.setIsPremium(undefined)}
//               >
//                 Show All
//               </DropdownMenuCheckboxItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* COLUMN CUSTOMIZATION */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 <IconLayoutColumns className="h-4 w-4 mr-2" />
//                 Columns <IconChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((c) => c.getCanHide())
//                 .map((column) => (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(v) => column.toggleVisibility(!!v)}
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* ... Table and Pagination UI remain the same ... */}

//       <div className="rounded-md border relative">
//         {isLoading && (
//           <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
//             <IconLoader className="animate-spin text-blue-600" />
//           </div>
//         )}

//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between px-4">
//         <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="flex w-full items-center gap-8 lg:w-fit">
//           <div className="hidden items-center gap-2 lg:flex">
//             <Label htmlFor="rows-per-page" className="text-sm font-medium">
//               Rows per page
//             </Label>
//             <Select
//               value={`${table.getState().pagination.pageSize}`}
//               onValueChange={(value) => {
//                 table.setPageSize(Number(value));
//               }}
//             >
//               <SelectTrigger size="sm" className="w-20" id="rows-per-page">
//                 <SelectValue
//                   placeholder={table.getState().pagination.pageSize}
//                 />
//               </SelectTrigger>
//               <SelectContent side="top">
//                 {[10, 20, 30, 40, 50].map((pageSize) => (
//                   <SelectItem key={pageSize} value={`${pageSize}`}>
//                     {pageSize}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="flex w-fit items-center justify-center text-sm font-medium">
//             Page {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </div>
//           <div className="ml-auto flex items-center gap-2 lg:ml-0">
//             <Button
//               variant="outline"
//               className="hidden h-8 w-8 p-0 lg:flex"
//               onClick={() => table.setPageIndex(0)}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className="sr-only">Go to first page</span>
//               <IconChevronsLeft />
//             </Button>
//             <Button
//               variant="outline"
//               className="size-8"
//               size="icon"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className="sr-only">Go to previous page</span>
//               <IconChevronLeft />
//             </Button>
//             <Button
//               variant="outline"
//               className="size-8"
//               size="icon"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className="sr-only">Go to next page</span>
//               <IconChevronRight />
//             </Button>
//             <Button
//               variant="outline"
//               className="hidden size-8 lg:flex"
//               size="icon"
//               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className="sr-only">Go to last page</span>
//               <IconChevronsRight />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



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
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
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

  // return (
  //   <div className="w-full space-y-6">
  //     <div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border">
  //       {/* Search Input */}
  //       <div className="relative flex-1 max-w-sm">
  //         <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  //         <Input
  //           placeholder={searchPlaceholder}
  //           className="pl-9 bg-background"
  //           value={globalFilter ?? ""}
  //           onChange={(e) => setGlobalFilter(e.target.value)}
  //         />
  //       </div>

  //       <div className="flex items-center gap-2 ml-auto">
  //         {/* COMBINED FILTERS */}
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button
  //               variant="outline"
  //               className="min-w-min justify-between capitalize"
  //             >
  //               <div className="flex items-center truncate">
  //                 <IconFilter className="h-4 w-4 mr-2 shrink-0" />
  //                 Filters:{" "}
  //                 <span className="truncate pl-1">
  //                   {!filters.accountStatus &&
  //                   filters.isPremium === undefined ? (
  //                     "All Users"
  //                   ) : (
  //                     <>
  //                       {filters.accountStatus || "Any Status"}
  //                       {" + "}
  //                       {filters.isPremium === true
  //                         ? "Premium"
  //                         : filters.isPremium === false
  //                         ? "Free"
  //                         : "Any Plan"}
  //                     </>
  //                   )}
  //                 </span>
  //               </div>
  //               <IconChevronDown className="h-4 w-4 opacity-50 shrink-0" />
  //             </Button>
  //           </DropdownMenuTrigger>

  //           <DropdownMenuContent align="end" className="w-56">
  //             {/* SECTION 1: ACCOUNT STATUS */}
  //             <DropdownMenuLabel>Account Status</DropdownMenuLabel>
  //             {["active", "banned", "suspended"].map((status) => (
  //               <DropdownMenuCheckboxItem
  //                 key={status}
  //                 className="capitalize"
  //                 checked={filters.accountStatus === status}
  //                 onCheckedChange={() => filters.setAccountStatus(status)}
  //               >
  //                 {status}
  //               </DropdownMenuCheckboxItem>
  //             ))}
  //             <DropdownMenuCheckboxItem
  //               checked={!filters.accountStatus}
  //               onCheckedChange={() => filters.setAccountStatus("")}
  //             >
  //               All Statuses
  //             </DropdownMenuCheckboxItem>

  //             <DropdownMenuSeparator />

  //             {/* SECTION 2: MEMBERSHIP */}
  //             <DropdownMenuLabel>Membership</DropdownMenuLabel>
  //             <DropdownMenuCheckboxItem
  //               checked={filters.isPremium === true}
  //               onCheckedChange={() => filters.setIsPremium(true)}
  //             >
  //               Premium Only
  //             </DropdownMenuCheckboxItem>
  //             <DropdownMenuCheckboxItem
  //               checked={filters.isPremium === false}
  //               onCheckedChange={() => filters.setIsPremium(false)}
  //             >
  //               Free Only
  //             </DropdownMenuCheckboxItem>
  //             <DropdownMenuCheckboxItem
  //               checked={filters.isPremium === undefined}
  //               onCheckedChange={() => filters.setIsPremium(undefined)}
  //             >
  //               All Tiers
  //             </DropdownMenuCheckboxItem>

  //             {(filters.accountStatus || filters.isPremium !== undefined) && (
  //               <>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem
  //                   className="text-destructive focus:bg-destructive/10 focus:text-destructive"
  //                   onClick={() => {
  //                     filters.setAccountStatus("");
  //                     filters.setIsPremium(undefined);
  //                   }}
  //                 >
  //                   Reset All Filters
  //                 </DropdownMenuItem>
  //               </>
  //             )}
  //           </DropdownMenuContent>
  //         </DropdownMenu>

  //         {/* ACCOUNT STATUS FILTER */}
  //         {/* <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button
  //               variant="outline"
  //               className="min-w-[85px] justify-between capitalize"
  //             >
  //               <div className="flex items-center">
  //                 <IconFilter className="h-4 w-4 mr-2" />
  //                 Status: {filters.accountStatus || "All"}
  //               </div>
  //               <IconChevronDown className="h-4 w-4 opacity-50" />
  //             </Button>
  //           </DropdownMenuTrigger>

  //           <DropdownMenuContent align="end" className="w-48">
  //             <DropdownMenuLabel>Account Status</DropdownMenuLabel>

  //             {["active", "banned", "suspended"].map((status) => (
  //               <DropdownMenuCheckboxItem
  //                 key={status}
  //                 className="capitalize"
  //                 // This ensures the checkmark appears when this status is selected
  //                 checked={filters.accountStatus === status}
  //                 onCheckedChange={() => filters.setAccountStatus(status)}
  //               >
  //                 {status}
  //               </DropdownMenuCheckboxItem>
  //             ))}

  //             <DropdownMenuSeparator />

  //             <DropdownMenuCheckboxItem
  //               // Shows checked if no specific status is filtered (the "All" state)
  //               checked={!filters.accountStatus || filters.accountStatus === ""}
  //               onCheckedChange={() => filters.setAccountStatus("")}
  //             >
  //               All User
  //             </DropdownMenuCheckboxItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu> */}

  //         {/* PREMIUM FILTER */}
  //         {/* <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button
  //               variant="outline"
  //               className="min-w-[120px] justify-between"
  //             >
  //               <div className="flex items-center">
  //                 <IconFilter className="h-4 w-4 mr-2" />
  //                 User Type:{" "}
  //                 {filters.isPremium === true
  //                   ? "Premium"
  //                   : filters.isPremium === false
  //                   ? "Free"
  //                   : "All"}
  //               </div>
  //               <IconChevronDown className="h-4 w-4 opacity-50" />
  //             </Button>
  //           </DropdownMenuTrigger>

  //           <DropdownMenuContent align="end" className="w-48">
  //             <DropdownMenuLabel>Membership</DropdownMenuLabel>

  //             {/* Using DropdownMenuCheckboxItem for the checkmark effect
  //             <DropdownMenuCheckboxItem
  //               checked={filters.isPremium === true}
  //               onCheckedChange={() => filters.setIsPremium(true)}
  //             >
  //               Premium Only
  //             </DropdownMenuCheckboxItem>

  //             <DropdownMenuCheckboxItem
  //               checked={filters.isPremium === false}
  //               onCheckedChange={() => filters.setIsPremium(false)}
  //             >
  //               Free Only
  //             </DropdownMenuCheckboxItem>

  //             <DropdownMenuSeparator />

  //             <DropdownMenuCheckboxItem
  //               checked={filters.isPremium === undefined}
  //               onCheckedChange={() => filters.setIsPremium(undefined)}
  //             >
  //               Show All
  //             </DropdownMenuCheckboxItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu> */}

  //         {/* COLUMN CUSTOMIZATION */}
  //         {/* <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="outline">
  //               <IconLayoutColumns className="h-4 w-4 mr-2" />
  //               Columns <IconChevronDown className="ml-2 h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             {table
  //               .getAllColumns()
  //               .filter((c) => c.getCanHide())
  //               .map((column) => (
  //                 <DropdownMenuCheckboxItem
  //                   key={column.id}
  //                   checked={column.getIsVisible()}
  //                   onCheckedChange={(v) => column.toggleVisibility(!!v)}
  //                 >
  //                   {column.id}
  //                 </DropdownMenuCheckboxItem>
  //               ))}
  //           </DropdownMenuContent>
  //         </DropdownMenu> */}
  //       </div>
  //     </div>

  //     {/* ... Table and Pagination UI remain the same ... */}

  //     <div className="rounded-md border relative">
  //       {/* {isLoading && (
  //         // <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
  //         //   <IconLoader className="animate-spin text-blue-600" />
  //         // </div>

  //         <SimpleLoader />
  //       )} */}

  //       <Table>
  //         <TableHeader>
  //           {table.getHeaderGroups().map((headerGroup) => (
  //             <TableRow key={headerGroup.id}>
  //               {headerGroup.headers.map((header) => (
  //                 <TableHead key={header.id}>
  //                   {header.isPlaceholder
  //                     ? null
  //                     : flexRender(
  //                         header.column.columnDef.header,
  //                         header.getContext()
  //                       )}
  //                 </TableHead>
  //               ))}
  //             </TableRow>
  //           ))}
  //         </TableHeader>
  //         <TableBody>
  //           {table.getRowModel().rows?.length ? (
  //             table.getRowModel().rows.map((row) => (
  //               <TableRow
  //                 key={row.id}
  //                 data-state={row.getIsSelected() && "selected"}
  //               >
  //                 {row.getVisibleCells().map((cell) => (
  //                   <TableCell key={cell.id}>
  //                     {flexRender(
  //                       cell.column.columnDef.cell,
  //                       cell.getContext()
  //                     )}
  //                   </TableCell>
  //                 ))}
  //               </TableRow>
  //             ))
  //           ) : (
  //             <TableRow>
  //               <TableCell
  //                 colSpan={columns.length}
  //                 className="h-24 text-center"
  //               >
  //                 {isLoading ? (
  //                   <SimpleLoader text={"Loading..."} />
  //                 ) : (
  //                   "No results."
  //                 )}
  //               </TableCell>
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //     </div>

  //     {/* Pagination Controls */}
  //     <div className="flex items-center justify-between bg-muted/50 px-4 py-3 rounded-b-lg">
  //       {/* LEFT: Total Records Count */}
  //       {/* <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
  //         {table.getFilteredSelectedRowModel().rows.length} of{" "}
  //         {table.getFilteredRowModel().rows.length} row(s) selected.
  //       </div> */}
  //       <div className="text-sm text-muted-foreground font-medium">
  //         Total <span className="text-foreground"> ({rowCount}) </span> users
  //         found
  //       </div>

  //       {/* RIGHT: Controls */}
  //       <div className="flex items-center gap-4 lg:gap-6">
  //         {/* Rows per page */}
  //         <div className="hidden items-center gap-2 lg:flex">
  //           <Label
  //             htmlFor="rows-per-page"
  //             className="text-sm font-semibold tracking-wider text-foreground"
  //           >
  //             Rows per page
  //           </Label>

  //           <Select
  //             value={`${table.getState().pagination.pageSize}`}
  //             onValueChange={(value) => table.setPageSize(Number(value))}
  //           >
  //             <SelectTrigger
  //               className="h-8 w-[70px] bg-background shadow-sm"
  //               id="rows-per-page"
  //             >
  //               <SelectValue
  //                 placeholder={table.getState().pagination.pageSize}
  //               />
  //             </SelectTrigger>
  //             <SelectContent side="top" className="min-w-[70px]">
  //               {[10, 20, 30, 40, 50, 100].map((pageSize) => (
  //                 <SelectItem key={pageSize} value={`${pageSize}`}>
  //                   {pageSize}
  //                 </SelectItem>
  //               ))}
  //             </SelectContent>
  //           </Select>
  //         </div>

  //         {/* Page Indicator */}
  //         <div className="flex items-center justify-center text-sm font-medium min-w-[100px]">
  //           Page {table.getState().pagination.pageIndex + 1} of{" "}
  //           {table.getPageCount()}
  //         </div>

  //         {/* Navigation Buttons */}
  //         <div className="flex items-center gap-1">
  //           <Button
  //             variant="outline"
  //             size="icon"
  //             className="hidden h-8 w-8 lg:flex shadow-sm bg-background"
  //             onClick={() => table.setPageIndex(0)}
  //             disabled={!table.getCanPreviousPage()}
  //           >
  //             <IconChevronsLeft className="h-4 w-4" />
  //           </Button>

  //           <Button
  //             variant="outline"
  //             size="icon"
  //             className="h-8 w-8 shadow-sm bg-background"
  //             onClick={() => table.previousPage()}
  //             disabled={!table.getCanPreviousPage()}
  //           >
  //             <IconChevronLeft className="h-4 w-4" />
  //           </Button>

  //           <Button
  //             variant="outline"
  //             size="icon"
  //             className="h-8 w-8 shadow-sm bg-background"
  //             onClick={() => table.nextPage()}
  //             disabled={!table.getCanNextPage()}
  //           >
  //             <IconChevronRight className="h-4 w-4" />
  //           </Button>

  //           <Button
  //             variant="outline"
  //             size="icon"
  //             className="hidden h-8 w-8 lg:flex shadow-sm bg-background"
  //             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
  //             disabled={!table.getCanNextPage()}
  //           >
  //             <IconChevronsRight className="h-4 w-4" />
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  //   return (
  //     <div className="w-full space-y-4">
  //       {/* TOOLBAR */}
  //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
  //         <div className="relative flex-1 max-w-sm w-full">
  //           <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
  //           <Input
  //             placeholder={searchPlaceholder}
  //             className="pl-9 bg-white border-slate-200 h-10 shadow-sm focus-visible:ring-indigo-500"
  //             value={globalFilter ?? ""}
  //             onChange={(e) => setGlobalFilter(e.target.value)}
  //           />
  //         </div>
  //         {/* TOOLBAR CONTAINER */}
  //         <div className="flex flex-col gap-4">
  //           <div className="flex flex-wrap items-center justify-between gap-4">
  //             {/* Left Side: Search & Chips */}
  //             <div className="flex flex-1 flex-wrap items-center gap-3 min-w-0">
  //               {/* Search Input */}
  //               {/* <div className="relative w-full max-w-sm">
  //                 <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
  //                 <Input
  //                   placeholder={searchPlaceholder}
  //                   className="pl-9 bg-white h-10 shadow-sm"
  //                   value={globalFilter ?? ""}
  //                   onChange={(e) => setGlobalFilter(e.target.value)}
  //                 />
  //               </div> */}

  //               {/* --- FILTER CHIPS SECTION --- */}
  //               <div className="flex flex-wrap items-center gap-2">
  //                 <AnimatePresence>
  //                   {/* Account Status Chip */}
  //                   {filters.accountStatus && (
  //                     <motion.div
  //                       initial={{ opacity: 0, scale: 0.8 }}
  //                       animate={{ opacity: 1, scale: 1 }}
  //                       exit={{ opacity: 0, scale: 0.8 }}
  //                     >
  //                       <Badge
  //                         variant="secondary"
  //                         className="pl-2 pr-1 py-1 gap-1 bg-indigo-50 text-indigo-700 border-indigo-100 group hover:bg-indigo-100 transition-colors"
  //                       >
  //                         <span className="text-[10px] font-bold uppercase opacity-60">
  //                           Status:
  //                         </span>
  //                         <span className="capitalize">
  //                           {filters.accountStatus}
  //                         </span>
  //                         <button
  //                           onClick={() => filters.setAccountStatus("")}
  //                           className="ml-1 p-0.5 rounded-full hover:bg-indigo-200 text-indigo-400 hover:text-indigo-600 transition-all"
  //                         >
  //                           <IconX size={12} />
  //                         </button>
  //                       </Badge>
  //                     </motion.div>
  //                   )}

  //                   {/* Premium Tier Chip */}
  //                   {filters.isPremium !== undefined && (
  //                     <motion.div
  //                       initial={{ opacity: 0, scale: 0.8 }}
  //                       animate={{ opacity: 1, scale: 1 }}
  //                       exit={{ opacity: 0, scale: 0.8 }}
  //                     >
  //                       <Badge
  //                         variant="secondary"
  //                         className="pl-2 pr-1 py-1 gap-1 bg-amber-50 text-amber-700 border-amber-100 group hover:bg-amber-100 transition-colors"
  //                       >
  //                         <span className="text-[10px] font-bold uppercase opacity-60">
  //                           Plan:
  //                         </span>
  //                         <span>{filters.isPremium ? "Premium" : "Free"}</span>
  //                         <button
  //                           onClick={() => filters.setIsPremium(undefined)}
  //                           className="ml-1 p-0.5 rounded-full hover:bg-amber-200 text-amber-400 hover:text-amber-600 transition-all"
  //                         >
  //                           <IconX size={12} />
  //                         </button>
  //                       </Badge>
  //                     </motion.div>
  //                   )}

  //                   {/* Reset All (Only shows if 2+ filters are active) */}
  //                   {filters.accountStatus && filters.isPremium !== undefined && (
  //                     <Button
  //                       variant="ghost"
  //                       size="sm"
  //                       onClick={() => {
  //                         filters.setAccountStatus("");
  //                         filters.setIsPremium(undefined);
  //                       }}
  //                       className="h-7 px-2 text-[11px] font-bold text-slate-400 hover:text-rose-600"
  //                     >
  //                       Clear All
  //                     </Button>
  //                   )}
  //                 </AnimatePresence>
  //               </div>
  //             </div>

  //             {/* Right Side: Filter Dropdown Trigger */}
  //             <div className="flex items-center gap-2">
  //               <DropdownMenu>
  //                 <DropdownMenuTrigger asChild>
  //                   <Button
  //                     variant="outline"
  //                     size="sm"
  //                     className={cn(
  //                       "h-10 border-dashed border-slate-300",
  //                       hasActiveFilters &&
  //                         "border-indigo-500 bg-indigo-50/30 ring-1 ring-indigo-500/20"
  //                     )}
  //                   >
  //                     <IconFilter
  //                       className={cn(
  //                         "h-4 w-4 mr-2",
  //                         hasActiveFilters ? "text-indigo-600" : "text-slate-500"
  //                       )}
  //                     />
  //                     Filter View
  //                   </Button>
  //                 </DropdownMenuTrigger>
  //                 <DropdownMenuContent align="end" className="w-56 p-2">
  //                   <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
  //                     Account Status
  //                   </DropdownMenuLabel>
  //                   {["active", "banned", "suspended"].map((status) => (
  //                     <DropdownMenuCheckboxItem
  //                       key={status}
  //                       className="capitalize"
  //                       checked={filters.accountStatus === status}
  //                       onCheckedChange={() => filters.setAccountStatus(status)}
  //                     >
  //                       {status}
  //                     </DropdownMenuCheckboxItem>
  //                   ))}
  //                   <DropdownMenuSeparator />
  //                   <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
  //                     Plan Type
  //                   </DropdownMenuLabel>
  //                   <DropdownMenuCheckboxItem
  //                     checked={filters.isPremium === true}
  //                     onCheckedChange={() => filters.setIsPremium(true)}
  //                   >
  //                     Premium Only
  //                   </DropdownMenuCheckboxItem>
  //                   <DropdownMenuCheckboxItem
  //                     checked={filters.isPremium === false}
  //                     onCheckedChange={() => filters.setIsPremium(false)}
  //                   >
  //                     Free Only
  //                   </DropdownMenuCheckboxItem>

  //                   {hasActiveFilters && (
  //                     <>
  //                       <DropdownMenuSeparator />
  //                       <DropdownMenuItem
  //                         className="text-red-600 justify-center font-medium focus:bg-red-50 focus:text-red-700"
  //                         onClick={() => {
  //                           filters.setAccountStatus("");
  //                           filters.setIsPremium(undefined);
  //                         }}
  //                       >
  //                         Clear All Filters
  //                       </DropdownMenuItem>
  //                     </>
  //                   )}
  //                 </DropdownMenuContent>
  //               </DropdownMenu>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* TABLE AREA */}
  //       <div className="rounded-xl border border-slate-200 bg-white shadow-sm relative">
  //         <Table>
  //           <TableHeader className="bg-slate-50/50">
  //             {table.getHeaderGroups().map((headerGroup) => (
  //               <TableRow key={headerGroup.id} className="hover:bg-transparent">
  //                 {headerGroup.headers.map((header) => (
  //                   <TableHead
  //                     key={header.id}
  //                     className="text-slate-600 font-semibold py-4"
  //                   >
  //                     {header.isPlaceholder
  //                       ? null
  //                       : flexRender(
  //                           header.column.columnDef.header,
  //                           header.getContext()
  //                         )}
  //                   </TableHead>
  //                 ))}
  //               </TableRow>
  //             ))}
  //           </TableHeader>
  //           <TableBody
  //             className={
  //               isLoading ? "opacity-40 transition-opacity" : "transition-opacity"
  //             }
  //           >
  //             {table.getRowModel().rows?.length ? (
  //               table.getRowModel().rows.map((row) => (
  //                 <TableRow
  //                   key={row.id}
  //                   className="hover:bg-slate-50/50 border-slate-100"
  //                 >
  //                   {row.getVisibleCells().map((cell) => (
  //                     <TableCell key={cell.id} className="py-3 px-4">
  //                       {flexRender(
  //                         cell.column.columnDef.cell,
  //                         cell.getContext()
  //                       )}
  //                     </TableCell>
  //                   ))}
  //                 </TableRow>
  //               ))
  //             ) : (
  //               <TableRow>
  //                 <TableCell
  //                   colSpan={columns.length}
  //                   className="h-64 text-center"
  //                 >
  //                   {isLoading ? (
  //                     <SimpleLoader text="Fetching data..." />
  //                   ) : (
  //                     <div className="flex flex-col items-center justify-center text-slate-400 space-y-2">
  //                       <IconInbox size={48} stroke={1} />
  //                       <p className="text-sm font-medium">
  //                         No results found for your search
  //                       </p>
  //                     </div>
  //                   )}
  //                 </TableCell>
  //               </TableRow>
  //             )}
  //           </TableBody>
  //         </Table>
  //       </div>

  //       {/* PAGINATION SECTION */}
  //       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2">
  //         <div className="text-sm text-slate-500 font-medium order-2 sm:order-1">
  //           Showing <span className="text-slate-900">{data.length}</span> of{" "}
  //           <span className="text-slate-900">{rowCount}</span> users
  //         </div>

  //         <div className="flex items-center gap-4 lg:gap-8 order-1 sm:order-2">
  //           <div className="hidden sm:flex items-center gap-2">
  //             <Label className="text-xs font-bold text-slate-400 uppercase">
  //               Rows
  //             </Label>
  //             <Select
  //               value={`${table.getState().pagination.pageSize}`}
  //               onValueChange={(value) => table.setPageSize(Number(value))}
  //             >
  //               <SelectTrigger className="h-9 w-[70px] border-slate-200 shadow-none">
  //                 <SelectValue />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 {[10, 20, 50].map((size) => (
  //                   <SelectItem key={size} value={`${size}`}>
  //                     {size}
  //                   </SelectItem>
  //                 ))}
  //               </SelectContent>
  //             </Select>
  //           </div>

  //           {/* Navigation Buttons */}
  //           <div className="flex items-center gap-1">
  //             <Button
  //               variant="outline"
  //               size="icon"
  //               className="hidden h-8 w-8 lg:flex shadow-sm bg-background"
  //               onClick={() => table.setPageIndex(0)}
  //               disabled={!table.getCanPreviousPage()}
  //             >
  //               <IconChevronsLeft className="h-4 w-4" />
  //             </Button>

  //             <Button
  //               variant="outline"
  //               size="icon"
  //               className="h-8 w-8 shadow-sm bg-background"
  //               onClick={() => table.previousPage()}
  //               disabled={!table.getCanPreviousPage()}
  //             >
  //               <IconChevronLeft className="h-4 w-4" />
  //             </Button>

  //             {/* Page Indicator */}
  //             <div className="flex items-center justify-center text-sm font-medium min-w-[80px]">
  //               Page {table.getState().pagination.pageIndex + 1} of{" "}
  //               {table.getPageCount()}
  //             </div>

  //             <Button
  //               variant="outline"
  //               size="icon"
  //               className="h-8 w-8 shadow-sm bg-background"
  //               onClick={() => table.nextPage()}
  //               disabled={!table.getCanNextPage()}
  //             >
  //               <IconChevronRight className="h-4 w-4" />
  //             </Button>

  //             <Button
  //               variant="outline"
  //               size="icon"
  //               className="hidden h-8 w-8 lg:flex shadow-sm bg-background"
  //               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
  //               disabled={!table.getCanNextPage()}
  //             >
  //               <IconChevronsRight className="h-4 w-4" />
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full space-y-4">
      {/* --- TOOLBAR SECTION --- */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row md:items-center justify-between gap-4 bg-slate-50/50 p-2 rounded-xl">
          {/* 1. LEFT SIDE: Search Input */}
          <div className="relative w-3/4 md:w-64 lg:w-1/2">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-9 bg-white border-slate-200 h-12 shadow-md focus-visible:ring-indigo-600 rounded-lg"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
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
                      className="pl-2 pr-1 py-1 gap-1 bg-indigo-100 text-indigo-700 border-indigo-100 shadow-sm whitespace-nowrap"
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
                      className="pl-2 pr-1 py-1 gap-1 bg-amber-100 text-amber-700 border-amber-100 shadow-sm whitespace-nowrap"
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
                      "h-12 border-slate-200 shadow-sm bg-white transition-all whitespace-nowrap",
                      hasActiveFilters &&
                        "border-indigo-500 ring-1 ring-indigo-50"
                    )}
                  >
                    <IconFilter
                      className={cn(
                        "h-4 w-4 mr-2",
                        hasActiveFilters ? "text-indigo-600" : "text-slate-500"
                      )}
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Filters
                    </span>
                    {hasActiveFilters && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white font-bold">
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

      {/* 1. Mobile View: Stacked Cards (Hidden on Desktop) */}
      {/* <div className="grid grid-cols-1 gap-4 md:hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <SimpleLoader />
          </div>
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3"
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className="flex justify-between items-start border-b border-slate-50 pb-2 last:border-0"
                >
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {cell.column.columnDef.header}
                  </span>
                  <div className="text-sm font-medium text-slate-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-400">
            No results.
          </div>
        )}
      </div> */}

      {/* 2. Desktop View: Standard Table (Hidden on Mobile) */}
      <div className="block rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-600 font-semibold h-10 bg-grey-100"
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