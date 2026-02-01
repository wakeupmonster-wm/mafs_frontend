// import * as React from "react";
// import {
//   closestCenter,
//   DndContext,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import {
//   arrayMove,
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import {
//   IconChevronDown,
//   IconChevronLeft,
//   IconChevronRight,
//   IconChevronsLeft,
//   IconChevronsRight,
//   IconCircleCheckFilled,
//   IconDotsVertical,
//   IconGripVertical,
//   IconLayoutColumns,
//   IconLoader,
//   IconPlus,
//   IconTrendingUp,
// } from "@tabler/icons-react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import { toast } from "sonner";
// import { z } from "zod";

// import { useIsMobile } from "@/hooks/use-mobile";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export const schema = z.object({
//   id: z.number(),
//   header: z.string(),
//   type: z.string(),
//   status: z.string(),
//   target: z.string(),
//   limit: z.string(),
//   reviewer: z.string(),
// });

// // Create a separate component for the drag handle
// function DragHandle({ id }) {
//   const { attributes, listeners } = useSortable({
//     id,
//   });

//   return (
//     <Button
//       {...attributes}
//       {...listeners}
//       variant="ghost"
//       size="icon"
//       className="text-muted-foreground size-7 hover:bg-transparent"
//     >
//       <IconGripVertical className="text-muted-foreground size-3" />
//       <span className="sr-only">Drag to reorder</span>
//     </Button>
//   );
// }

// const columns = [
//   {
//     id: "drag",
//     header: () => null,
//     cell: ({ row }) => <DragHandle id={row.original.id} />,
//   },
//   {
//     id: "select",
//     header: ({ table }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && "indeterminate")
//           }
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       </div>
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "header",
//     header: "Header",
//     cell: ({ row }) => {
//       return <TableCellViewer item={row.original} />;
//     },
//     enableHiding: false,
//   },
//   {
//     accessorKey: "type",
//     header: "Section Type",
//     cell: ({ row }) => (
//       <div className="w-32">
//         <Badge variant="outline" className="text-muted-foreground px-1.5">
//           {row.original.type}
//         </Badge>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <Badge variant="outline" className="text-muted-foreground px-1.5">
//         {row.original.status === "Done" ? (
//           <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
//         ) : (
//           <IconLoader />
//         )}
//         {row.original.status}
//       </Badge>
//     ),
//   },
//   {
//     accessorKey: "target",
//     header: () => <div className="w-full text-right">Target</div>,
//     cell: ({ row }) => (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//             loading: `Saving ${row.original.header}`,
//             success: "Done",
//             error: "Error",
//           });
//         }}
//       >
//         <Label htmlFor={`${row.original.id}-target`} className="sr-only">
//           Target
//         </Label>
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.target}
//           id={`${row.original.id}-target`}
//         />
//       </form>
//     ),
//   },
//   {
//     accessorKey: "limit",
//     header: () => <div className="w-full text-right">Limit</div>,
//     cell: ({ row }) => (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//             loading: `Saving ${row.original.header}`,
//             success: "Done",
//             error: "Error",
//           });
//         }}
//       >
//         <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
//           Limit
//         </Label>
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.limit}
//           id={`${row.original.id}-limit`}
//         />
//       </form>
//     ),
//   },
//   {
//     accessorKey: "reviewer",
//     header: "Reviewer",
//     cell: ({ row }) => {
//       const isAssigned = row.original.reviewer !== "Assign reviewer";

//       if (isAssigned) {
//         return row.original.reviewer;
//       }

//       return (
//         <>
//           <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
//             Reviewer
//           </Label>
//           <Select>
//             <SelectTrigger
//               className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
//               size="sm"
//               id={`${row.original.id}-reviewer`}
//             >
//               <SelectValue placeholder="Assign reviewer" />
//             </SelectTrigger>
//             <SelectContent align="end">
//               <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
//               <SelectItem value="Jamik Tashpulatov">
//                 Jamik Tashpulatov
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </>
//       );
//     },
//   },
//   {
//     id: "actions",
//     cell: () => (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
//             size="icon"
//           >
//             <IconDotsVertical />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-32">
//           <DropdownMenuItem>Edit</DropdownMenuItem>
//           <DropdownMenuItem>Make a copy</DropdownMenuItem>
//           <DropdownMenuItem>Favorite</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     ),
//   },
// ];

// function DraggableRow({ row }) {
//   const { transform, transition, setNodeRef, isDragging } = useSortable({
//     id: row.original.id,
//   });

//   return (
//     <TableRow
//       data-state={row.getIsSelected() && "selected"}
//       data-dragging={isDragging}
//       ref={setNodeRef}
//       className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition: transition,
//       }}
//     >
//       {row.getVisibleCells().map((cell) => (
//         <TableCell key={cell.id}>
//           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

