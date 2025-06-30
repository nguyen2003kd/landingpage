"use client";

import { useState } from "react";
import { ElementType, SectionLayout } from "@/src/types/element";
import {
  FileText,
  MousePointer,
  Image,
  CreditCard,
  Minus,
  Search,
  X,
} from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

const COMPONENTS: {
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  layout?: SectionLayout;
}[] = [

  { type: "text", label: "Text", icon: <FileText className="w-4 h-4" /> },
  {
    type: "button",
    label: "Button",
    icon: <MousePointer className="w-4 h-4" />,
  },
  { type: "image", label: "Image", icon: <Image className="w-4 h-4" /> },
  { type: "card", label: "Card", icon: <CreditCard className="w-4 h-4" /> },
  { type: "divider", label: "Divider", icon: <Minus className="w-4 h-4" /> },
];

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComponents = COMPONENTS.filter((comp) =>
    comp.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header với tìm kiếm */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Components</h2>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {filteredComponents.length} component
          {filteredComponents.length !== 1 ? "s" : ""} tìm thấy
        </p>
      </div>

      {/* Components List - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredComponents.length > 0 ? (
            filteredComponents.map((comp, index) => (
              <SidebarItem
                key={`${comp.type}-${comp.layout || "default"}-${index}`}
                type={comp.type}
                label={comp.label}
                icon={comp.icon}
                layout={comp.layout}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Không tìm thấy component nào</p>
              <p className="text-xs text-gray-300 mt-1">Thử từ khóa khác</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
    </aside>
  );
}

function SidebarItem({
  type,
  label,
  icon,
  layout,
}: {
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  layout?: SectionLayout;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${type}-${layout || "default"}`,
    data: { type, fromSidebar: true, layout },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg
        cursor-grab hover:bg-blue-50 hover:border-blue-300 transition-all duration-200
        ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="text-gray-600">{icon}</div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
}

