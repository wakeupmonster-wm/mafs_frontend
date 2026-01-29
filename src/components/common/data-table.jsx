import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, // Important
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

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
  IconLayoutColumns,
  IconLoader,
  IconSearch,
} from "@tabler/icons-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// export function DataTable({
//   // columns,
//   // data,
//   // searchPlaceholder = "Search all columns...",
//   // globalFilter,
//   // setGlobalFilter,
//   columns,
//   data,
//   rowCount, // Total count from API
//   pagination, // { pageIndex, pageSize }
//   onPaginationChange,
//   searchPlaceholder = "Search all columns...",
//   globalFilter,
//   setGlobalFilter,
//   isLoading,
//   meta,
// }) {
//   const [sorting, setSorting] = React.useState([]);
//   const [columnVisibility, setColumnVisibility] = React.useState({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [columnFilters, setColumnFilters] = React.useState([
//     { id: "status", value: "active" },
//   ]);

//   // const table = useReactTable({
//   //   data,
//   //   columns,
//   //   onSortingChange: setSorting,
//   //   onGlobalFilterChange: setGlobalFilter, // Update global filter
//   //   getCoreRowModel: getCoreRowModel(),
//   //   getPaginationRowModel: getPaginationRowModel(),
//   //   getSortedRowModel: getSortedRowModel(),
//   //   getFilteredRowModel: getFilteredRowModel(), // Required for filtering
//   //   onColumnVisibilityChange: setColumnVisibility,
//   //   onRowSelectionChange: setRowSelection,
//   //   state: {
//   //     sorting,
//   //     globalFilter, // Bind state
//   //     columnVisibility,
//   //     rowSelection,
//   //   },
//   // });

//   const table = useReactTable({
//     data,
//     columns,
//     rowCount,
//     manualPagination: true, // 3️⃣ Disable client-side pagination
//     state: {
//       pagination,
//       globalFilter,
//     },
//     onPaginationChange, // 4️⃣ Capture page changes
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     // getPaginationRowModel: getPaginationRowModel(), // 5️⃣ Remove this
//     manualFiltering: true, // Enable manual filtering for API search
//     meta: meta,
//   });

//   return (
//     <div className="w-full space-y-6">
//       {/* SEARCH TOOLBAR */}
//       <div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border">
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
//           {/* --- NEW STATUS FILTER DROPDOWN --- */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 <IconFilter className="h-4 w-4 mr-2" /> Filters
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-48">
//               <DropdownMenuLabel>Status</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               {/* You can manage this state via table.getColumn("status").setFilterValue() */}
//               <DropdownMenuCheckboxItem
//                 checked={
//                   table.getColumn("status")?.getFilterValue() === "active"
//                 }
//                 onCheckedChange={() =>
//                   table.getColumn("status")?.setFilterValue("active")
//                 }
//               >
//                 Active
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 checked={
//                   table.getColumn("status")?.getFilterValue() === "banned"
//                 }
//                 onCheckedChange={() =>
//                   table.getColumn("status")?.setFilterValue("banned")
//                 }
//               >
//                 Banned
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 checked={
//                   table.getColumn("status")?.getFilterValue() === "suspended"
//                 }
//                 onCheckedChange={() =>
//                   table.getColumn("status")?.setFilterValue("suspended")
//                 }
//               >
//                 Suspended
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() =>
//                   table.getColumn("status")?.setFilterValue(undefined)
//                 }
//               >
//                 Clear Filter
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* --- EXISTING COLUMN CUSTOMIZATION --- */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 <IconLayoutColumns className="h-4 w-4 mr-2" />
//                 <span className="hidden lg:inline">Customize Columns</span>
//                 <span className="lg:hidden">Columns</span>
//                 <IconChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   const header = column.columnDef.header;
//                   const title = typeof header === "string" ? header : column.id;

//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {title}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

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

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between px-4">
//         <div className="flex w-full items-center gap-8 lg:w-fit">
//           <div className="flex items-center gap-2">
//             <p className="text-sm font-medium">Rows per page</p>
//             <Select
//               value={`${pagination.pageSize}`}
//               onValueChange={(value) => table.setPageSize(Number(value))}
//             >
//               <SelectTrigger className="h-8 w-[70px]">
//                 <SelectValue placeholder={pagination.pageSize} />
//               </SelectTrigger>
//               <SelectContent side="top">
//                 {[10, 20, 30, 40, 50].map((size) => (
//                   <SelectItem key={size} value={`${size}`}>
//                     {size}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="text-sm font-medium">
//             Page {pagination.pageIndex + 1} of {table.getPageCount()}
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <IconChevronLeft />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <IconChevronRight />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const table = useReactTable({
    data,
    columns,
    rowCount,
    manualPagination: true,
    manualFiltering: true,
    state: { pagination, globalFilter },
    onPaginationChange,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    meta: meta,
  });

  console.log("globalFilter: ", globalFilter);
  console.log("pagination: ", pagination);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9 bg-background"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* ACCOUNT STATUS FILTER */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[85px] justify-between capitalize"
              >
                <div className="flex items-center">
                  <IconFilter className="h-4 w-4 mr-2" />
                  Status: {filters.accountStatus || "All"}
                </div>
                <IconChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Account Status</DropdownMenuLabel>

              {["active", "banned", "suspended"].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  className="capitalize"
                  // This ensures the checkmark appears when this status is selected
                  checked={filters.accountStatus === status}
                  onCheckedChange={() => filters.setAccountStatus(status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                // Shows checked if no specific status is filtered (the "All" state)
                checked={!filters.accountStatus || filters.accountStatus === ""}
                onCheckedChange={() => filters.setAccountStatus("")}
              >
                All User
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* PREMIUM FILTER */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[120px] justify-between"
              >
                <div className="flex items-center">
                  <IconFilter className="h-4 w-4 mr-2" />
                  User Type:{" "}
                  {filters.isPremium === true
                    ? "Premium"
                    : filters.isPremium === false
                    ? "Free"
                    : "All"}
                </div>
                <IconChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Membership</DropdownMenuLabel>

              {/* Using DropdownMenuCheckboxItem for the checkmark effect */}
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

              <DropdownMenuCheckboxItem
                checked={filters.isPremium === undefined}
                onCheckedChange={() => filters.setIsPremium(undefined)}
              >
                Show All
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* COLUMN CUSTOMIZATION */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <IconLayoutColumns className="h-4 w-4 mr-2" />
                Columns <IconChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((c) => c.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(v) => column.toggleVisibility(!!v)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ... Table and Pagination UI remain the same ... */}

      <div className="rounded-md border relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <IconLoader className="animate-spin text-blue-600" />
          </div>
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