// export function DataTable({ data: initialData }) {
//   const [data, setData] = React.useState(() => initialData);
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [columnVisibility, setColumnVisibility] = React.useState({});
//   const [columnFilters, setColumnFilters] = React.useState([]);
//   const [sorting, setSorting] = React.useState([]);
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const sortableId = React.useId();
//   const sensors = useSensors(
//     useSensor(MouseSensor, {}),
//     useSensor(TouchSensor, {}),
//     useSensor(KeyboardSensor, {})
//   );

//   const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data]);

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters,
//       pagination,
//     },
//     getRowId: (row) => row.id.toString(),
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//   });

//   function handleDragEnd(event) {
//     const { active, over } = event;
//     if (active && over && active.id !== over.id) {
//       setData((data) => {
//         const oldIndex = dataIds.indexOf(active.id);
//         const newIndex = dataIds.indexOf(over.id);
//         return arrayMove(data, oldIndex, newIndex);
//       });
//     }
//   }

//   return (
//     <Tabs
//       defaultValue="outline"
//       className="w-full flex-col justify-start gap-6"
//     >
//       <div className="flex items-center justify-between px-4 lg:px-6">
//         <Label htmlFor="view-selector" className="sr-only">
//           View
//         </Label>
//         <Select defaultValue="outline">
//           <SelectTrigger
//             className="flex w-fit @4xl/main:hidden"
//             size="sm"
//             id="view-selector"
//           >
//             <SelectValue placeholder="Select a view" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="outline">Outline</SelectItem>
//             <SelectItem value="past-performance">Past Performance</SelectItem>
//             <SelectItem value="key-personnel">Key Personnelll</SelectItem>
//             <SelectItem value="focus-documents">Focus Documents</SelectItem>
//           </SelectContent>
//         </Select>
//         <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
//           <TabsTrigger value="outline">Outline</TabsTrigger>
//           <TabsTrigger value="past-performance">
//             Past Performance <Badge variant="secondary">3</Badge>
//           </TabsTrigger>
//           <TabsTrigger value="key-personnel">
//             Key Personnellll <Badge variant="secondary">2</Badge>
//           </TabsTrigger>
//           <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
//         </TabsList>
//         <div className="flex items-center gap-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="sm">
//                 <IconLayoutColumns />
//                 <span className="hidden lg:inline">Customize Columns</span>
//                 <span className="lg:hidden">Columns</span>
//                 <IconChevronDown />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               {table
//                 .getAllColumns()
//                 .filter(
//                   (column) =>
//                     typeof column.accessorFn !== "undefined" &&
//                     column.getCanHide()
//                 )
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <Button variant="outline" size="sm">
//             <IconPlus />
//             <span className="hidden lg:inline">Add Section</span>
//           </Button>
//         </div>
//       </div>
//       <TabsContent
//         value="outline"
//         className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
//       >
//         <div className="overflow-hidden rounded-lg border">
//           <DndContext
//             collisionDetection={closestCenter}
//             modifiers={[restrictToVerticalAxis]}
//             onDragEnd={handleDragEnd}
//             sensors={sensors}
//             id={sortableId}
//           >
//             <Table>
//               <TableHeader className="bg-muted sticky top-0 z-10">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => {
//                       return (
//                         <TableHead key={header.id} colSpan={header.colSpan}>
//                           {header.isPlaceholder
//                             ? null
//                             : flexRender(
//                                 header.column.columnDef.header,
//                                 header.getContext()
//                               )}
//                         </TableHead>
//                       );
//                     })}
//                   </TableRow>
//                 ))}
//               </TableHeader>
//               <TableBody className="**:data-[slot=table-cell]:first:w-8">
//                 {table.getRowModel().rows?.length ? (
//                   <SortableContext
//                     items={dataIds}
//                     strategy={verticalListSortingStrategy}
//                   >
//                     {table.getRowModel().rows.map((row) => (
//                       <DraggableRow key={row.id} row={row} />
//                     ))}
//                   </SortableContext>
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={columns.length}
//                       className="h-24 text-center"
//                     >
//                       No results.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </DndContext>
//         </div>
        
