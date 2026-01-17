import React from "react";
import { useSelector } from "react-redux";
import { Menu, Search, Bell, User } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center relative group">
          <Search className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
          <input
            type="text"
            placeholder="Search matching data..."
            className="pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-50 rounded-xl outline-none transition-all w-64 lg:w-96 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">
              {user?.name}
            </p>
            <p className="text-[10px] font-bold text-pink-600 uppercase mt-1 tracking-wider">
              {user?.role}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-xl p-[2px]">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <User className="w-5 h-5 text-pink-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
