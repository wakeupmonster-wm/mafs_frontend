/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  IconMail,
  IconDeviceMobile,
  IconBrandGoogle,
  IconBrandApple,
  IconDotsVertical,
  IconSearch,
  IconDownload,
  IconFilter,
} from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchUsers } from "../store/user.slice";
import { Mail } from "lucide-react";

// Helper for Completion Colors
const getCompletionColor = (val) => {
  if (val < 50) return "bg-red-500";
  if (val <= 80) return "bg-yellow-500";
  return "bg-green-500";
};

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const { items, loading, pagination } = useSelector((state) => state.users);
  // 1. Pull pagination and filters from state
  const [globalFilter, setGlobalFilter] = useState("");

  // // 2. Call fetchUsers on component mount and whenever page/limit changes
  // Simple debounce logic inside useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchUsers({
          page: pagination.page,
          limit: pagination.limit,
          search: globalFilter,
        })
      );
    }, 500); // Wait 500ms after last keystroke

    return () => clearTimeout(timer); // Cleanup timer if user types again
  }, [dispatch, pagination.page, globalFilter]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
          />
        ),
      },
      {
        accessorKey: "user",
        header: "User ⭐",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={row.original.profile.avatar} />
              <AvatarFallback>
                {row.original.profile.nickname?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none mb-0.5">
                {row.original.profile.nickname}
              </span>
              <span className="flex items-center gap-1 mt-0.5 text-muted-foreground text-xs">
                <Mail className="w-3 h-3" />
                {row.original.account.email}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.role}</Badge>
        ),
      },
      {
        header: "Age/Gender",
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.profile.age} • {row.original.profile.gender}
          </span>
        ),
      },
      {
        header: "Completion",
        cell: ({ row }) => (
          <div className="w-[100px] flex flex-col gap-1">
            <span className="text-[10px] font-medium">
              {row.original.profile.totalCompletion}%
            </span>
            <Progress
              value={row.original.profile.totalCompletion}
              className={`h-1.5 ${getCompletionColor(
                row.original.profile.totalCompletion
              )}`}
            />
          </div>
        ),
      },
      {
        header: "Status",
        cell: ({ row }) => (
          <div className="flex gap-1 italic">
            <Badge
              className={
                row.original.account.status === "Active"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-gray-500/10 text-gray-600"
              }
            >
              {row.original.account.status}
            </Badge>
            {row.original.account.isPremium && (
              <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">
                PRO
              </Badge>
            )}
          </div>
        ),
      },
      {
        header: "Ban Status",
        cell: ({ row }) =>
          row.original.account.banDetails.isBanned ? (
            <Badge variant="destructive">Banned</Badge>
          ) : (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Clean
            </Badge>
          ),
      },
      {
        header: "Auth",
        cell: ({ row }) => {
          const icons = {
            Email: <IconMail size={16} />,
            Phone: <IconDeviceMobile size={16} />,
            Google: <IconBrandGoogle size={16} />,
            Apple: <IconBrandApple size={16} />,
          };
          return icons[row.original.account.authMethod];
        },
      },
      {
        id: "actions",
        cell: () => (
          <Button variant="ghost" size="icon">
            <IconDotsVertical size={18} />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // console.log("items: ", items);
  // console.log("pagination: ", pagination);

  return (
    <div className="p-6 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-[#606060] font-medium">
            Manage your MAFS community members.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <IconDownload className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm">Add New User</Button>
        </div>
      </div>

      {/* SEARCH TOOLBAR */}
      <div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, phone..."
            className="pl-9 bg-background"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <IconFilter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
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
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  Loading Users...
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
            )}
          </TableBody>
        </Table>

        {/* Add this below your </table> closing tag */}
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Total Users: {pagination.total}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                dispatch(
                  setPagination({ ...pagination, page: pagination.page - 1 })
                )
              }
              disabled={pagination.page <= 1 || loading}
            >
              Previous
            </Button>
            <div className="text-sm font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                dispatch(
                  setPagination({ ...pagination, page: pagination.page + 1 })
                )
              }
              disabled={pagination.page >= pagination.totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