//         <div className="flex items-center justify-between px-4">
//           <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </div>
//           <div className="flex w-full items-center gap-8 lg:w-fit">
//             <div className="hidden items-center gap-2 lg:flex">
//               <Label htmlFor="rows-per-page" className="text-sm font-medium">
//                 Rows per page
//               </Label>
//               <Select
//                 value={`${table.getState().pagination.pageSize}`}
//                 onValueChange={(value) => {
//                   table.setPageSize(Number(value));
//                 }}
//               >
//                 <SelectTrigger size="sm" className="w-20" id="rows-per-page">
//                   <SelectValue
//                     placeholder={table.getState().pagination.pageSize}
//                   />
//                 </SelectTrigger>
//                 <SelectContent side="top">
//                   {[10, 20, 30, 40, 50].map((pageSize) => (
//                     <SelectItem key={pageSize} value={`${pageSize}`}>
//                       {pageSize}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex w-fit items-center justify-center text-sm font-medium">
//               Page {table.getState().pagination.pageIndex + 1} of{" "}
//               {table.getPageCount()}
//             </div>
//             <div className="ml-auto flex items-center gap-2 lg:ml-0">
//               <Button
//                 variant="outline"
//                 className="hidden h-8 w-8 p-0 lg:flex"
//                 onClick={() => table.setPageIndex(0)}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 <span className="sr-only">Go to first page</span>
//                 <IconChevronsLeft />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="size-8"
//                 size="icon"
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 <span className="sr-only">Go to previous page</span>
//                 <IconChevronLeft />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="size-8"
//                 size="icon"
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//               >
//                 <span className="sr-only">Go to next page</span>
//                 <IconChevronRight />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="hidden size-8 lg:flex"
//                 size="icon"
//                 onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//                 disabled={!table.getCanNextPage()}
//               >
//                 <span className="sr-only">Go to last page</span>
//                 <IconChevronsRight />
//               </Button>
//             </div>
//           </div>
//         </div>

//       </TabsContent>

//       <TabsContent
//         value="past-performance"
//         className="flex flex-col px-4 lg:px-6"
//       >
//         <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
//       </TabsContent>
//       <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
//         <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
//       </TabsContent>
//       <TabsContent
//         value="focus-documents"
//         className="flex flex-col px-4 lg:px-6"
//       >
//         <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
//       </TabsContent>
//     </Tabs>
//   );
// }

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--primary)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--primary)",
//   },
// };

// function TableCellViewer({ item }) {
//   const isMobile = useIsMobile();

//   return (
//     <Drawer direction={isMobile ? "bottom" : "right"}>
//       <DrawerTrigger asChild>
//         <Button variant="link" className="text-foreground w-fit px-0 text-left">
//           {item.header}
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader className="gap-1">
//           <DrawerTitle>{item.header}</DrawerTitle>
//           <DrawerDescription>
//             Showing total visitors for the last 6 months
//           </DrawerDescription>
//         </DrawerHeader>
//         <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
//           {!isMobile && (
//             <>
//               <ChartContainer config={chartConfig}>
//                 <AreaChart
//                   accessibilityLayer
//                   data={chartData}
//                   margin={{
//                     left: 0,
//                     right: 10,
//                   }}
//                 >
//                   <CartesianGrid vertical={false} />
//                   <XAxis
//                     dataKey="month"
//                     tickLine={false}
//                     axisLine={false}
//                     tickMargin={8}
//                     tickFormatter={(value) => value.slice(0, 3)}
//                     hide
//                   />
//                   <ChartTooltip
//                     cursor={false}
//                     content={<ChartTooltipContent indicator="dot" />}
//                   />
//                   <Area
//                     dataKey="mobile"
//                     type="natural"
//                     fill="var(--color-mobile)"
//                     fillOpacity={0.6}
//                     stroke="var(--color-mobile)"
//                     stackId="a"
//                   />
//                   <Area
//                     dataKey="desktop"
//                     type="natural"
//                     fill="var(--color-desktop)"
//                     fillOpacity={0.4}
//                     stroke="var(--color-desktop)"
//                     stackId="a"
//                   />
//                 </AreaChart>
//               </ChartContainer>
//               <Separator />
//               <div className="grid gap-2">
//                 <div className="flex gap-2 leading-none font-medium">
//                   Trending up by 5.2% this month{" "}
//                   <IconTrendingUp className="size-4" />
//                 </div>
//                 <div className="text-muted-foreground">
//                   Showing total visitors for the last 6 months. This is just
//                   some random text to test the layout. It spans multiple lines
//                   and should wrap around.
//                 </div>
//               </div>
//               <Separator />
//             </>
//           )}
//           <form className="flex flex-col gap-4">
//             <div className="flex flex-col gap-3">
//               <Label htmlFor="header">Header</Label>
//               <Input id="header" defaultValue={item.header} />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="type">Type</Label>
//                 <Select defaultValue={item.type}>
//                   <SelectTrigger id="type" className="w-full">
//                     <SelectValue placeholder="Select a type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Table of Contents">
//                       Table of Contents
//                     </SelectItem>
//                     <SelectItem value="Executive Summary">
//                       Executive Summary
//                     </SelectItem>
//                     <SelectItem value="Technical Approach">
//                       Technical Approach
//                     </SelectItem>
//                     <SelectItem value="Design">Design</SelectItem>
//                     <SelectItem value="Capabilities">Capabilities</SelectItem>
//                     <SelectItem value="Focus Documents">
//                       Focus Documents
//                     </SelectItem>
//                     <SelectItem value="Narrative">Narrative</SelectItem>
//                     <SelectItem value="Cover Page">Cover Page</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="status">Status</Label>
//                 <Select defaultValue={item.status}>
//                   <SelectTrigger id="status" className="w-full">
//                     <SelectValue placeholder="Select a status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Done">Done</SelectItem>
//                     <SelectItem value="In Progress">In Progress</SelectItem>
//                     <SelectItem value="Not Started">Not Started</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="target">Target</Label>
//                 <Input id="target" defaultValue={item.target} />
//               </div>
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="limit">Limit</Label>
//                 <Input id="limit" defaultValue={item.limit} />
//               </div>
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label htmlFor="reviewer">Reviewer</Label>
//               <Select defaultValue={item.reviewer}>
//                 <SelectTrigger id="reviewer" className="w-full">
//                   <SelectValue placeholder="Select a reviewer" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
//                   <SelectItem value="Jamik Tashpulatov">
//                     Jamik Tashpulatov
//                   </SelectItem>
//                   <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </form>
//         </div>
//         <DrawerFooter>
//           <Button>Submit</Button>
//           <DrawerClose asChild>
//             <Button variant="outline">Done</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// }




