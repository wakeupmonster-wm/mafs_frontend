import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";
import React from "react";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";

const PlatformActivity = ({ stats }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md">
      <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
        <Smartphone className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />{" "}
        Platform & Daily
      </h4>
      <div className="space-y-4">
        <div className="flex items-center justify-around py-2 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-2">
            <AiFillApple className="w-10 h-10 mx-auto text-black mb-1" />
            <div>
              <p className="text-sm text-gray-500 uppercase font-bold">IOS</p>
              <p className="text-lg font-bold">{stats?.byPlatform?.android}</p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-gray-200" />
          <div className="flex items-center gap-2">
            <AiFillAndroid className="w-10 h-10 mx-auto text-green-600 mb-1" />
            <div>
              <p className="text-sm text-gray-500 uppercase font-bold">
                Android
              </p>
              <p className="text-lg font-bold">{stats?.byPlatform?.android}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-2">
          <span className="text-xs font-bold text-gray-500 uppercase">
            Today's New Subs
          </span>
          <Badge
            variant="outline"
            className="text-emerald-600 bg-emerald-50 border-emerald-100"
          >
            +{stats?.today?.newSubscriptions}
          </Badge>
        </div>
        <div className="flex justify-between items-center px-2">
          <span className="text-xs font-bold text-gray-500 uppercase">
            Today's Cancels
          </span>
          <Badge
            variant="outline"
            className="text-rose-600 bg-rose-50 border-rose-100"
          >
            -{stats?.today?.cancellations}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PlatformActivity;
