import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Search, Filter, Mail, Trash2, Edit2 } from "lucide-react";

// shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Your shared logic components (Keep these as they likely wrap shadcn Dialog/Sheet)
import ConfirmModal from "@/components/common/ConfirmModal";
import UserFormDrawer from "../components/UserFormDrawer";

// Store Actions
import { deleteUser, addUser } from "../store/user.slice";

export default function UsersManagementPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Logic Handlers
  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(selectedUserId));
    setDeleteModalOpen(false);
  };

  const filteredUsers = items.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8FDFF] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#212121] tracking-tight">
            User Management
          </h1>
          <p className="text-[#606060] font-medium">
            Manage your MAFS community members.
          </p>
        </div>
        <Button
          onClick={() => setDrawerOpen(true)}
          className="bg-[#46C7CD] hover:bg-[#3bb1b6] text-white rounded-xl font-bold px-6 shadow-lg shadow-[#46C7CD]/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Separator className="bg-[#E6FFFD]" />

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-[#E6FFFD] shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D8D8D]" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 bg-[#F8FDFF] border-[#E6FFFD] focus-visible:ring-[#46C7CD] rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="border-[#E6FFFD] text-[#606060] rounded-xl hover:bg-[#F8FDFF]"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#E6FFFD] shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F8FDFF]">
            <TableRow className="hover:bg-transparent border-[#E6FFFD]">
              <TableHead className="font-bold text-[#212121]">User</TableHead>
              <TableHead className="font-bold text-[#212121]">Role</TableHead>
              <TableHead className="font-bold text-[#212121]">Status</TableHead>
              <TableHead className="font-bold text-[#212121]">
                Joined Date
              </TableHead>
              <TableHead className="text-right font-bold text-[#212121]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-[#E6FFFD] hover:bg-[#F8FDFF]/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-aqua-gradient flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#212121]">
                          {user.name}
                        </div>
                        <div className="text-xs text-[#8D8D8D] flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${
                        user.role === "admin"
                          ? "bg-[#46C7CD]/10 text-brand-aqua"
                          : "bg-aqua-gradient/10 text-[#212121]"
                      } border-none rounded-lg font-bold px-2 py-0.5 uppercase text-[10px]`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.status === "active"
                            ? "bg-[#12D18E]"
                            : "bg-[#F75555]"
                        }`}
                      />
                      <span className="text-sm font-medium text-[#606060] capitalize">
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#606060] text-sm">
                    {user.joined}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8D8D8D] hover:text-brand-aqua"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8D8D8D] hover:text-[#F75555]"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Drawer and Modal Components remain the same as they wrap their specific shadcn logic */}
      <UserFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(data) => {
          dispatch(addUser(data));
          setDrawerOpen(false);
        }}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove User"
        message="Are you sure? This will revoke their access to Match At First Swipe immediately."
      />
    </div>
  );
}