import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
 export function DataTable() {

  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKpiData();
  }, []);

  const fetchKpiData = async () => {
    try {
      // Get token from localStorage (adjust based on where you store it)
      const token = localStorage.getItem('access_Token');
      
      if (!token) {
        setError('Authentication token not found. Please login.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3001/api/v1/admin/dashboard/stats/kpi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // or just token, depending on your backend
          // Alternative formats if your backend uses different header:
          // 'x-auth-token': token,
          // 'token': token,
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError('Unauthorized. Please login again.');
          // Optionally redirect to login
          // window.location.href = '/login';
        } else {
          setError('Failed to fetch KPI data');
        }
        setLoading(false);
        return;
      }

      const result = await response.json();
      
      if (result.success) {
        setKpiData(result.data);
        setError(null);
      } else {
        setError(result.message || 'Failed to load data');
      }
    } catch (error) {
      console.error('Error fetching KPI data:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchKpiData}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!kpiData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const { kpis } = kpiData;

  // User Status Distribution
  const userStatusData = [
    { name: 'Active Users', value: kpis.totalUsers.value, color: '#10b981' },
    { name: 'Banned Users', value: kpis.TotalBanUsers.value, color: '#ef4444' }
  ];

  // User Type Distribution
  const userTypeData = [
    { name: 'Paid Users', value: kpis.paidUsers.value, color: '#f59e0b' },
    { name: 'Free Users', value: kpis.totalUsers.value - kpis.paidUsers.value, color: '#6b7280' }
  ];

  // User Activity
  const activityData = [
    { name: 'Active (24h)', value: kpis.activeUsers24h.value, color: '#3b82f6' },
    { name: 'Inactive', value: kpis.totalUsers.value - kpis.activeUsers24h.value, color: '#9ca3af' }
  ];

  // Support & Moderation
  const supportData = [
    { name: 'Open Tickets', value: kpis.TotalTickets.value, color: '#8b5cf6' },
    { name: 'Open Reports', value: kpis.openReports.value, color: '#ec4899' },
    { name: 'Pending Verifications', value: kpis.pendingVerifications.value, color: '#14b8a6' },
    { name: 'Claimed Prizes', value: kpis.ClaimedPrize.value, color: '#f97316' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600">{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const renderPieChart = (data, title) => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">KPI Overview</h1>
            {/* <p className="text-gray-600 mt-2">
              Last updated: {new Date(kpiData.lastUpdatedAt).toLocaleString()}
            </p> */}
          </div>
          <button
            onClick={fetchKpiData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

  
        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderPieChart(userStatusData, 'User Status Distribution')}
          {renderPieChart(userTypeData, 'User Type Distribution')}
          {renderPieChart(activityData, 'User Activity (24h)')}
          {renderPieChart(supportData, 'Support & Moderation')}
        </div>

        {/* Alerts */}
        {kpis.openReports.severity === 'high' && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  High number of open reports ({kpis.openReports.value}). Immediate attention required.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
