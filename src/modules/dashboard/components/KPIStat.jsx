import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const KPIStat = ({ label, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-4">
        {/* Dynamic Icon Container */}
        <div
          className={`p-3 rounded-2xl ${color} bg-opacity-10 transition-transform group-hover:scale-110 duration-300`}
        >
          <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
        </div>

        {/* Trend Badge */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default KPIStat;
