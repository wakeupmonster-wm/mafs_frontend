import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, UserPlus, Shield, Info } from "lucide-react";
import { userSchema } from "../schemas/user.schema";

const UserFormDrawer = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { status: "active", role: "user" },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-300">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="h-full flex flex-col bg-white shadow-2xl border-l border-gray-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-gray-900">
                  Add New Member
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Full Name
                </label>
                <input
                  {...register("name")}
                  placeholder="e.g. Sarah Connor"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all ${
                    errors.name
                      ? "border-red-500"
                      : "focus:border-pink-500 focus:ring-4 focus:ring-pink-50 border-gray-100"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="sarah@example.com"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "focus:border-pink-500 focus:ring-4 focus:ring-pink-50 border-gray-100"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Role & Status Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1 text-center flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Role
                  </label>
                  <select
                    {...register("role")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  The new member will receive an automated invitation email to
                  set their password.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserFormDrawer;
