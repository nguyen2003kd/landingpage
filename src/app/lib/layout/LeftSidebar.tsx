import React, { useState } from "react";
import {
  FolderClosed,
  PlusCircle,
  FileSpreadsheet,
  Settings,
  Plus,
} from "lucide-react";
import Sidebar from "./_components/Sidebar";
import ElementsSidebar from "@/components/builder/ElementsSidebar";
const LeftSidebar = () => {
  const tools = [
    { icon: FolderClosed, label: "bố cục và khối dựng sẵn", active: true },
    { icon: PlusCircle, label: "phần tử" },
    { icon: FileSpreadsheet, label: "Quản lý trang và điều hướng" },
    { icon: Settings, label: "Cài đặt" },
  ];
  const [selected, setSelcted] = useState(-1);
  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        return <Sidebar />;
      case 1:
        return <ElementsSidebar />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col-2 mx-auto">
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
        <div className="mb-6">
          <Settings className="w-6 h-6 text-gray-600" />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {tools.map((tool, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => setSelcted(index)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-blue-50 hover:scale-105 ${
                  selected === index
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <tool.icon className="w-5 h-5" />
              </button>

              {/* Tooltip */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {tool.label}
              </div>
            </div>
          ))}
        </div>
        <button className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 hover:scale-105">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div>{selected >= 0 ? handleClick(selected) : null}</div>
    </div>
  );
};

export default LeftSidebar;
