import React from "react";
import { Edit, Trash2, MoreVertical } from "lucide-react";

const DataTable = ({ columns, data, onEdit, onDelete, isLoading }) => {
  if (isLoading)
    return (
      <div className="p-20 text-center text-gray-400 font-bold animate-pulse">
        Fetching records...
      </div>
    );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className="hover:bg-pink-50/30 transition-colors group"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-sm font-medium text-gray-700"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(row)}
                      className="p-2 hover:bg-white rounded-lg text-blue-500 shadow-sm border border-transparent hover:border-blue-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="p-2 hover:bg-white rounded-lg text-red-500 shadow-sm border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
